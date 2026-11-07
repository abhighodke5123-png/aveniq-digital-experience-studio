'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp, viewportConfig } from '@/lib/animations';

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
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white/30" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
          </div>
          <span className="text-[10px] tracking-widest text-[#91A99B] uppercase">aurahealth.org</span>
          <span className="text-[10px] text-white/40">24/7 Care</span>
        </div>
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
          <div className="inline-block px-2 py-0.5 rounded text-[9px] tracking-wider uppercase bg-[#17191D]/5 text-[#17191D]">
            Aesthetic & Restorative Dentistry
          </div>
          <h4 className="font-heading text-lg font-medium text-[#17191D] leading-tight">
            A serene, anxiety-free digital patient experience.
          </h4>
          <div className="flex items-center gap-3 pt-2">
            <div className="flex-1 border border-[#17191D]/10 p-2 bg-white/60 rounded">
              <p className="text-[9px] text-[#777873]">Smile Design</p>
              <p className="text-xs font-medium text-[#17191D] mt-0.5">3D Scanning Workflow</p>
            </div>
            <div className="flex-1 border border-[#17191D]/10 p-2 bg-white/60 rounded">
              <p className="text-[9px] text-[#777873]">WhatsApp Booking</p>
              <p className="text-xs font-medium text-[#91A99B] mt-0.5">Direct Specialist Chat</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-[#777873] pt-2 border-t border-[#17191D]/10">
          <span>Google Local 4.9★ Integration</span>
          <span>Zero-friction Form</span>
        </div>
      </div>
    ),
  },
  {
    title: 'The Monolith — Luxury Boutique Hotel',
    industry: 'Hospitality',
    services: 'Visual Identity, Direct Booking Engine, Editorial Content',
    accent: '#B09B88',
    preview: (
      <div className="w-full h-full p-4 flex flex-col justify-between bg-[#191817] text-white font-mono text-[11px]">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white/30" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
          </div>
          <span className="text-[10px] tracking-widest text-[#B09B88] uppercase">themonolith-retreat.com</span>
          <span className="text-[10px] text-white/40">Suites & Spa</span>
        </div>
        <div className="my-auto space-y-3 py-4">
          <div className="inline-block px-2 py-0.5 rounded text-[9px] tracking-wider uppercase bg-[#B09B88]/20 text-[#B09B88]">
            Architectural Sanctuaries
          </div>
          <h4 className="font-heading text-lg font-medium text-white leading-tight">
            Immersive editorial design driving higher direct reservations.
          </h4>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
            <div className="bg-white/5 p-2 rounded">
              <span className="text-[9px] text-white/50">Direct Booking</span>
              <p className="text-xs font-semibold text-white mt-0.5">No Commission Fees</p>
            </div>
            <div className="bg-white/5 p-2 rounded">
              <span className="text-[9px] text-white/50">Virtual Room Tour</span>
              <p className="text-xs font-semibold text-[#B09B88] mt-0.5">360° Visual Engine</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-white/40 pt-2 border-t border-white/10">
          <span>Multi-Currency Engine</span>
          <span>Hospitality UX</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Verve Residences — Premium Property Developer',
    industry: 'Real Estate',
    services: 'Strategic Positioning, 3D Interactive Floorplans, Lead Capture',
    accent: '#8C9B90',
    preview: (
      <div className="w-full h-full p-4 flex flex-col justify-between bg-[#0E1311] text-white font-mono text-[11px]">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white/30" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
          </div>
          <span className="text-[10px] tracking-widest text-[#8C9B90] uppercase">ververesidences.in</span>
          <span className="text-[10px] text-white/40">Prime Real Estate</span>
        </div>
        <div className="my-auto space-y-3 py-4">
          <div className="inline-block px-2 py-0.5 rounded text-[9px] tracking-wider uppercase bg-[#8C9B90]/20 text-[#8C9B90]">
            Ultra-Luxury Urban Living
          </div>
          <h4 className="font-heading text-lg font-medium text-white leading-tight">
            Showcasing prime spaces with speed, clarity and high conversion.
          </h4>
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
            <div className="bg-white/5 p-2 rounded">
              <span className="text-[9px] text-white/50">Units</span>
              <p className="text-xs font-semibold text-white mt-0.5">3 & 4 BHK Skyvillas</p>
            </div>
            <div className="bg-white/5 p-2 rounded">
              <span className="text-[9px] text-white/50">Brochure</span>
              <p className="text-xs font-semibold text-[#8C9B90] mt-0.5">Instant WhatsApp</p>
            </div>
            <div className="bg-white/5 p-2 rounded">
              <span className="text-[9px] text-white/50">Location</span>
              <p className="text-xs font-semibold text-white mt-0.5">Interactive Map</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-white/40 pt-2 border-t border-white/10">
          <span>High-intent Buyer Funnel</span>
          <span>CRM Auto-sync</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Atelier Table — Contemporary Restaurant',
    industry: 'Hospitality',
    services: 'Brand Identity, Digital Menu, Reservation Engine, SEO',
    accent: '#91A99B',
    preview: (
      <div className="w-full h-full p-4 flex flex-col justify-between bg-[#F4F3EE] text-[#17191D] font-mono text-[11px]">
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

          <motion.h2
            variants={fadeInUp}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium mt-4 mb-16 lg:mb-20 leading-tight"
          >
            Digital experiences, thoughtfully created.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14"
        >
          {projects.map((project) => (
            <Link
              key={project.title}
              href="/work"
              className="group block cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <motion.div variants={fadeInUp}>
                <div className="relative overflow-hidden border border-border bg-[#F7F6F2] aspect-[16/10] shadow-sm transition-all duration-300 group-hover:border-accent group-hover:shadow-md">
                  <div className="w-full h-full transition-transform duration-500 group-hover:scale-[1.015]">
                    {project.preview}
                  </div>
                  <div className="absolute inset-0 flex items-end justify-end p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-black/40 via-transparent to-transparent">
                    <span className="text-xs font-medium tracking-wider uppercase text-foreground bg-background px-4 py-2 border border-border shadow-sm flex items-center gap-1">
                      Inspect Architecture ↗
                    </span>
                  </div>
                </div>

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
              </motion.div>
            </Link>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background text-xs font-medium uppercase tracking-wider hover:bg-accent transition-colors shadow-xs"
          >
            <span>Explore All Work Blueprints in Archive</span>
            <span>↗</span>
          </Link>
        </div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="border-t border-border mt-16 pt-8 text-center"
        >
          <p className="text-xs text-secondary italic">
            IMPORTANT: These are AVENIQ Concept Projects showcasing our design approach and technology capabilities across diverse sectors.
          </p>
        </motion.div>
      </div>
    </section>
  );
}