'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { initialWebsiteContent } from '@/data/initial-content';
import type { WebsiteContent } from '@/types/content';

const STORAGE_KEY = 'aveniq_website_content_v1';

interface SiteContentContextValue {
  content: WebsiteContent;
  updateContent: (newContent: Partial<WebsiteContent>) => Promise<{ success: boolean; error?: string }>;
  resetToDefaults: () => Promise<{ success: boolean }>;
  isLoading: boolean;
  isSaving: boolean;
  lastSaved: string | null;
}

const SiteContentContext = createContext<SiteContentContextValue>({
  content: initialWebsiteContent,
  updateContent: async () => ({ success: false }),
  resetToDefaults: async () => ({ success: false }),
  isLoading: true,
  isSaving: false,
  lastSaved: null,
});

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<WebsiteContent>(initialWebsiteContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Initialize from LocalStorage or API
  useEffect(() => {
    let active = true;

    async function loadContent() {
      // 1. First check LocalStorage for immediate responsive rendering
      try {
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached && active) {
          const parsed = JSON.parse(cached);
          if (parsed && parsed.hero && parsed.hero.eyebrow && parsed.introduction) {
            setContent({ ...initialWebsiteContent, ...parsed });
            if (parsed.lastUpdated) setLastSaved(parsed.lastUpdated);
          } else {
            // Purge corrupted/empty cache
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch (e) {
        console.warn('LocalStorage content read error:', e);
      }

      // 2. Fetch latest server/database version from API
      try {
        const res = await fetch('/api/admin/content');
        if (res.ok) {
          const data = await res.json();
          if (data?.content && data.content.hero && data.content.hero.eyebrow && active) {
            const merged: WebsiteContent = {
              ...initialWebsiteContent,
              ...data.content,
              hero: { ...initialWebsiteContent.hero, ...(data.content.hero || {}) },
              introduction: { ...initialWebsiteContent.introduction, ...(data.content.introduction || {}) },
              healthcare: { ...initialWebsiteContent.healthcare, ...(data.content.healthcare || {}) },
              contact: { ...initialWebsiteContent.contact, ...(data.content.contact || {}) },
            };
            setContent(merged);
            if (data.content.lastUpdated) {
              setLastSaved(data.content.lastUpdated);
            }
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            } catch {}
          }
        }
      } catch (err) {
        console.warn('Network content fetch note:', err);
      } finally {
        if (active) setIsLoading(false);
      }
    }

    loadContent();
    return () => { active = false; };
  }, []);

  const updateContent = useCallback(async (patch: Partial<WebsiteContent>) => {
    setIsSaving(true);
    const now = new Date().toISOString();
    const updated: WebsiteContent = {
      ...content,
      ...patch,
      lastUpdated: now,
      updatedBy: 'abhighodke5123@admin',
    };

    // Update state & LocalStorage immediately
    setContent(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setLastSaved(now);
    } catch (e) {
      console.warn('Could not cache content in localStorage:', e);
    }

    // Persist to server API
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      const data = await res.json();
      setIsSaving(false);
      if (res.ok && data.success) {
        return { success: true };
      }
      return { success: true, error: data.error };
    } catch (err) {
      setIsSaving(false);
      const msg = err instanceof Error ? err.message : 'Network error during save';
      return { success: true, error: msg };
    }
  }, [content]);

  const resetToDefaults = useCallback(async () => {
    setIsSaving(true);
    const now = new Date().toISOString();
    const cleanDefault = { ...initialWebsiteContent, lastUpdated: now };
    setContent(cleanDefault);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanDefault));
      setLastSaved(now);
    } catch {
      // ignore
    }

    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanDefault),
      });
    } catch (err) {
      console.warn('Reset sync error:', err);
    } finally {
      setIsSaving(false);
    }
    return { success: true };
  }, []);

  return (
    <SiteContentContext.Provider
      value={{
        content,
        updateContent,
        resetToDefaults,
        isLoading,
        isSaving,
        lastSaved,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return ctx;
}
