'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  Compass,
  Code2,
  CheckCircle2,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
} from 'lucide-react';
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations';

const globalPresence = [
  { country: 'India', role: 'Engineering & Creative Studio HQ', timezone: 'IST (UTC+5:30)' },
  { country: 'United States', role: 'Client Strategy & Healthcare Accounts', timezone: 'EST & PST' },
  { country: 'United Kingdom', role: 'Creative Direction & European Delivery', timezone: 'GMT (UTC+0)' },
  { country: 'Australia', role: 'Hospitality & Commercial Growth', timezone: 'AEST (UTC+10)' },
  { country: 'Canada', role: 'Enterprise Web & Technical Architecture', timezone: 'EST (UTC-5)' },
];

const studioPrinciples = [
  {
    number: '01',
    title: 'Subtractive Elegance',
    description: 'We believe premium design is not what you add, but what you have the discipline to remove. Every pixel, line, and animation must earn its existence.',
  },
  {
    number: '02',
    title: 'Clinical & Commercial Rigour',
    description: 'We do not build digital art installations that fail to convert. We design with ruthless commercial empathy: intuitive journeys, clear hierarchies, and measurable enquiries.',
  },
  {
    number: '03',
    title: 'Clean Engineering & Performance',
    description: 'We build exclusively with modern frameworks (Next.js, TypeScript, Tailwind) that score 95+ on Google Core Web Vitals and load in under 1 second on cellular networks.',
  },
  {
    number: '04',
    title: 'Zero Vendor Lock-in',
    description: 'You retain 100% intellectual property and full access to clean, documented code repositories from day one. No hostage platforms or proprietary traps.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background text-foreground pt-32 pb-24 lg:pt-40 lg:pb-32 font-body">
        {/* Header Hero */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-20 lg:mb-28">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-secondary font-medium font-mono">
              The Studio Narrative
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-medium mt-4 leading-[1.08]">
              Designed to move business forward.
            </h1>
            <p className="text-secondary text-lg sm:text-xl mt-6 leading-relaxed max-w-2xl">
              AVENIQ is an independent creative technology studio. We bridge the gap between high-level brand strategy, architectural digital design, and robust web engineering.
            </p>
          </motion.div>
        </section>

        {/* Studio Manifesto Grid */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 border-t border-b border-border py-16">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent font-semibold block mb-2">
                Why Standard Agencies Fail
              </span>
              <h2 className="font-heading text-3xl font-medium text-foreground leading-tight">
                Most websites look like copies of copies. We build distinctive digital assets.
              </h2>
              <div className="mt-6 space-y-4 text-sm text-secondary leading-relaxed">
                <p>
                  Generic templates, bloated WordPress installs, cartoon illustrations, and cheap stock photography communicate one thing to potential clients: carelessness.
                </p>
                <p>
                  When a hospital director, property developer, or luxury hotelier chooses a partner, they are not looking for raw code. They are looking for an extension of their standard of excellence.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 md:p-10 border border-border flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-secondary font-semibold block mb-3">
                  The AVENIQ Promise
                </span>
                <p className="font-heading text-xl font-medium text-foreground leading-snug">
                  &quot;Every digital experience we ship must be as operationally sound under the hood as it is aesthetically distinguished on the screen.&quot;
                </p>
              </div>

              <div className="pt-8 border-t border-border mt-8 grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-secondary block">Specialisation</span>
                  <span className="text-foreground font-semibold mt-0.5 block">Healthcare & Enterprise</span>
                </div>
                <div>
                  <span className="text-secondary block">Philosophy</span>
                  <span className="text-foreground font-semibold mt-0.5 block">Strategy First</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Studio Principles */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-28">
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-secondary">
              Operating Ethos
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-medium mt-2">
              Four non-negotiable studio principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {studioPrinciples.map((p) => (
              <div
                key={p.number}
                className="border border-border bg-white p-8 hover:border-accent transition-colors"
              >
                <span className="text-4xl font-heading font-light text-accent leading-none">
                  {p.number}
                </span>
                <h3 className="font-heading text-lg font-medium text-foreground mt-4 mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-secondary leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Global Reach Footprint */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-28">
          <div className="bg-[#17191D] text-white p-8 md:p-12 border border-white/10">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#91A99B]">
                Global Delivery Footprint
              </span>
              <h3 className="font-heading text-3xl font-medium text-white mt-2">
                Delivering international standards with regional precision
              </h3>
              <p className="text-sm text-[#999] mt-3 leading-relaxed">
                While our engineering core operates from India, we collaborate seamlessly with enterprises, hospitals, and founders across 5 continents through disciplined async communication.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {globalPresence.map((loc) => (
                <div
                  key={loc.country}
                  className="border border-white/10 p-5 bg-white/5 space-y-2"
                >
                  <div className="flex items-center gap-1.5 text-xs text-[#91A99B] font-mono">
                    <MapPin size={12} />
                    <span>{loc.country}</span>
                  </div>
                  <p className="text-xs font-medium text-white leading-snug">
                    {loc.role}
                  </p>
                  <span className="text-[10px] text-[#777873] font-mono block pt-2 border-t border-white/10">
                    {loc.timezone}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Direct Action Call */}
        <section className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="font-heading text-3xl font-medium mb-4">
            Meet your dedicated studio team
          </h3>
          <p className="text-secondary text-base mb-8 leading-relaxed">
            Every project at AVENIQ is directed by senior specialists — never passed off to junior account managers.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-foreground text-background text-sm font-medium hover:bg-accent transition-colors"
            >
              Start a Conversation ↗
            </Link>
            <Link
              href="/services"
              className="px-8 py-4 border border-border text-foreground text-sm font-medium hover:border-foreground transition-colors"
            >
              Explore Studio Capabilities
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
