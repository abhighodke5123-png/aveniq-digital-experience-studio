'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeInUp, viewportConfig } from '@/lib/animations';
import { sound } from '@/lib/sound-fx';

interface Project {
  title: string;
  industry: string;
  services: string;
  accent: string;
  preview: React.ReactNode;
}

const projects: Project[] = [
  {
    title: 'Aura Health — Multispeciality Hospital',
    industry: 'Healthcare',
    services: 'Digital Strategy, UI/UX Architecture, Web Engineering',
    accent: '#91A99B',
    preview: (
      <div className="w-full h-full p-4 flex flex-col justify-between bg-[#131518] text-white font-mono text-[11px]">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white/30" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
          </div>
          <span className="text-[10px] tracking-widest text-[#91A99B] uppercase">aurahealth.org</span>
          <span className="text-[10px] text-white/40">24/7 Care</span>
        </div>
        {/* Mock content */}
        <div className="my-auto space-y-3 py-4">
          <div className="inline-block px-2 py-0.5 rounded text-[9px] tracking-wider uppercase bg-[#91A99B]/20 text-[#91A99B]">
            Tertiary Care & Research
          </div>
          <h4 className="font-heading text-lg font-medium text-white leading-tight">
            Clinical excellence meets compassionate patient journeys.
          </h4>
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
            <div className="bg-white/5 p-2 rounded">
              <p className="text-[9px] text-white/50">Specialists</p>
              <p className="text-xs font-semibold text-white mt-0.5">140+ Doctors</p>
            </div>
            <div className="bg-white/5 p-2 rounded">
              <p className="text-[9px] text-white/50">Appointments</p>
              <p className="text-xs font-semibold text-[#91A99B] mt-0.5">Instant Booking</p>
            </div>
            <div className="bg-white/5 p-2 rounded">
              <p className="text-[9px] text-white/50">Diagnostics</p>
              <p className="text-xs font-semibold text-white mt-0.5">NABL Accredited</p>
            </div>
          </div>
        </div>
        {/* Bottom indicator */}
        <div className="flex items-center justify-between text-[10px] text-white/40 pt-2 border-t border-white/10">
          <span>Responsive Web Application</span>
          <span>Telehealth Ready</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Dentelle Studio — Modern Dental Clinic',
    industry: 'Healthcare',
    services: 'Brand Identity, Dental Experience Design, Local SEO',
    accent: '#A5B5AA',
    preview: (
      <div className="w-full h-full p-4 flex flex-col justify-between bg-[#EFECE6] text-[#17191D] font-mono text-[11px]">
        <div className="flex items-center justify-between border-b border-[#17191D]/10 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#17191D]/30" />
            <span className="w-2 h-2 rounded-full bg-[#17191D]/20" />
            <span className="w-2 h-2 rounded-full bg-[#17191D]/20" />
          </div>
          <span className="text-[10px] tracking-widest text-[#777873] uppercase">dentelle-dental.com</span>
          <span className="text-[10px] text-[#91A99B] font-semibold">Open Consultation</span>
        </div>
        <div className="my-auto space-y-3 py-4">
          <div className="inline-block px-2 py-0.5 rounded text-[9px] tracking-wider uppercase bg-[#91A99B]/20 text-[#17191D]">
            Cosmetic & Family Dentistry
          </div>
          <h4 className="font-heading text-lg font-medium text-[#17191D] leading-tight">
            Anxiety-free clinical environments with transparent digital pricing.
          </h4>
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#17191D]/10">
            <div className="bg-white/70 p-2 rounded">
              <p className="text-[9px] text-[#777873]">Smile Quiz</p>
              <p className="text-xs font-semibold text-[#17191D] mt-0.5">2-Min Assessment</p>
            </div>
            <div className="bg-white/70 p-2 rounded">
              <p className="text-[9px] text-[#777873]">Reviews</p>
              <p className="text-xs font-semibold text-[#91A99B] mt-0.5">4.9 ★ (600+)</p>
            </div>
            <div className="bg-white/70 p-2 rounded">
              <p className="text-[9px] text-[#777873]">Tech</p>
              <p className="text-xs font-semibold text-[#17191D] mt-0.5">3D Intraoral Scan</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-[#777873] pt-2 border-t border-[#17191D]/10">
          <span>Speed-optimized Booking</span>
          <span>Google Map Pack #1</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Dr. Vane & Partners — Orthopaedic Associates',
    industry: 'Healthcare',
    services: 'Patient Education Architecture, Surgeon Profiles, HIPAA-Compliant Forms',
    accent: '#8FA697',
    preview: (
      <div className="w-full h-full p-4 flex flex-col justify-between bg-[#15181C] text-white font-mono text-[11px]">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white/30" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
          </div>
          <span className="text-[10px] tracking-widest text-[#8FA697] uppercase">vaneortho.com</span>
          <span className="text-[10px] text-white/40">Joint Restoration</span>
        </div>
        <div className="my-auto space-y-3 py-4">
          <div className="inline-block px-2 py-0.5 rounded text-[9px] tracking-wider uppercase bg-[#8FA697]/20 text-[#8FA697]">
            Orthopaedic & Sports Medicine
          </div>
          <h4 className="font-heading text-lg font-medium text-white leading-tight">
            Empowering active recovery through clear procedure pathways.
          </h4>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
            <div className="bg-white/5 p-2 rounded">
              <p className="text-[9px] text-white/50">Procedure Library</p>
              <p className="text-xs font-medium text-white mt-0.5">3D Interactive Anatomy</p>
            </div>
            <div className="bg-white/5 p-2 rounded">
              <p className="text-[9px] text-white/50">Triage Intake</p>
              <p className="text-xs font-medium text-[#8FA697] mt-0.5">Automated MRI Triage</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-white/40 pt-2 border-t border-white/10">
          <span>Sub-second Load Times</span>
          <span>Accessible WCAG AAA</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Verve Studio — Architecture & Interiors',
    industry: 'Architecture',
    services: 'Editorial Web Design, Visual Direction, Content Infrastructure',
    accent: '#91A99B',
    preview: (
      <div className="w-full h-full p-4 flex flex-col justify-between bg-[#17191D] text-white font-mono text-[11px]">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white/30" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
          </div>
          <span className="text-[10px] tracking-widest text-[#91A99B] uppercase">vervestudio.arch</span>
          <span className="text-[10px] text-white/40">Index 2026</span>
        </div>
        <div className="my-auto space-y-3 py-4">
          <div className="inline-block px-2 py-0.5 rounded text-[9px] tracking-wider uppercase bg-[#91A99B]/20 text-[#91A99B]">
            Spatial Monographs
          </div>
          <h4 className="font-heading text-lg font-medium text-white leading-tight">
            Minimalist spatial showcase capturing materiality, light, and context.
          </h4>
          <div className="flex items-center gap-3 pt-2 text-[10px] text-white/60">
            <span className="border-b border-[#91A99B] pb-0.5 text-white">Residential (24)</span>
            <span>Commercial (12)</span>
            <span>Civic (6)</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-white/40 pt-2 border-t border-white/10">
          <span>Headless Sanity CMS</span>
          <span>Adaptive Image Pipeline</span>
        </div>
      </div>
    ),
  },
  {
    title: 'L’Atelier Table — Fine Dining Experience',
    industry: 'Hospitality',
    services: 'Sensory Web Design, Interactive Tasting Menu, Reservation Flow',
    accent: '#91A99B',
    preview: (
      <div className="w-full h-full p-4 flex flex-col justify-between bg-[#F4F1EA] text-[#17191D] font-mono text-[11px]">
        <div className="flex items-center justify-between border-b border-[#17191D]/10 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#17191D]/30" />
            <span className="w-2 h-2 rounded-full bg-[#17191D]/20" />
            <span className="w-2 h-2 rounded-full bg-[#17191D]/20" />
          </div>
          <span className="text-[10px] tracking-widest text-[#777873] uppercase">ateliertable.com</span>
          <span className="text-[10px] text-[#91A99B] font-semibold">Reserve a Table</span>
        </div>
        <div className="my-auto space-y-3 py-4">
          <div className="inline-block px-2 py-0.5 rounded text-[9px] tracking-wider uppercase bg-[#91A99B]/20 text-[#17191D]">
            Modern Seasonal Gastronomy
          </div>
          <h4 className="font-heading text-lg font-medium text-[#17191D] leading-tight">
            Appetising visuals paired with an effortless 2-click booking flow.
          </h4>
          <div className="flex items-center gap-3 pt-2">
            <div className="flex-1 border border-[#17191D]/10 p-2 bg-white/70 rounded">
              <p className="text-[9px] text-[#777873]">Tasting Menu</p>
              <p className="text-xs font-medium text-[#17191D] mt-0.5">Live Dietary Filter</p>
            </div>
            <div className="flex-1 border border-[#17191D]/10 p-2 bg-white/70 rounded">
              <p className="text-[9px] text-[#777873]">Reservations</p>
              <p className="text-xs font-medium text-[#91A99B] mt-0.5">Realtime Table Availability</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-[#777873] pt-2 border-t border-[#17191D]/10">
          <span>Mobile-first QR Menu</span>
          <span>Google Reserve Enabled</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Kestrel Cloud — SaaS Startup Platform',
    industry: 'Technology',
    services: 'Product Narrative, Design System, Next.js Web Platform',
    accent: '#7FA396',
    preview: (
      <div className="w-full h-full p-4 flex flex-col justify-between bg-[#15181C] text-white font-mono text-[11px]">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white/30" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
          </div>
          <span className="text-[10px] tracking-widest text-[#7FA396] uppercase">kestrelcloud.io</span>
          <span className="text-[10px] text-white/40">v2.4 Live</span>
        </div>
        <div className="my-auto space-y-3 py-4">
          <div className="inline-block px-2 py-0.5 rounded text-[9px] tracking-wider uppercase bg-[#7FA396]/20 text-[#7FA396]">
            Distributed Workflow Intelligence
          </div>
          <h4 className="font-heading text-lg font-medium text-white leading-tight">
            High-converting product landing experience for global dev teams.
          </h4>
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
            <div className="bg-white/5 p-2 rounded">
              <span className="text-[9px] text-white/50">Performance</span>
              <p className="text-xs font-semibold text-white mt-0.5">99/100 Lighthouse</p>
            </div>
            <div className="bg-white/5 p-2 rounded">
              <span className="text-[9px] text-white/50">Conversion</span>
              <p className="text-xs font-semibold text-[#7FA396] mt-0.5">4.8% Free Trial</p>
            </div>
            <div className="bg-white/5 p-2 rounded">
              <span className="text-[9px] text-white/50">Framework</span>
              <p className="text-xs font-semibold text-white mt-0.5">Next.js Edge</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-white/40 pt-2 border-t border-white/10">
          <span>Self-serve Onboarding</span>
          <span>Documentation Engine</span>
        </div>
      </div>
    ),
  },
];

export default function Work() {
  const [filter, setFilter] = useState<string>('all');

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    return p.industry.toLowerCase() === filter.toLowerCase();
  });

  const categories = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'healthcare', label: 'Healthcare & Clinical', count: projects.filter((p) => p.industry === 'Healthcare').length },
    { id: 'technology', label: 'Technology & SaaS', count: projects.filter((p) => p.industry === 'Technology').length },
    { id: 'hospitality', label: 'Hospitality', count: projects.filter((p) => p.industry === 'Hospitality').length },
  ];

  return (
    <section id="work" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.p
            variants={fadeInUp}
            className="text-xs uppercase tracking-[0.2em] text-secondary"
          >
            Selected Work
          </motion.p>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <motion.h2
              variants={fadeInUp}
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium leading-tight max-w-2xl"
            >
              Digital experiences, thoughtfully created.
            </motion.h2>

            {/* Interactive Category Filter Pills */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-2"
              role="tablist"
              aria-label="Filter projects by industry"
            >
              {categories.map((cat) => {
                const isActive = filter === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      sound.playClick();
                      setFilter(cat.id);
                    }}
                    role="tab"
                    aria-selected={isActive}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                      isActive
                        ? 'bg-foreground text-background font-semibold shadow-xs'
                        : 'bg-foreground/[0.04] text-secondary hover:text-foreground hover:bg-foreground/[0.08]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive ? 'bg-background/20 text-background' : 'bg-foreground/10 text-secondary'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href="/work"
                  className="group block cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {/* Visual Mockup Container */}
                  <div className="relative overflow-hidden border border-border bg-[#F7F6F2] aspect-[16/10] shadow-sm transition-all duration-300 group-hover:border-accent group-hover:shadow-md">
                    <div className="w-full h-full transition-transform duration-500 group-hover:scale-[1.015]">
                      {project.preview}
                    </div>
                    {/* View Project interactive pill */}
                    <div className="absolute inset-0 flex items-end justify-end p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-black/40 via-transparent to-transparent">
                      <span className="text-xs font-medium tracking-wider uppercase text-foreground bg-background px-4 py-2 border border-border shadow-sm flex items-center gap-1">
                        Inspect Architecture ↗
                      </span>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="mt-5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs uppercase tracking-wider text-secondary font-medium">
                        {project.industry}
                      </p>
                      <span className="text-xs text-accent font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        View full case study ↗
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-medium text-foreground mt-1 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-secondary mt-1">
                      {project.services}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
