'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AiStudioScoper from '@/components/AiStudioScoper';
import {
  Globe,
  Palette,
  TrendingUp,
  Bot,
  Server,
  ArrowRight,
  CheckCircle2,
  Sliders,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { serviceCatalog } from '@/data/catalog';

const serviceIcons: Record<string, typeof Globe> = {
  'service-01': Globe,
  'service-02': Palette,
  'service-03': TrendingUp,
  'service-04': Bot,
  'service-05': Server,
};

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('service-01');
  const currentService = serviceCatalog.find((s) => s.id === activeTab) || serviceCatalog[0];
  const Icon = serviceIcons[currentService.id] || Globe;

  // Interactive Scope Calculator state
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([
    'Custom Next.js Website',
    'Local SEO & Schema',
  ]);

  const pricingItems = [
    { name: 'Custom Next.js Website', category: 'Design & Code', weeks: 3 },
    { name: 'Brand & Visual Identity System', category: 'Creative', weeks: 2 },
    { name: 'Doctor / Specialist Directory', category: 'Healthcare', weeks: 2 },
    { name: 'WhatsApp Booking Flow', category: 'Automation', weeks: 1 },
    { name: 'Local SEO & Schema', category: 'Growth', weeks: 1 },
    { name: 'Client Portal / Auth0 Integration', category: 'Engineering', weeks: 2 },
  ];

  const toggleNeed = (name: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const totalWeeks = Math.max(
    3,
    selectedNeeds.reduce((acc, curr) => {
      const match = pricingItems.find((p) => p.name === curr);
      return acc + (match ? match.weeks * 0.7 : 0);
    }, 1)
  );

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background text-foreground pt-32 pb-24 lg:pt-40 lg:pb-32">
        {/* Header Hero */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-20 lg:mb-28">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs uppercase tracking-[0.2em] text-secondary font-medium"
            >
              Capability Spectrum — What We Do
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium mt-4 leading-tight"
            >
              End-to-end digital capabilities designed to accelerate growth.
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-secondary text-lg mt-6 leading-relaxed max-w-2xl"
            >
              We merge strategic brand positioning, architectural interface design, resilient engineering, and algorithmic growth tactics into one cohesive digital solution.
            </motion.p>
          </motion.div>
        </section>

        {/* Interactive Capability Directory */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-28">
          <div className="border border-border bg-white/40 p-6 md:p-10 lg:p-12 shadow-xs">
            {/* Nav Tabs */}
            <div className="flex flex-wrap gap-2 pb-8 border-b border-border">
              {serviceCatalog.map((service) => {
                const isSelected = activeTab === service.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveTab(service.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-foreground text-background shadow-xs'
                        : 'border border-border text-secondary hover:border-foreground hover:text-foreground'
                    }`}
                  >
                    <span className={isSelected ? 'text-accent' : 'text-secondary/60'}>
                      {service.number}
                    </span>
                    <span>{service.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Service Detail Pane */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentService.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="pt-10 grid grid-cols-1 lg:grid-cols-12 gap-12"
              >
                {/* Left Overview (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center text-foreground">
                      <Icon size={20} className="text-accent" />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-secondary">
                      Service Code {currentService.number}
                    </span>
                  </div>

                  <h2 className="font-heading text-2xl sm:text-3xl font-medium text-foreground">
                    {currentService.tagline}
                  </h2>

                  <p className="text-secondary text-base leading-relaxed">
                    {currentService.description}
                  </p>

                  <div className="pt-4">
                    <p className="text-xs uppercase tracking-wider font-semibold text-secondary mb-3">
                      Core Deliverables & Specifications
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentService.deliverables.map((item) => (
                        <div key={item} className="flex items-start gap-2.5 text-xs text-foreground/90 bg-background/60 p-3 border border-border">
                          <CheckCircle2 size={15} className="text-accent shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 flex flex-wrap gap-4 items-center">
                    <Link
                      href={`/contact?service=${encodeURIComponent(currentService.title)}`}
                      className="inline-flex items-center gap-2 px-7 py-3.5 bg-foreground text-background text-xs font-medium uppercase tracking-wider hover:bg-accent transition-colors"
                    >
                      <span>Commission {currentService.title}</span>
                      <ArrowRight size={14} />
                    </Link>
                    <span className="text-xs text-secondary italic">
                      Dedicated lead & SLA guarantee included.
                    </span>
                  </div>
                </div>

                {/* Right Specifications (5 Cols) */}
                <div className="lg:col-span-5 bg-background p-6 md:p-8 border border-border space-y-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-secondary block mb-2">
                      Optimal Application
                    </span>
                    <p className="text-sm font-medium text-foreground">
                      {currentService.idealFor}
                    </p>
                  </div>

                  <div className="border-t border-border pt-6">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-secondary block mb-3">
                      Architectural Stack
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentService.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-mono bg-white border border-border text-foreground/80 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border pt-6 space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-secondary block">
                      Quality Standards
                    </span>
                    <div className="flex items-center gap-2 text-xs text-secondary">
                      <Zap size={14} className="text-accent" />
                      <span>Sub-second page transitions & TTFB</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-secondary">
                      <ShieldCheck size={14} className="text-accent" />
                      <span>Zero vendor lock-in; 100% code ownership</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-secondary">
                      <Sparkles size={14} className="text-accent" />
                      <span>Rigorous WCAG 2.1 AA accessibility testing</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Interactive Scope & Timeline Estimator */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-28">
          <div className="border border-border p-8 md:p-12 bg-white">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent mb-2">
                  <Sliders size={14} />
                  <span>Interactive Project Estimator</span>
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-medium text-foreground">
                  Calculate your project timeline & scope
                </h3>
              </div>
              <p className="text-xs text-secondary max-w-sm">
                Select your required studio modules to estimate average sprint duration and scope requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
              {/* Module selection */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pricingItems.map((item) => {
                  const active = selectedNeeds.includes(item.name);
                  return (
                    <button
                      key={item.name}
                      onClick={() => toggleNeed(item.name)}
                      className={`text-left p-4 border transition-all cursor-pointer flex items-center justify-between ${
                        active
                          ? 'border-accent bg-accent/10 text-foreground font-medium'
                          : 'border-border bg-background/50 text-secondary hover:border-foreground/40'
                      }`}
                    >
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider block text-secondary">
                          {item.category}
                        </span>
                        <span className="text-sm text-foreground mt-0.5 block">{item.name}</span>
                      </div>
                      <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                        active ? 'bg-accent border-accent text-white' : 'border-border'
                      }`}>
                        {active ? '✓' : '+'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Estimate Result Box */}
              <div className="lg:col-span-4 bg-[#17191D] text-white p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#91A99B]">
                    Project Estimation
                  </span>
                  <div className="mt-4">
                    <p className="text-xs text-[#777873]">Selected Capabilities</p>
                    <p className="font-heading text-2xl font-medium mt-1">
                      {selectedNeeds.length} Module{selectedNeeds.length === 1 ? '' : 's'}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    <p className="text-xs text-[#777873]">Estimated Sprint Timeframe</p>
                    <p className="font-heading text-3xl font-medium text-[#91A99B] mt-1">
                      ~{Math.round(totalWeeks)} Weeks
                    </p>
                    <p className="text-[11px] text-[#777873] mt-1">
                      Includes design prototypes, engineering, and QA verification.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <Link
                    href={`/contact?selectedModules=${encodeURIComponent(selectedNeeds.join(','))}`}
                    className="block text-center w-full py-3.5 bg-white text-[#17191D] text-xs font-medium uppercase tracking-wider hover:bg-[#91A99B] transition-colors"
                  >
                    Submit Scope for Proposal ↗
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gemini AI Architectural Scoper */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-28">
          <AiStudioScoper />
        </section>

        {/* Next Steps CTA */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-secondary font-medium mb-3">
            Not Sure Which Model You Need?
          </p>
          <h3 className="font-heading text-3xl font-medium mb-6">
            Let our senior strategists architect your digital roadmap.
          </h3>
          <div className="flex justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-foreground text-background text-sm font-medium hover:bg-accent transition-colors"
            >
              Book a Strategy Call ↗
            </Link>
            <Link
              href="/healthcare"
              className="px-8 py-4 border border-border text-foreground text-sm font-medium hover:border-foreground transition-colors"
            >
              Explore Healthcare Focus ↓
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
