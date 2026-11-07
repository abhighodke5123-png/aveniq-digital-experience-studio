'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Sliders,
  Check,
  Copy,
  ExternalLink,
  PhoneCall,
  Clock,
  Sparkles,
  Layers,
  Zap,
} from 'lucide-react';
import { sound } from '@/lib/sound-fx';

type ProjectScale = 'sprint' | 'flagship' | 'enterprise';
type IndustryDomain = 'healthcare' | 'technology' | 'luxury';

interface FeatureOption {
  id: string;
  name: string;
  desc: string;
  weeks: number;
}

const SCALE_CONFIG: Record<
  ProjectScale,
  { label: string; tag: string; baseWeeks: number; baseBudget: string }
> = {
  sprint: {
    label: 'Rapid Studio Sprint',
    tag: 'Quick Launch MVP',
    baseWeeks: 3,
    baseBudget: '₹1.5L — ₹3.5L',
  },
  flagship: {
    label: 'Full Digital Flagship',
    tag: 'High-Converting Web Platform',
    baseWeeks: 5,
    baseBudget: '₹4.5L — ₹8.5L',
  },
  enterprise: {
    label: 'Enterprise Clinical Suite',
    tag: 'Hospital / Multi-Service System',
    baseWeeks: 8,
    baseBudget: '₹9.0L — ₹16.0L',
  },
};

const FEATURE_LIST: FeatureOption[] = [
  { id: 'triage', name: 'Instant Doctor / Triage Bed Booking', desc: 'Direct patient triage & consultation flows', weeks: 1 },
  { id: 'ai', name: 'AI Studio Scoper & Smart Assistant', desc: 'Interactive LLM inquiry & blueprint engine', weeks: 1 },
  { id: 'motion', name: 'Bespoke Framer Motion & 3D Shaders', desc: 'Fluid micro-interactions & prestige feel', weeks: 1 },
  { id: 'seo', name: 'Rank-Ready Programmatic SEO', desc: 'Edge metadata & structured Schema markup', weeks: 0.5 },
  { id: 'portal', name: 'Client Portal & Auth0 SSO', desc: 'Role-based access & encrypted session tokens', weeks: 1 },
];

export default function ProjectSimulator() {
  const [scale, setScale] = useState<ProjectScale>('flagship');
  const [domain, setDomain] = useState<IndustryDomain>('healthcare');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['triage', 'motion', 'seo']);
  const [copied, setCopied] = useState(false);

  const toggleFeature = (id: string) => {
    sound.playClick();
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const calculated = useMemo(() => {
    const base = SCALE_CONFIG[scale];
    const addedWeeks = selectedFeatures.reduce((acc, fId) => {
      const feat = FEATURE_LIST.find((f) => f.id === fId);
      return acc + (feat ? feat.weeks : 0);
    }, 0);

    const totalWeeks = Math.round((base.baseWeeks + addedWeeks) * 10) / 10;
    const coreTech = [
      'Next.js 16 Edge Runtime',
      'TypeScript Strict Mode',
      'Tailwind CSS v4 Design Tokens',
      domain === 'healthcare' ? 'Clinical HL7 / Patient Privacy' : 'Multi-tenant Edge Cache',
    ];

    if (selectedFeatures.includes('ai')) coreTech.push('Google Gemini 2.0 API');
    if (selectedFeatures.includes('portal')) coreTech.push('Auth0 SSO + Supabase RLS');

    return {
      timeline: `${totalWeeks} Weeks`,
      budget: base.baseBudget,
      tech: coreTech,
    };
  }, [scale, domain, selectedFeatures]);

  const copyBlueprint = () => {
    sound.playSuccess();
    const text = `AVENIQ Architecture Blueprint:
Tier: ${SCALE_CONFIG[scale].label} (${SCALE_CONFIG[scale].tag})
Domain: ${domain.toUpperCase()}
Features: ${selectedFeatures.map((f) => FEATURE_LIST.find((item) => item.id === f)?.name).join(', ')}
Estimated Timeline: ${calculated.timeline}
Estimated Range: ${calculated.budget}
Hotline: +91 9226638440
AVENIQ Studio`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello AVENIQ Studio, I configured a ${SCALE_CONFIG[scale].label} for ${domain.toUpperCase()} with timeline ${calculated.timeline}. I'd like to schedule an architectural consultation.`
  );

  return (
    <section className="py-20 bg-[#14161A] text-[#F7F6F2] border-y border-white/10 relative overflow-hidden">
      {/* Background architectural glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#91A99B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-[#91A99B]/20 text-[#91A99B] border border-[#91A99B]/30 mb-3">
              <Sliders size={13} />
              Interactive Studio Simulator
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-white leading-tight">
              Model your digital platform in real time.
            </h2>
            <p className="text-sm text-white/60 mt-2 max-w-xl">
              Toggle tiers, clinical specifications, and bespoke modules to see timeline, architecture stack, and deliverable blueprint instantly.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-white/40">Studio Capacity:</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Q2 2026 Slots Open
            </span>
          </div>
        </div>

        {/* Interactive Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls — 7 Cols */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Scale Tier */}
            <div className="bg-[#1A1D22] border border-white/10 p-6 rounded-lg space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#91A99B] block">
                01. Select Project Tier
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(Object.keys(SCALE_CONFIG) as ProjectScale[]).map((key) => {
                  const item = SCALE_CONFIG[key];
                  const isSelected = scale === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        sound.playClick();
                        setScale(key);
                      }}
                      className={`p-3.5 rounded border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#91A99B]/20 border-[#91A99B] text-white shadow-sm'
                          : 'bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.06] hover:text-white'
                      }`}
                    >
                      <span className="font-heading text-sm font-medium block">{item.label}</span>
                      <span className="text-[11px] text-white/40 block mt-1">{item.tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Industry Focus */}
            <div className="bg-[#1A1D22] border border-white/10 p-6 rounded-lg space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#91A99B] block">
                02. Industry Domain & Security Standard
              </span>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'healthcare', label: 'Healthcare & Hospital' },
                  { id: 'technology', label: 'SaaS & AI Technology' },
                  { id: 'luxury', label: 'Luxury Brand & Flagship' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      sound.playClick();
                      setDomain(item.id as IndustryDomain);
                    }}
                    className={`p-3 rounded border text-xs font-medium text-center transition-all cursor-pointer ${
                      domain === item.id
                        ? 'bg-[#91A99B] text-[#111215] font-semibold border-[#91A99B]'
                        : 'bg-white/[0.03] border-white/10 text-white/70 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Feature Add-ons */}
            <div className="bg-[#1A1D22] border border-white/10 p-6 rounded-lg space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#91A99B] block">
                03. Architectural Features & Modules
              </span>
              <div className="space-y-2">
                {FEATURE_LIST.map((feat) => {
                  const active = selectedFeatures.includes(feat.id);
                  return (
                    <div
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`p-3 rounded border flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                        active
                          ? 'bg-[#91A99B]/15 border-[#91A99B]/50 text-white'
                          : 'bg-white/[0.02] border-white/10 text-white/60 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                            active ? 'bg-[#91A99B] text-[#111215]' : 'border border-white/30'
                          }`}
                        >
                          {active && <Check size={13} strokeWidth={3} />}
                        </div>
                        <div>
                          <span className="text-xs font-medium text-white block">{feat.name}</span>
                          <span className="text-[11px] text-white/40 block">{feat.desc}</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-[#91A99B] shrink-0">
                        +{feat.weeks} wk
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Real-time Calculation Panel — 5 Cols */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-[#1A1D22] border border-white/10 rounded-xl p-6 lg:p-7 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#91A99B]">
                  Live Blueprint Telemetry
                </span>
                <span className="flex items-center gap-1.5 text-xs font-mono text-white/50">
                  <Zap size={13} className="text-[#91A99B]" />
                  Sub-second Ready
                </span>
              </div>

              {/* Live Metric Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                  <span className="text-xs font-mono text-white/40 flex items-center gap-1 mb-1">
                    <Clock size={12} />
                    Estimated Sprint
                  </span>
                  <span className="text-2xl font-heading font-medium text-white block">
                    {calculated.timeline}
                  </span>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                  <span className="text-xs font-mono text-white/40 flex items-center gap-1 mb-1">
                    <Sparkles size={12} />
                    Bracket Estimate
                  </span>
                  <span className="text-lg font-heading font-medium text-[#91A99B] block">
                    {calculated.budget}
                  </span>
                </div>
              </div>

              {/* Architecture Blueprint Stack */}
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-white/40 block mb-2">
                  Engineered Architecture Stack:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {calculated.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-white/5 border border-white/10 rounded text-[11px] font-mono text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={`https://wa.me/919226638440?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded bg-[#91A99B] hover:bg-[#A5B5AA] text-[#111215] font-semibold text-xs tracking-wider uppercase transition-colors shadow-sm"
                >
                  <PhoneCall size={14} />
                  <span>Discuss Blueprint on WhatsApp (+91 9226638440)</span>
                </a>

                <button
                  onClick={copyBlueprint}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span className="text-emerald-400">Blueprint Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Full Architecture Blueprint</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-white/40">
                  Fixed-scope agreements • Zero vendor lock-in • 100% IP ownership
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
