'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSiteContent } from '@/context/SiteContentContext';
import { initialWebsiteContent } from '@/data/initial-content';
import {
  fadeInUp,
  slideInRight,
  staggerContainer,
  viewportConfig,
} from '@/lib/animations';

const features = [
  'Modern hospital websites',
  'Doctor and specialist profiles',
  'Department and speciality pages',
  'Appointment enquiry systems',
  'WhatsApp integration',
  'Patient information pages',
  'Local SEO',
  'Mobile-first experiences',
];

function HospitalMockup() {
  return (
    <svg
      viewBox="0 0 400 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-h-[480px] shadow-2xl rounded-sm"
      aria-hidden="true"
    >
      {/* Browser chrome */}
      <rect width="400" height="480" rx="4" fill="#202328" />
      <rect x="0" y="0" width="400" height="32" rx="4" fill="#17191D" />
      <circle cx="16" cy="16" r="4" fill="#3d4047" />
      <circle cx="30" cy="16" r="4" fill="#3d4047" />
      <circle cx="44" cy="16" r="4" fill="#3d4047" />
      <rect x="100" y="10" width="200" height="12" rx="3" fill="#2a2d33" />

      {/* Navigation bar */}
      <rect x="16" y="44" width="368" height="30" rx="2" fill="#252830" />
      <rect x="24" y="53" width="56" height="12" rx="2" fill="#91A99B" />
      <rect x="180" y="55" width="36" height="8" rx="2" fill="#4a4e57" />
      <rect x="226" y="55" width="40" height="8" rx="2" fill="#4a4e57" />
      <rect x="276" y="55" width="36" height="8" rx="2" fill="#4a4e57" />
      <rect x="322" y="50" width="54" height="18" rx="3" fill="#91A99B" />

      {/* Hero section inside mockup */}
      <rect x="16" y="86" width="368" height="144" rx="2" fill="#1A1C20" />
      <rect x="32" y="106" width="180" height="12" rx="2" fill="#F7F6F2" opacity="0.9" />
      <rect x="32" y="124" width="130" height="8" rx="2" fill="#777873" />
      <rect x="32" y="138" width="150" height="8" rx="2" fill="#777873" />
      <rect x="32" y="162" width="94" height="26" rx="3" fill="#91A99B" />
      <rect x="134" y="162" width="76" height="26" rx="3" stroke="#4a4e57" strokeWidth="1" fill="none" />

      {/* Hero image placeholder with subtle clinical cross */}
      <rect x="240" y="100" width="128" height="116" rx="2" fill="#252830" />
      <circle cx="304" cy="148" r="24" stroke="#91A99B" strokeWidth="1" strokeDasharray="3 3" fill="none" />
      <rect x="302" y="138" width="4" height="20" rx="1" fill="#91A99B" />
      <rect x="294" y="146" width="20" height="4" rx="1" fill="#91A99B" />

      {/* Specialty cards section */}
      <rect x="16" y="242" width="368" height="222" rx="2" fill="#17191D" />
      <rect x="32" y="258" width="100" height="8" rx="2" fill="#F7F6F2" opacity="0.8" />

      {/* 4 Cards grid */}
      <rect x="32" y="278" width="162" height="74" rx="2" fill="#202328" />
      <circle cx="52" cy="298" r="8" fill="#91A99B" opacity="0.3" />
      <rect x="66" y="294" width="80" height="8" rx="2" fill="#F7F6F2" opacity="0.9" />
      <rect x="66" y="306" width="60" height="6" rx="1.5" fill="#777873" />
      <rect x="32" y="326" width="162" height="1" fill="#2a2d33" />
      <rect x="44" y="335" width="80" height="6" rx="1.5" fill="#91A99B" />

      <rect x="206" y="278" width="162" height="74" rx="2" fill="#202328" />
      <circle cx="226" cy="298" r="8" fill="#91A99B" opacity="0.3" />
      <rect x="240" y="294" width="80" height="8" rx="2" fill="#F7F6F2" opacity="0.9" />
      <rect x="240" y="306" width="60" height="6" rx="1.5" fill="#777873" />
      <rect x="206" y="326" width="162" height="1" fill="#2a2d33" />
      <rect x="218" y="335" width="80" height="6" rx="1.5" fill="#91A99B" />

      <rect x="32" y="364" width="162" height="74" rx="2" fill="#202328" />
      <circle cx="52" cy="384" r="8" fill="#91A99B" opacity="0.3" />
      <rect x="66" y="380" width="80" height="8" rx="2" fill="#F7F6F2" opacity="0.9" />
      <rect x="66" y="392" width="60" height="6" rx="1.5" fill="#777873" />
      <rect x="32" y="412" width="162" height="1" fill="#2a2d33" />
      <rect x="44" y="421" width="80" height="6" rx="1.5" fill="#91A99B" />

      <rect x="206" y="364" width="162" height="74" rx="2" fill="#202328" />
      <circle cx="226" cy="384" r="8" fill="#91A99B" opacity="0.3" />
      <rect x="240" y="380" width="80" height="8" rx="2" fill="#F7F6F2" opacity="0.9" />
      <rect x="240" y="392" width="60" height="6" rx="1.5" fill="#777873" />
      <rect x="206" y="412" width="162" height="1" fill="#2a2d33" />
      <rect x="218" y="421" width="80" height="6" rx="1.5" fill="#91A99B" />
    </svg>
  );
}

export default function Healthcare() {
  const { content } = useSiteContent();
  const hc = content?.healthcare || initialWebsiteContent.healthcare;
  const activeFeatures = hc?.features || features;

  return (
    <section id="healthcare" className="bg-[#17191D] py-24 lg:py-32 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs tracking-[0.2em] uppercase text-[#91A99B] mb-4"
            >
              {hc.badge || 'Speciality Focus'}
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-6 leading-tight"
            >
              {hc.headline}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-[#999] font-body text-base lg:text-lg leading-relaxed mb-10"
            >
              {hc.description}
            </motion.p>

            {/* Checklist */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10"
            >
              {activeFeatures.map((feature: string) => (
                <div key={feature} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#91A99B] shrink-0" />
                  <span className="text-sm text-[#ccc]">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeInUp}>
              <Link
                href="/healthcare"
                className="inline-flex items-center gap-2 bg-[#91A99B] text-[#17191D] px-6 py-3 text-sm font-medium transition-colors hover:bg-[#A5B5AA] focus-visible:outline-[#91A99B]"
              >
                <span>Healthcare Capabilities</span>
                <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Graphic mockup */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex justify-center"
          >
            <HospitalMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
