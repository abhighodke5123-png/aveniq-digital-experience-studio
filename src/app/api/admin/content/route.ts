import { NextResponse } from 'next/server';
import { initialWebsiteContent } from '@/data/initial-content';
import { supabase } from '@/lib/supabase';
import { checkAdminAuth } from '@/lib/admin-auth';
import type { WebsiteContent } from '@/types/content';

// In-memory runtime cache for high-speed edge delivery
let runtimeContentCache: WebsiteContent | null = null;

function sanitizeContent(raw: unknown): WebsiteContent | null {
  if (!raw || typeof raw !== 'object') return null;
  const candidate = raw as Partial<WebsiteContent>;
  if (!candidate.hero || typeof candidate.hero !== 'object' || !candidate.hero.eyebrow) {
    return null;
  }
  return {
    ...initialWebsiteContent,
    ...candidate,
    hero: { ...initialWebsiteContent.hero, ...(candidate.hero || {}) },
    introduction: { ...initialWebsiteContent.introduction, ...(candidate.introduction || {}) },
    healthcare: { ...initialWebsiteContent.healthcare, ...(candidate.healthcare || {}) },
    contact: { ...initialWebsiteContent.contact, ...(candidate.contact || {}) },
    services: candidate.services && candidate.services.length > 0 ? candidate.services : initialWebsiteContent.services,
    projects: candidate.projects && candidate.projects.length > 0 ? candidate.projects : initialWebsiteContent.projects,
    faqs: candidate.faqs && candidate.faqs.length > 0 ? candidate.faqs : initialWebsiteContent.faqs,
  };
}

export async function GET() {
  try {
    if (runtimeContentCache) {
      const sanitized = sanitizeContent(runtimeContentCache);
      if (sanitized) {
        return NextResponse.json({ success: true, content: sanitized, source: 'cache' });
      }
    }

    const { data, error } = await supabase
      .from('website_settings')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1);

    if (!error && data && data.length > 0 && data[0].content_json) {
      const sanitized = sanitizeContent(data[0].content_json);
      if (sanitized) {
        runtimeContentCache = sanitized;
        return NextResponse.json({ success: true, content: sanitized, source: 'database' });
      }
    }

    runtimeContentCache = initialWebsiteContent;
    return NextResponse.json({
      success: true,
      content: initialWebsiteContent,
      source: 'defaults',
    });
  } catch (err) {
    console.warn('API get content fallback note:', err);
    return NextResponse.json({
      success: true,
      content: sanitizeContent(runtimeContentCache) || initialWebsiteContent,
      source: 'fallback',
    });
  }
}

export async function POST(req: Request) {
  try {
    const authResult = await checkAdminAuth();
    if (!authResult.authenticated) {
      return NextResponse.json(
        {
          success: false,
          code: authResult.code || 'UNAUTHORIZED',
          error: authResult.reason || 'Unauthorized. Super Admin login required.',
        },
        { status: 401 }
      );
    }

    const body = (await req.json()) as WebsiteContent;
    if (!body || !body.hero) {
      return NextResponse.json(
        { success: false, error: 'Invalid content payload provided.' },
        { status: 400 }
      );
    }

    // Update in-memory cache immediately
    runtimeContentCache = body;

    // Persist to Supabase website_settings
    try {
      const { data: existingRows } = await supabase
        .from('website_settings')
        .select('id')
        .limit(1);

      const targetId = existingRows?.[0]?.id;

      if (targetId) {
        await supabase
          .from('website_settings')
          .update({
            brand_name: body.brandName || 'AVENIQ',
            tagline: body.hero.eyebrow || 'Bespoke Digital Experience Studio',
            hero_headline: body.hero.headline,
            contact_email: body.contact.email,
            whatsapp_number: body.contact.phone,
            content_json: body,
            updated_by: 'abhighodke5123@admin',
            updated_at: new Date().toISOString(),
          })
          .eq('id', targetId);
      } else {
        await supabase.from('website_settings').insert([
          {
            brand_name: body.brandName || 'AVENIQ',
            tagline: body.hero.eyebrow || 'Bespoke Digital Experience Studio',
            hero_headline: body.hero.headline,
            contact_email: body.contact.email,
            whatsapp_number: body.contact.phone,
            primary_geography: 'India & Global',
            content_json: body,
            updated_by: 'abhighodke5123@admin',
            updated_at: new Date().toISOString(),
          },
        ]);
      }
    } catch (dbErr) {
      console.warn('Supabase website_settings persistence warning:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Website content updated and published live across all pages.',
      lastUpdated: body.lastUpdated || new Date().toISOString(),
    });
  } catch (err) {
    console.error('API update content error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error while saving content.' },
      { status: 500 }
    );
  }
}
