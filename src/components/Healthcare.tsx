'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSiteContent } from '@/context/SiteContentContext';
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
      <rect x="32" y="124" width="220" height="8" rx="2" fill="#777873" />
      <rect x="32" y="136" width="160" height="8" rx="2" fill="#777873" />
      <rect x="32" y="156" width="80" height="22" rx="3" fill="#91A99B" />
      <rect x="120" y="156" width="72" height="22" rx="3" stroke="#3d4047" fill="none" />

      {/* Specialty cards grid */}
      <rect x="16" y="242" width="116" height="72" rx="2" fill="#202328" stroke="#2a2d33" />
      <circle cx="36" cy="262" r="8" fill="#91A99B" opacity="0.4" />
      <rect x="30" y="278" width="60" height="7" rx="2" fill="#F7F6F2" opacity="0.8" />
      <rect x="30" y="290" width="40" height="5" rx="2" fill="#777873" />

      <rect x="142" y="242" width="116" height="72" rx="2" fill="#202328" stroke="#2a2d33" />
      <circle cx="162" cy="262" r="8" fill="#91A99B" opacity="0.4" />
      <rect x="156" y="278" width="60" height="7" rx="2" fill="#F7F6F2" opacity="0.8" />
      <rect x="156" y="290" width="40" height="5" rx="2" fill="#777873" />

      <rect x="268" y="242" width="116" height="72" rx="2" fill="#202328" stroke="#2a2d33" />
      <circle cx="288" cy="262" r="8" fill="#91A99B" opacity="0.4" />
      <rect x="282" y="278" width="60" height="7" rx="2" fill="#F7F6F2" opacity="0.8" />
      <rect x="282" y="290" width="40" height="5" rx="2" fill="#777873" />

      {/* Doctor profile card */}
      <rect x="16" y="326" width="368" height="64" rx="2" fill="#202328" stroke="#2a2d33" />
      <circle cx="48" cy="358" r="16" fill="#2a2d33" />
      <rect x="76" y="346" width="100" height="8" rx="2" fill="#F7F6F2" opacity="0.8" />
      <rect x="76" y="358" width="140" height="6" rx="2" fill="#777873" />
      <rect x="76" y="368" width="60" height="5" rx="2" fill="#91A99B" />
      <rect x="300" y="348" width="68" height="20" rx="3" fill="#91A99B" opacity="0.8" />

      {/* Appointment CTA bar */}
      <rect x="16" y="402" width="368" height="40" rx="2" fill="#1A1C20" stroke="#91A99B" strokeOpacity="0.3" />
      <rect x="32" y="416" width="140" height="8" rx="2" fill="#F7F6F2" opacity="0.7" />
      <rect x="296" y="412" width="72" height="20" rx="3" fill="#91A99B" />
    </svg>
  );
}

export default function Healthcare() {
  const { content } = useSiteContent();
  const hc = content.healthcare;
  const activeFeatures = hc.features || features;

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
              className="text-xs uppercase tracking-[0.2em] text-[#777873] font-medium"
            >
              Our Specialisation — {hc.badge || 'Healthcare'}
            </motion.p>

            <motion.h2
              variants={fadeInUp}
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-white mt-6 leading-tight"
            >
              {hc.headline}
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-[#999] text-lg leading-relaxed mt-6 max-w-2xl"
            >
              {hc.description}
            </motion.p>

            {/* Feature list */}
            <motion.ul
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6 mt-10"
            >
              {activeFeatures.map((feature) => (
                <motion.li
                  key={feature}
                  variants={fadeInUp}
                  className="flex items-center gap-3 text-sm text-[#E5E2DC]"
                >
                  <span className="text-[#91A99B] font-bold">—</span>
                  {feature}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeInUp} className="mt-10">
              <Link
                href="/healthcare"
                className="inline-flex items-center gap-2 border border-[#333] text-white px-8 py-4 text-sm font-medium transition-colors duration-300 hover:border-[#91A99B] hover:text-[#91A99B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#91A99B]"
              >
                Explore Healthcare Solutions ↗
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex justify-center lg:justify-end"
          >
            <HospitalMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
