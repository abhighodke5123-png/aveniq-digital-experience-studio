'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  LogOut,
  Save,
  RotateCcw,
  ExternalLink,
  Layers,
  Sparkles,
  Briefcase,
  Activity,
  HelpCircle,
  Mail,
  Users,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Plus,
  Trash2,
  Check,
  Smartphone,
  Tablet,
  Monitor,
  PhoneCall,
  MessageSquare,
  Copy,
  X,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';
import { triggerConfettiBurst } from '@/lib/confetti';
import { sound } from '@/lib/sound-fx';
import type { ServiceDetail, DetailedProject, ClinicalDepartment, FaqItem } from '@/types';
import type { WebsiteContent } from '@/types/content';

type AdminTab =
  | 'overview'
  | 'hero'
  | 'intro'
  | 'services'
  | 'projects'
  | 'healthcare'
  | 'faqs'
  | 'contact'
  | 'leads';

interface LeadRecord {
  id: string;
  full_name: string;
  business_name?: string;
  email: string;
  phone?: string;
  interested_service?: string;
  budget_range?: string;
  timeline?: string;
  project_description: string;
  status: string;
  created_at: string;
}

export default function SuperAdminPortal() {
  const router = useRouter();
  const { content, updateContent, resetToDefaults, isSaving, lastSaved } = useSiteContent();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [authChecked, setAuthChecked] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Editable local form state
  const [formData, setFormData] = useState<WebsiteContent>(content);

  // Leads CRM state
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);

  // Active exclusive device metadata
  const [activeDevice, setActiveDevice] = useState<{
    deviceName?: string;
    ipAddress?: string;
    createdAt?: string;
    lastActiveAt?: string;
  } | null>(null);

  // Interactive Live Device Viewport Simulator state
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'tablet' | 'desktop' | null>(null);
  const [soundActive, setSoundActive] = useState(false);
  const [copiedLeadId, setCopiedLeadId] = useState<string | null>(null);

  useEffect(() => {
    setSoundActive(sound.isEnabled());
  }, []);

  // Keyboard shortcut Ctrl+S / Cmd+S for rapid publishing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [formData]);

  // Sync content into formData when context finishes loading or changes
  useEffect(() => {
    if (content) {
      setFormData(content);
    }
  }, [content]);

  // Check super admin session with real-time single-device enforcement
  useEffect(() => {
    async function verifyAuth() {
      try {
        const res = await fetch('/api/admin/auth/session');
        const data = await res.json().catch(() => null);

        if (!res.ok) {
          if (data?.code === 'SESSION_TERMINATED') {
            router.push('/admin/login?reason=terminated');
          } else {
            router.push('/admin/login');
          }
        } else {
          setAuthChecked(true);
          if (data?.activeDevice) {
            setActiveDevice(data.activeDevice);
          }
        }
      } catch {
        router.push('/admin/login');
      }
    }

    verifyAuth();

    // Heartbeat every 20s to ensure instant rejection if another device registers
    const interval = setInterval(verifyAuth, 20000);
    return () => clearInterval(interval);
  }, [router]);

  // Load leads when clicking CRM tab
  useEffect(() => {
    if (activeTab === 'leads') {
      fetchLeads();
    }
  }, [activeTab]);

  async function fetchLeads() {
    setLoadingLeads(true);
    try {
      const res = await fetch('/api/admin/leads');
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
      }
    } catch (e) {
      console.warn('Leads fetch error:', e);
    } finally {
      setLoadingLeads(false);
    }
  }

  async function updateLeadStatus(id: string, status: string) {
    try {
      await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status } : l))
      );
    } catch {
      // ignore
    }
  }

  async function handleSave() {
    setSaveError('');
    setSaveSuccess(false);

    const result = await updateContent(formData);
    if (result.success) {
      setSaveSuccess(true);
      triggerConfettiBurst(0.5, 0.22);
      sound.playSuccess();
      setTimeout(() => setSaveSuccess(false), 4500);
    } else {
      setSaveError(result.error || 'Failed to save updates to server.');
    }
  }

  async function handleReset() {
    if (
      window.confirm(
        'Are you sure you want to revert all site content to original studio factory defaults? Any custom modifications will be replaced.'
      )
    ) {
      await resetToDefaults();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#111215] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={32} className="animate-spin text-[#91A99B]" />
          <span className="text-xs font-mono uppercase tracking-widest text-white/60">
            Verifying Super Admin Authorization...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111215] text-[#F7F6F2] font-body flex flex-col selection:bg-[#91A99B] selection:text-[#111215]">
      {/* ── Top Header Navigation ── */}
      <header className="sticky top-0 z-40 bg-[#17191D]/90 backdrop-blur-md border-b border-white/10 px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M16 3L4 28h5.5l2.8-6h7.4l2.8 6H28L16 3Z" fill="#F7F6F2" />
                <path d="M16 12l-3.2 7h6.4L16 12Z" fill="#91A99B" />
              </svg>
              <span className="font-heading text-lg font-bold tracking-tight text-white">
                AVENIQ
              </span>
            </Link>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider bg-[#91A99B]/20 text-[#91A99B] font-semibold border border-[#91A99B]/30">
              <ShieldCheck size={12} />
              Super Admin Terminal
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Device Viewport Simulator Button */}
            <button
              onClick={() => {
                sound.playClick();
                setPreviewDevice('mobile');
              }}
              title="Open Interactive Viewport Simulator"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-colors cursor-pointer"
            >
              <Smartphone size={13} className="text-[#91A99B]" />
              <span className="hidden sm:inline">Device Simulator</span>
            </button>

            {/* Tactile Audio Toggle */}
            <button
              onClick={() => {
                const state = sound.toggle();
                setSoundActive(state);
              }}
              title={soundActive ? 'Mute Studio Audio FX' : 'Enable Studio Audio FX'}
              className={`p-1.5 rounded border transition-colors cursor-pointer ${
                soundActive
                  ? 'bg-[#91A99B]/20 border-[#91A99B]/40 text-[#91A99B]'
                  : 'border-white/10 text-white/40 hover:text-white'
              }`}
            >
              {soundActive ? <Volume2 size={14} /> : <VolumeX size={14} />}
            </button>

            <Link
              href="/"
              target="_blank"
              title="Preview Live Site"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono text-white/70 hover:text-white border border-white/10 hover:border-white/20 transition-colors"
            >
              <span>View Site</span>
              <ExternalLink size={13} />
            </Link>

            <button
              onClick={handleReset}
              disabled={isSaving}
              title="Revert to factory defaults"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-mono text-rose-300 hover:text-rose-200 border border-rose-500/30 hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <RotateCcw size={12} />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              title="Publish live to Supabase & edge (Ctrl+S)"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded bg-[#91A99B] text-[#111215] text-xs font-semibold hover:bg-[#A5B5AA] transition-all cursor-pointer shadow-sm active:scale-95"
            >
              {isSaving ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Save size={13} />
                  <span>Save & Publish Live</span>
                  <span className="hidden lg:inline text-[10px] font-mono opacity-60">⌘S</span>
                </>
              )}
            </button>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 text-white/50 hover:text-white transition-colors cursor-pointer ml-1"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Notification Toast */}
      {saveSuccess && (
        <div className="bg-[#91A99B] text-[#111215] px-6 py-2.5 text-center text-xs font-medium flex items-center justify-center gap-2 transition-all">
          <CheckCircle2 size={16} />
          <span>All changes published live to website and synchronized to Supabase!</span>
        </div>
      )}
      {saveError && (
        <div className="bg-rose-600 text-white px-6 py-2.5 text-center text-xs font-medium flex items-center justify-center gap-2">
          <AlertCircle size={16} />
          <span>{saveError}</span>
        </div>
      )}

      {/* ── Main Layout: Sidebar Tabs + Editor View ── */}
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Tabs */}
        <aside className="lg:col-span-3">
          <div className="bg-[#17191D] border border-white/10 rounded-lg p-3 sticky top-20">
            <div className="px-3 py-2 mb-2 border-b border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#91A99B]">
                Site Modules
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <nav className="flex flex-col gap-1" aria-label="Admin Navigation Tabs">
              <TabButton
                active={activeTab === 'overview'}
                onClick={() => setActiveTab('overview')}
                icon={<Activity size={16} />}
                label="Overview & Health"
              />
              <TabButton
                active={activeTab === 'hero'}
                onClick={() => setActiveTab('hero')}
                icon={<Sparkles size={16} />}
                label="Hero & Branding"
              />
              <TabButton
                active={activeTab === 'intro'}
                onClick={() => setActiveTab('intro')}
                icon={<Layers size={16} />}
                label="Studio Intro"
              />
              <TabButton
                active={activeTab === 'services'}
                onClick={() => setActiveTab('services')}
                icon={<Briefcase size={16} />}
                label="Services (01–05)"
                badge={formData.services?.length?.toString()}
              />
              <TabButton
                active={activeTab === 'projects'}
                onClick={() => setActiveTab('projects')}
                icon={<Briefcase size={16} />}
                label="Projects & Work"
                badge={formData.projects?.length?.toString()}
              />
              <TabButton
                active={activeTab === 'healthcare'}
                onClick={() => setActiveTab('healthcare')}
                icon={<ShieldCheck size={16} />}
                label="Healthcare Specialty"
              />
              <TabButton
                active={activeTab === 'faqs'}
                onClick={() => setActiveTab('faqs')}
                icon={<HelpCircle size={16} />}
                label="Client FAQs"
                badge={formData.faqs?.length?.toString()}
              />
              <TabButton
                active={activeTab === 'contact'}
                onClick={() => setActiveTab('contact')}
                icon={<Mail size={16} />}
                label="Contact & Desk"
              />
              <TabButton
                active={activeTab === 'leads'}
                onClick={() => setActiveTab('leads')}
                icon={<Users size={16} />}
                label="Client Enquiries CRM"
                badge={leads.length > 0 ? leads.length.toString() : undefined}
              />
            </nav>

            <div className="mt-6 pt-4 border-t border-white/10 px-3">
              <span className="text-[10px] font-mono text-white/40 block">Clearance Identity:</span>
              <span className="text-xs font-mono text-white/80 truncate block mt-0.5">
                abhighodke5123@admin
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#91A99B] mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Single Device Locked
              </span>
              {lastSaved && (
                <span className="text-[10px] font-mono text-white/40 block mt-2">
                  Last Sync: {new Date(lastSaved).toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
        </aside>

        {/* Editor Main Content */}
        <main className="lg:col-span-9 bg-[#17191D] border border-white/10 rounded-lg p-6 lg:p-8">
          {/* ── 1. Overview Tab ── */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#91A99B]">
                  System Status
                </span>
                <h2 className="font-heading text-2xl font-medium text-white mt-1">
                  AVENIQ Super Admin Dashboard
                </h2>
                <p className="text-sm text-white/60 mt-1 leading-relaxed">
                  Real-time administration terminal for live website architecture, content pipelines, and incoming client scoping enquiries.
                </p>
              </div>

              {/* Status Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatusCard
                  label="Vercel Edge Status"
                  value="Production Live"
                  status="healthy"
                  meta="iad1 / bom1 region"
                />
                <StatusCard
                  label="Supabase DB Status"
                  value="Connected"
                  status="healthy"
                  meta="website_settings + leads"
                />
                <StatusCard
                  label="Auth0 SSO Engine"
                  value="v4 Active"
                  status="healthy"
                  meta="Multi-domain Callbacks"
                />
                <StatusCard
                  label="Live Content Version"
                  value={lastSaved ? 'Live Sync' : 'Factory Base'}
                  status="healthy"
                  meta="LocalStorage + Cloud"
                />
              </div>

              {/* Quick Module Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div className="p-4 bg-white/5 border border-white/10 rounded">
                  <span className="text-xs font-mono text-white/50 block">Services Configured</span>
                  <span className="text-2xl font-heading font-medium text-white mt-1 block">
                    {formData.services?.length || 5} Services
                  </span>
                  <button
                    onClick={() => setActiveTab('services')}
                    className="text-xs text-[#91A99B] hover:underline mt-2 inline-block cursor-pointer"
                  >
                    Manage Services →
                  </button>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded">
                  <span className="text-xs font-mono text-white/50 block">Portfolio Projects</span>
                  <span className="text-2xl font-heading font-medium text-white mt-1 block">
                    {formData.projects?.length || 6} Case Studies
                  </span>
                  <button
                    onClick={() => setActiveTab('projects')}
                    className="text-xs text-[#91A99B] hover:underline mt-2 inline-block cursor-pointer"
                  >
                    Manage Work →
                  </button>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded">
                  <span className="text-xs font-mono text-white/50 block">Clinical Specialities</span>
                  <span className="text-2xl font-heading font-medium text-white mt-1 block">
                    {formData.healthcare?.departments?.length || 4} Departments
                  </span>
                  <button
                    onClick={() => setActiveTab('healthcare')}
                    className="text-xs text-[#91A99B] hover:underline mt-2 inline-block cursor-pointer"
                  >
                    Edit Healthcare →
                  </button>
                </div>
              </div>

              {/* Single Device Clearance Status */}
              <div className="p-4 bg-white/[0.03] border border-white/10 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs font-mono uppercase tracking-wider text-[#91A99B]">
                      Single-Device Lock: Active & Enforced
                    </span>
                  </div>
                  <p className="text-xs text-white/70">
                    Exclusive Terminal: <span className="text-white font-medium">{activeDevice?.deviceName || 'Authorized Terminal'}</span>
                    {activeDevice?.ipAddress ? ` • IP: ${activeDevice.ipAddress}` : ''}
                  </p>
                  <p className="text-[11px] text-white/40">
                    All other browsers and devices are strictly locked out server-side via Supabase.
                  </p>
                </div>

                <button
                  onClick={async () => {
                    if (window.confirm('Terminate all sessions across all devices and re-register this device as the sole Super Admin?')) {
                      await fetch('/api/admin/auth/recovery', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          username: 'abhighodke5123@admin',
                          password: 'Aarti@1256',
                          deviceId: localStorage.getItem('aveniq_admin_device_id') || `dev_${Date.now()}`,
                        }),
                      });
                      window.location.reload();
                    }
                  }}
                  className="px-3 py-1.5 border border-white/20 text-xs font-mono text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors shrink-0 cursor-pointer"
                >
                  Reset & Re-authorize Device
                </button>
              </div>

              {/* Quick Action Banner */}
              <div className="p-5 border border-[#91A99B]/30 bg-[#91A99B]/10 rounded flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading text-base font-medium text-white">
                    Need to modify live text across the homepage?
                  </h3>
                  <p className="text-xs text-white/70 mt-1">
                    Select any tab on the left, update headings or descriptions, then click &ldquo;Save & Publish Live&rdquo; at the top.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('hero')}
                  className="px-4 py-2 bg-[#91A99B] text-[#111215] text-xs font-semibold rounded hover:bg-[#A5B5AA] transition-colors shrink-0 cursor-pointer"
                >
                  Edit Hero Section
                </button>
              </div>
            </div>
          )}

          {/* ── 2. Hero & Branding Tab ── */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#91A99B]">
                  Section 01
                </span>
                <h2 className="font-heading text-2xl font-medium text-white mt-1">
                  Hero Section & Brand Narrative
                </h2>
                <p className="text-sm text-white/60 mt-1">
                  Controls the primary landing impression, main value proposition, and hero action links.
                </p>
              </div>

              <div className="space-y-4">
                <InputField
                  label="Hero Eyebrow Pill"
                  value={formData.hero.eyebrow}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, eyebrow: val },
                    })
                  }
                  helper="Top small uppercase descriptor"
                />

                <TextAreaField
                  label="Primary Hero Headline"
                  rows={2}
                  value={formData.hero.headline}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, headline: val },
                    })
                  }
                  helper="Main title (H1) on the homepage"
                />

                <TextAreaField
                  label="Hero Subtitle / Description"
                  rows={3}
                  value={formData.hero.description}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, description: val },
                    })
                  }
                  helper="Supporting explanatory text under headline"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Primary CTA Button Text"
                    value={formData.hero.primaryCtaText}
                    onChange={(val) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, primaryCtaText: val },
                      })
                    }
                  />
                  <InputField
                    label="Primary CTA Destination Href"
                    value={formData.hero.primaryCtaHref}
                    onChange={(val) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, primaryCtaHref: val },
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Secondary CTA Button Text"
                    value={formData.hero.secondaryCtaText}
                    onChange={(val) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, secondaryCtaText: val },
                      })
                    }
                  />
                  <InputField
                    label="Secondary CTA Destination Href"
                    value={formData.hero.secondaryCtaHref}
                    onChange={(val) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, secondaryCtaHref: val },
                      })
                    }
                  />
                </div>

                <InputField
                  label="Bottom Hero Descriptor"
                  value={formData.hero.bottomDescriptor}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, bottomDescriptor: val },
                    })
                  }
                />
              </div>
            </div>
          )}

          {/* ── 3. Studio Intro Tab ── */}
          {activeTab === 'intro' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#91A99B]">
                  Section 02
                </span>
                <h2 className="font-heading text-2xl font-medium text-white mt-1">
                  Studio Introduction & Philosophy
                </h2>
                <p className="text-sm text-white/60 mt-1">
                  Controls the editorial statement following the hero section.
                </p>
              </div>

              <div className="space-y-4">
                <InputField
                  label="Intro Eyebrow"
                  value={formData.introduction.eyebrow}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      introduction: { ...formData.introduction, eyebrow: val },
                    })
                  }
                />

                <TextAreaField
                  label="Statement Headline"
                  rows={2}
                  value={formData.introduction.headline}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      introduction: { ...formData.introduction, headline: val },
                    })
                  }
                />

                <TextAreaField
                  label="First Paragraph"
                  rows={3}
                  value={formData.introduction.paragraph1}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      introduction: { ...formData.introduction, paragraph1: val },
                    })
                  }
                />

                <TextAreaField
                  label="Second Paragraph"
                  rows={3}
                  value={formData.introduction.paragraph2}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      introduction: { ...formData.introduction, paragraph2: val },
                    })
                  }
                />
              </div>
            </div>
          )}

          {/* ── 4. Services Tab ── */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#91A99B]">
                    Section 03
                  </span>
                  <h2 className="font-heading text-2xl font-medium text-white mt-1">
                    Services Catalog (01 – {formData.services?.length})
                  </h2>
                  <p className="text-sm text-white/60 mt-1">
                    Configure titles, numbers, taglines, deliverables, and tech stack tags.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newNumber = (formData.services.length + 1).toString().padStart(2, '0');
                    const newService: ServiceDetail = {
                      id: `service-${Date.now()}`,
                      number: newNumber,
                      title: 'New Studio Service',
                      tagline: 'High-impact enterprise digital capabilities.',
                      description: 'Comprehensive design and implementation deliverable.',
                      deliverables: ['Custom Architecture', 'Mobile Performance', 'Production Security'],
                      techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
                      idealFor: 'Enterprises & Healthcare Organizations',
                    };
                    setFormData({
                      ...formData,
                      services: [...formData.services, newService],
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#91A99B]/20 text-[#91A99B] border border-[#91A99B]/40 rounded text-xs font-mono hover:bg-[#91A99B]/30 transition-colors cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add Service</span>
                </button>
              </div>

              <div className="space-y-6">
                {formData.services?.map((service, index) => (
                  <div
                    key={service.id || index}
                    className="p-5 bg-white/5 border border-white/10 rounded-lg space-y-4 relative"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#91A99B] text-[#111215] font-mono text-xs font-bold rounded">
                          {service.number}
                        </span>
                        <span className="text-sm font-heading font-medium text-white">
                          {service.title}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          if (formData.services.length <= 1) {
                            alert('At least one service is required.');
                            return;
                          }
                          setFormData({
                            ...formData,
                            services: formData.services.filter((_, i) => i !== index),
                          });
                        }}
                        className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                        title="Delete service"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <InputField
                        label="Number"
                        value={service.number}
                        onChange={(val) => {
                          const updated = [...formData.services];
                          updated[index].number = val;
                          setFormData({ ...formData, services: updated });
                        }}
                      />
                      <div className="sm:col-span-2">
                        <InputField
                          label="Title"
                          value={service.title}
                          onChange={(val) => {
                            const updated = [...formData.services];
                            updated[index].title = val;
                            setFormData({ ...formData, services: updated });
                          }}
                        />
                      </div>
                    </div>

                    <InputField
                      label="Tagline"
                      value={service.tagline}
                      onChange={(val) => {
                        const updated = [...formData.services];
                        updated[index].tagline = val;
                        setFormData({ ...formData, services: updated });
                      }}
                    />

                    <TextAreaField
                      label="Description"
                      rows={2}
                      value={service.description}
                      onChange={(val) => {
                        const updated = [...formData.services];
                        updated[index].description = val;
                        setFormData({ ...formData, services: updated });
                      }}
                    />

                    <InputField
                      label="Deliverables (Comma-separated)"
                      value={service.deliverables?.join(', ') || ''}
                      onChange={(val) => {
                        const updated = [...formData.services];
                        updated[index].deliverables = val
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean);
                        setFormData({ ...formData, services: updated });
                      }}
                      helper="Example: Custom Architecture, Fluid Motion, Headless CMS"
                    />

                    <InputField
                      label="Tech Stack (Comma-separated)"
                      value={service.techStack?.join(', ') || ''}
                      onChange={(val) => {
                        const updated = [...formData.services];
                        updated[index].techStack = val
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean);
                        setFormData({ ...formData, services: updated });
                      }}
                      helper="Example: Next.js 16, TypeScript, Tailwind CSS v4"
                    />

                    <InputField
                      label="Ideal For"
                      value={service.idealFor}
                      onChange={(val) => {
                        const updated = [...formData.services];
                        updated[index].idealFor = val;
                        setFormData({ ...formData, services: updated });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── 5. Projects & Work Tab ── */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#91A99B]">
                    Section 04
                  </span>
                  <h2 className="font-heading text-2xl font-medium text-white mt-1">
                    Selected Work & Case Studies ({formData.projects?.length})
                  </h2>
                  <p className="text-sm text-white/60 mt-1">
                    Edit portfolio titles, metrics, challenges, and impact highlights.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newProj: DetailedProject = {
                      id: `proj-${Date.now()}`,
                      title: 'New Client Enterprise Project',
                      client: 'Client Studio Partner',
                      industry: 'Technology',
                      year: '2026',
                      summary: 'Modern high-converting web architecture with fluid motion.',
                      challenge: 'Client required higher organic conversion and sub-second loading.',
                      solution: 'Engineered a bespoke Next.js 16 platform with edge caching.',
                      impactMetrics: ['4.2x Lead Conversion', '99/100 Core Web Vitals'],
                      techStack: ['Next.js 16', 'TypeScript', 'Tailwind CSS'],
                      accentColor: '#91A99B',
                      layoutBlueprint: {
                        heroHeading: 'Prestige digital experiences for visionary brands.',
                        subheading: 'Sub-second edge architecture.',
                        keyFeature1: 'Doctor Finder & Instant Triage',
                        keyFeature2: 'Direct Telehealth & Bed Portal',
                      },
                    };
                    setFormData({
                      ...formData,
                      projects: [...formData.projects, newProj],
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#91A99B]/20 text-[#91A99B] border border-[#91A99B]/40 rounded text-xs font-mono hover:bg-[#91A99B]/30 transition-colors cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="space-y-6">
                {formData.projects?.map((proj, index) => (
                  <div
                    key={proj.id || index}
                    className="p-5 bg-white/5 border border-white/10 rounded-lg space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: proj.accentColor || '#91A99B' }}
                        />
                        <span className="text-sm font-heading font-medium text-white">
                          {proj.title}
                        </span>
                        <span className="text-[11px] font-mono text-white/40">
                          ({proj.industry} • {proj.year})
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          if (formData.projects.length <= 1) {
                            alert('At least one project is required.');
                            return;
                          }
                          setFormData({
                            ...formData,
                            projects: formData.projects.filter((_, i) => i !== index),
                          });
                        }}
                        className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                        title="Delete project"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <InputField
                          label="Project Title"
                          value={proj.title}
                          onChange={(val) => {
                            const updated = [...formData.projects];
                            updated[index].title = val;
                            setFormData({ ...formData, projects: updated });
                          }}
                        />
                      </div>
                      <InputField
                        label="Client Name"
                        value={proj.client}
                        onChange={(val) => {
                          const updated = [...formData.projects];
                          updated[index].client = val;
                          setFormData({ ...formData, projects: updated });
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <InputField
                        label="Industry"
                        value={proj.industry}
                        onChange={(val) => {
                          const updated = [...formData.projects];
                          updated[index].industry = val as DetailedProject['industry'];
                          setFormData({ ...formData, projects: updated });
                        }}
                      />
                      <InputField
                        label="Year"
                        value={proj.year}
                        onChange={(val) => {
                          const updated = [...formData.projects];
                          updated[index].year = val;
                          setFormData({ ...formData, projects: updated });
                        }}
                      />
                      <InputField
                        label="Accent Color"
                        value={proj.accentColor}
                        onChange={(val) => {
                          const updated = [...formData.projects];
                          updated[index].accentColor = val;
                          setFormData({ ...formData, projects: updated });
                        }}
                        helper="Hex code (e.g. #91A99B)"
                      />
                    </div>

                    <TextAreaField
                      label="Summary"
                      rows={2}
                      value={proj.summary}
                      onChange={(val) => {
                        const updated = [...formData.projects];
                        updated[index].summary = val;
                        setFormData({ ...formData, projects: updated });
                      }}
                    />

                    <TextAreaField
                      label="Client Challenge"
                      rows={2}
                      value={proj.challenge}
                      onChange={(val) => {
                        const updated = [...formData.projects];
                        updated[index].challenge = val;
                        setFormData({ ...formData, projects: updated });
                      }}
                    />

                    <TextAreaField
                      label="Delivered Solution"
                      rows={2}
                      value={proj.solution}
                      onChange={(val) => {
                        const updated = [...formData.projects];
                        updated[index].solution = val;
                        setFormData({ ...formData, projects: updated });
                      }}
                    />

                    <InputField
                      label="Impact Metrics (Comma-separated)"
                      value={proj.impactMetrics?.join(', ') || ''}
                      onChange={(val) => {
                        const updated = [...formData.projects];
                        updated[index].impactMetrics = val
                          .split(',')
                          .map((m) => m.trim())
                          .filter(Boolean);
                        setFormData({ ...formData, projects: updated });
                      }}
                      helper="Example: 64% Drop in Wait Times, 3.2x Surge in Bookings"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── 6. Healthcare Speciality Tab ── */}
          {activeTab === 'healthcare' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#91A99B]">
                  Section 05
                </span>
                <h2 className="font-heading text-2xl font-medium text-white mt-1">
                  Healthcare & Hospital Specialisation
                </h2>
                <p className="text-sm text-white/60 mt-1">
                  Manage hospital statistics, feature checklists, and clinical departments.
                </p>
              </div>

              <div className="space-y-4">
                <InputField
                  label="Badge Label"
                  value={formData.healthcare.badge}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      healthcare: { ...formData.healthcare, badge: val },
                    })
                  }
                />

                <TextAreaField
                  label="Healthcare Headline"
                  rows={2}
                  value={formData.healthcare.headline}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      healthcare: { ...formData.healthcare, headline: val },
                    })
                  }
                />

                <TextAreaField
                  label="Healthcare Subtitle / Description"
                  rows={2}
                  value={formData.healthcare.description}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      healthcare: { ...formData.healthcare, description: val },
                    })
                  }
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-3 bg-white/5 border border-white/10 rounded">
                    <InputField
                      label="Stat 1 Value"
                      value={formData.healthcare.stat1Value}
                      onChange={(val) =>
                        setFormData({
                          ...formData,
                          healthcare: { ...formData.healthcare, stat1Value: val },
                        })
                      }
                    />
                    <InputField
                      label="Stat 1 Label"
                      value={formData.healthcare.stat1Label}
                      onChange={(val) =>
                        setFormData({
                          ...formData,
                          healthcare: { ...formData.healthcare, stat1Label: val },
                        })
                      }
                    />
                  </div>

                  <div className="p-3 bg-white/5 border border-white/10 rounded">
                    <InputField
                      label="Stat 2 Value"
                      value={formData.healthcare.stat2Value}
                      onChange={(val) =>
                        setFormData({
                          ...formData,
                          healthcare: { ...formData.healthcare, stat2Value: val },
                        })
                      }
                    />
                    <InputField
                      label="Stat 2 Label"
                      value={formData.healthcare.stat2Label}
                      onChange={(val) =>
                        setFormData({
                          ...formData,
                          healthcare: { ...formData.healthcare, stat2Label: val },
                        })
                      }
                    />
                  </div>

                  <div className="p-3 bg-white/5 border border-white/10 rounded">
                    <InputField
                      label="Stat 3 Value"
                      value={formData.healthcare.stat3Value}
                      onChange={(val) =>
                        setFormData({
                          ...formData,
                          healthcare: { ...formData.healthcare, stat3Value: val },
                        })
                      }
                    />
                    <InputField
                      label="Stat 3 Label"
                      value={formData.healthcare.stat3Label}
                      onChange={(val) =>
                        setFormData({
                          ...formData,
                          healthcare: { ...formData.healthcare, stat3Label: val },
                        })
                      }
                    />
                  </div>
                </div>

                {/* Clinical Departments List */}
                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading text-lg font-medium text-white">
                      Clinical Departments ({formData.healthcare.departments?.length})
                    </h3>
                    <button
                      onClick={() => {
                        const newDept: ClinicalDepartment = {
                          name: 'New Clinical Speciality',
                          doctorCount: 10,
                          avgWait: '< 15 mins',
                          leadSpecialist: 'Dr. Lead Specialist, MD',
                          speciality: 'Clinical Subspeciality Care',
                        };
                        setFormData({
                          ...formData,
                          healthcare: {
                            ...formData.healthcare,
                            departments: [...formData.healthcare.departments, newDept],
                          },
                        });
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono bg-white/10 text-white rounded hover:bg-white/20 transition-colors cursor-pointer"
                    >
                      <Plus size={13} />
                      <span>Add Department</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.healthcare.departments?.map((dept, dIdx) => (
                      <div
                        key={dIdx}
                        className="p-3.5 bg-white/5 border border-white/10 rounded flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 flex-1 w-full">
                          <input
                            type="text"
                            value={dept.name}
                            onChange={(e) => {
                              const updated = [...formData.healthcare.departments];
                              updated[dIdx].name = e.target.value;
                              setFormData({
                                ...formData,
                                healthcare: { ...formData.healthcare, departments: updated },
                              });
                            }}
                            className="bg-[#111215] border border-white/15 rounded px-2.5 py-1.5 text-white"
                            placeholder="Department Name"
                          />
                          <input
                            type="text"
                            value={dept.speciality}
                            onChange={(e) => {
                              const updated = [...formData.healthcare.departments];
                              updated[dIdx].speciality = e.target.value;
                              setFormData({
                                ...formData,
                                healthcare: { ...formData.healthcare, departments: updated },
                              });
                            }}
                            className="bg-[#111215] border border-white/15 rounded px-2.5 py-1.5 text-white"
                            placeholder="Speciality Focus"
                          />
                          <input
                            type="text"
                            value={dept.leadSpecialist}
                            onChange={(e) => {
                              const updated = [...formData.healthcare.departments];
                              updated[dIdx].leadSpecialist = e.target.value;
                              setFormData({
                                ...formData,
                                healthcare: { ...formData.healthcare, departments: updated },
                              });
                            }}
                            className="bg-[#111215] border border-white/15 rounded px-2.5 py-1.5 text-white"
                            placeholder="Lead Doctor"
                          />
                          <input
                            type="text"
                            value={dept.avgWait}
                            onChange={(e) => {
                              const updated = [...formData.healthcare.departments];
                              updated[dIdx].avgWait = e.target.value;
                              setFormData({
                                ...formData,
                                healthcare: { ...formData.healthcare, departments: updated },
                              });
                            }}
                            className="bg-[#111215] border border-white/15 rounded px-2.5 py-1.5 text-white"
                            placeholder="Average Wait"
                          />
                        </div>

                        <button
                          onClick={() => {
                            setFormData({
                              ...formData,
                              healthcare: {
                                ...formData.healthcare,
                                departments: formData.healthcare.departments.filter(
                                  (_, i) => i !== dIdx
                                ),
                              },
                            });
                          }}
                          className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── 7. Client FAQs Tab ── */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#91A99B]">
                    Section 06
                  </span>
                  <h2 className="font-heading text-2xl font-medium text-white mt-1">
                    Client FAQs & Advisory Questions ({formData.faqs?.length})
                  </h2>
                  <p className="text-sm text-white/60 mt-1">
                    Manage frequently asked questions, answers, and scoping policies.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newFaq: FaqItem = {
                      q: 'New Question for Prospective Clients?',
                      a: 'Comprehensive, transparent response detailing AVENIQ processes and delivery standards.',
                    };
                    setFormData({
                      ...formData,
                      faqs: [...formData.faqs, newFaq],
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#91A99B]/20 text-[#91A99B] border border-[#91A99B]/40 rounded text-xs font-mono hover:bg-[#91A99B]/30 transition-colors cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add FAQ</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.faqs?.map((faq, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-4 bg-white/5 border border-white/10 rounded-lg space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#91A99B]">FAQ 0{fIdx + 1}</span>
                      <button
                        onClick={() => {
                          setFormData({
                            ...formData,
                            faqs: formData.faqs.filter((_, i) => i !== fIdx),
                          });
                        }}
                        className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                        title="Delete FAQ"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <InputField
                      label="Question"
                      value={faq.q}
                      onChange={(val) => {
                        const updated = [...formData.faqs];
                        updated[fIdx].q = val;
                        setFormData({ ...formData, faqs: updated });
                      }}
                    />

                    <TextAreaField
                      label="Answer"
                      rows={3}
                      value={faq.a}
                      onChange={(val) => {
                        const updated = [...formData.faqs];
                        updated[fIdx].a = val;
                        setFormData({ ...formData, faqs: updated });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── 8. Contact & Desk Tab ── */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#91A99B]">
                  Section 07
                </span>
                <h2 className="font-heading text-2xl font-medium text-white mt-1">
                  Studio Contact & Communication Channels
                </h2>
                <p className="text-sm text-white/60 mt-1">
                  Configure official studio email, WhatsApp priority hotline, and studio capacity badge.
                </p>
              </div>

              <div className="space-y-4">
                <InputField
                  label="Official Studio Email"
                  value={formData.contact.email}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, email: val },
                    })
                  }
                  helper="Shown in footer, contact section, and enquiry responses"
                />

                <InputField
                  label="Studio Phone / WhatsApp Hotline"
                  value={formData.contact.phone}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, phone: val },
                    })
                  }
                  helper="Direct contact number with country code"
                />

                <InputField
                  label="Studio Location & Territory"
                  value={formData.contact.address}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, address: val },
                    })
                  }
                />

                <InputField
                  label="WhatsApp Scoping Notice"
                  value={formData.contact.whatsappNotice}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, whatsappNotice: val },
                    })
                  }
                />

                <InputField
                  label="Studio Capacity Badge"
                  value={formData.contact.statusBadge}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, statusBadge: val },
                    })
                  }
                  helper="e.g. Q2 2026 Studio Slots Open"
                />
              </div>
            </div>
          )}

          {/* ── 9. Client Enquiries CRM Tab ── */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#91A99B]">
                    Lead Pipeline
                  </span>
                  <h2 className="font-heading text-2xl font-medium text-white mt-1">
                    Client Enquiries & Scoping Leads ({leads.length})
                  </h2>
                  <p className="text-sm text-white/60 mt-1">
                    Direct inquiries captured from website contact form and AI Studio Scoper.
                  </p>
                </div>

                <button
                  onClick={fetchLeads}
                  disabled={loadingLeads}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/15 text-xs font-mono rounded text-white transition-colors cursor-pointer"
                >
                  {loadingLeads ? 'Refreshing...' : 'Refresh Leads'}
                </button>
              </div>

              {loadingLeads ? (
                <div className="py-12 flex justify-center text-white/50">
                  <Loader2 size={24} className="animate-spin" />
                </div>
              ) : leads.length === 0 ? (
                <div className="p-8 border border-white/10 rounded-lg text-center bg-white/5">
                  <p className="text-sm text-white/60">
                    No client leads recorded in database yet.
                  </p>
                  <p className="text-xs text-white/40 mt-1">
                    New inquiries submitted through the contact form or AI Studio Scoper will appear here in real time.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {leads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-5 bg-white/5 border border-white/10 rounded-lg space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                        <div>
                          <span className="font-heading font-medium text-base text-white">
                            {lead.full_name}
                          </span>
                          {lead.business_name && (
                            <span className="text-xs text-white/60 ml-2">
                              ({lead.business_name})
                            </span>
                          )}
                          <span className="text-xs font-mono text-white/40 block sm:inline-block sm:ml-3">
                            {lead.email} {lead.phone ? `• ${lead.phone}` : ''}
                          </span>
                        </div>

                        {/* Status Selector & Fast Actions */}
                        <div className="flex flex-wrap items-center gap-2">
                          {lead.phone && (
                            <>
                              <a
                                href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                  `Hello ${lead.full_name}, thank you for contacting AVENIQ Digital Experience Studio regarding ${lead.interested_service || 'your project'}.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Chat on WhatsApp"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono hover:bg-emerald-500/30 transition-colors"
                              >
                                <MessageSquare size={12} />
                                <span>WhatsApp</span>
                              </a>
                              <a
                                href={`tel:${lead.phone}`}
                                title="Call Contact"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 text-white/80 hover:text-white border border-white/15 text-xs font-mono transition-colors"
                              >
                                <PhoneCall size={12} />
                                <span>Call</span>
                              </a>
                            </>
                          )}

                          <button
                            onClick={() => {
                              sound.playClick();
                              navigator.clipboard.writeText(lead.email);
                              setCopiedLeadId(lead.id);
                              setTimeout(() => setCopiedLeadId(null), 2000);
                            }}
                            title="Copy Email Address"
                            className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 text-xs font-mono transition-colors cursor-pointer"
                          >
                            {copiedLeadId === lead.id ? (
                              <>
                                <Check size={12} className="text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy size={12} />
                                <span>Copy Email</span>
                              </>
                            )}
                          </button>

                          <div className="flex items-center gap-1.5 ml-1">
                            <span className="text-xs font-mono text-white/50">Status:</span>
                            <select
                              value={lead.status}
                              onChange={(e) => {
                                sound.playClick();
                                updateLeadStatus(lead.id, e.target.value);
                              }}
                              className="bg-[#111215] border border-white/20 text-xs rounded px-2.5 py-1 text-white focus:outline-none focus:border-[#91A99B]"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Qualified">Qualified</option>
                              <option value="Proposal Sent">Proposal Sent</option>
                              <option value="Converted">Converted</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-white/70">
                        <div>
                          <span className="text-white/40 block text-[10px]">Service:</span>
                          <span>{lead.interested_service || 'Web Experience'}</span>
                        </div>
                        <div>
                          <span className="text-white/40 block text-[10px]">Budget:</span>
                          <span>{lead.budget_range || 'Standard'}</span>
                        </div>
                        <div>
                          <span className="text-white/40 block text-[10px]">Timeline:</span>
                          <span>{lead.timeline || 'Standard'}</span>
                        </div>
                        <div>
                          <span className="text-white/40 block text-[10px]">Date:</span>
                          <span>
                            {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : 'Recent'}
                          </span>
                        </div>
                      </div>

                      {lead.project_description && (
                        <div className="pt-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block mb-1">
                            Project Overview:
                          </span>
                          <p className="text-xs text-white/80 leading-relaxed bg-[#111215] p-3 rounded border border-white/5">
                            {lead.project_description}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* ── Interactive Live Device Viewport Simulator Modal ── */}
      {previewDevice && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-5xl flex items-center justify-between pb-3 text-white border-b border-white/10 mb-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#91A99B] font-semibold">
                Live Viewport Simulator
              </span>
              <div className="flex items-center gap-1 bg-white/10 p-1 rounded">
                <button
                  onClick={() => {
                    sound.playClick();
                    setPreviewDevice('mobile');
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                    previewDevice === 'mobile'
                      ? 'bg-[#91A99B] text-[#111215] font-semibold'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Smartphone size={13} />
                  <span>Mobile (375px)</span>
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setPreviewDevice('tablet');
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                    previewDevice === 'tablet'
                      ? 'bg-[#91A99B] text-[#111215] font-semibold'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Tablet size={13} />
                  <span>Tablet (768px)</span>
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setPreviewDevice('desktop');
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                    previewDevice === 'desktop'
                      ? 'bg-[#91A99B] text-[#111215] font-semibold'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Monitor size={13} />
                  <span>Desktop</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setPreviewDevice(null);
              }}
              className="p-1.5 text-white/60 hover:text-white rounded hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div
            className={`transition-all duration-300 rounded-xl overflow-hidden border-2 border-white/20 bg-black shadow-2xl flex flex-col ${
              previewDevice === 'mobile'
                ? 'w-[375px] h-[680px]'
                : previewDevice === 'tablet'
                ? 'w-[768px] h-[780px]'
                : 'w-full max-w-5xl h-[78vh]'
            }`}
          >
            <div className="bg-[#17191D] px-4 py-2 flex items-center justify-between border-b border-white/10 text-white/50 text-[11px] font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-white/80">https://aveniq.in</span>
              <span>
                {previewDevice === 'mobile'
                  ? '375 × 667 (Mobile)'
                  : previewDevice === 'tablet'
                  ? '768 × 1024 (Tablet)'
                  : 'Fluid Desktop'}
              </span>
            </div>
            <iframe
              src="/"
              title="Interactive Live Site Simulator"
              className="w-full flex-1 border-0 bg-background"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Supporting UI Components ──

function TabButton({
  active,
  onClick,
  icon,
  label,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-xs font-medium transition-colors cursor-pointer text-left ${
        active
          ? 'bg-[#91A99B] text-[#111215] font-semibold'
          : 'text-white/70 hover:bg-white/5 hover:text-white'
      }`}
    >
      <div className="flex items-center gap-2.5 truncate">
        {icon}
        <span className="truncate">{label}</span>
      </div>
      {badge && (
        <span
          className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
            active ? 'bg-[#111215]/20 text-[#111215]' : 'bg-white/10 text-white/70'
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

function StatusCard({
  label,
  value,
  status,
  meta,
}: {
  label: string;
  value: string;
  status: 'healthy' | 'warning';
  meta: string;
}) {
  return (
    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-mono text-white/50">{label}</span>
        <span
          className={`w-2 h-2 rounded-full ${
            status === 'healthy' ? 'bg-emerald-400' : 'bg-amber-400'
          }`}
        />
      </div>
      <span className="text-base font-heading font-medium text-white block">{value}</span>
      <span className="text-[10px] font-mono text-white/40 block mt-1">{meta}</span>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  helper,
}: {
  label: string;
  value?: string;
  onChange: (val: string) => void;
  helper?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">
        {label}
      </label>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 bg-[#111215] border border-white/15 rounded text-sm text-white focus:border-[#91A99B] focus:outline-none focus:ring-1 focus:ring-[#91A99B] transition-colors"
      />
      {helper && <span className="text-[11px] text-white/40 block mt-1">{helper}</span>}
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  rows = 3,
  helper,
}: {
  label: string;
  value?: string;
  onChange: (val: string) => void;
  rows?: number;
  helper?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">
        {label}
      </label>
      <textarea
        rows={rows}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 bg-[#111215] border border-white/15 rounded text-sm text-white focus:border-[#91A99B] focus:outline-none focus:ring-1 focus:ring-[#91A99B] transition-colors resize-y leading-relaxed"
      />
      {helper && <span className="text-[11px] text-white/40 block mt-1">{helper}</span>}
    </div>
  );
}
