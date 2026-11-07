'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
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
      <rect width="400" height="480" rx="4" fill="#202328" />
      <rect x="0" y="0" width="400" height="32" rx="4" fill="#17191D" />
      <circle cx="16" cy="16" r="4" fill="#3d4047" />
      <circle cx="30" cy="16" r="4" fill="#3d4047" />
      <circle cx="44" cy="16" r="4" fill="#3d4047" />
      <rect x="100" y="10" width="200" height="12" rx="3" fill="#2a2d33" />
      <rect x="16" y="44" width="368" height="30" rx="2" fill="#252830" />
      <rect x="24" y="53" width="56" height="12" rx="2" fill="#91A99B" />
      <rect x="180" y="55" width="36" height="8" rx="2" fill="#4a4e57" />
      <rect x="226" y="55" width="40" height="8" rx="2" fill="#4a4e57" />
      <rect x="276" y="55" width="36" height="8" rx="2" fill="#4a4e57" />
      <rect x="322" y="50" width="54" height="18" rx="3" fill="#91A99B" />
      <rect x="16" y="86" width="368" height="144" rx="2" fill="#1A1C20" />
      <rect x="32" y="106" width="180" height="12" rx="2" fill="#F7F6F2" opacity="0.9" />
      <rect x="32" y="124" width="130" height="8" rx="2" fill="#777873" />
      <rect x="32" y="138" width="150" height="8" rx="2" fill="#777873" />
      <rect x="32" y="162" width="94" height="26" rx="3" fill="#91A99B" />
      <rect x="134" y="162" width="76" height="26" rx="3" stroke="#4a4e57" strokeWidth="1" fill="none" />
      <rect x="240" y="100" width="128" height="116" rx="2" fill="#252830" />
      <circle cx="304" cy="148" r="24" stroke="#91A99B" strokeWidth="1" strokeDasharray="3 3" fill="none" />
      <path d="M304 138 V158 M294 148 H314" stroke="#91A99B" strokeWidth="2" strokeLinecap="round" />
      <rect x="16" y="242" width="116" height="78" rx="2" fill="#252830" />
      <rect x="140" y="242" width="116" height="78" rx="2" fill="#252830" />
      <rect x="264" y="242" width="120" height="78" rx="2" fill="#252830" />
    </svg>
  );
}

export default function Healthcare() {
  return (
    <section id="healthcare" className="bg-[#17191D] text-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs uppercase tracking-[0.2em] text-[#91A99B] font-medium"
            >
              Our Specialisation — Healthcare
            </motion.p>

            <motion.h2
              variants={fadeInUp}
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium mt-4 leading-tight text-white"
            >
              Healthcare deserves a better digital experience.
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-[#777873] text-lg mt-6 leading-relaxed"
            >
              We help hospitals, clinics and healthcare professionals create
              modern digital experiences that make it easier for patients to
              discover services, explore specialists and request appointments.
            </motion.p>

            <motion.div
              variants={staggerContainer}
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {features.map((feature) => (
                <motion.div
                  key={feature}
                  variants={fadeInUp}
                  className="flex items-center gap-3 text-sm text-[#F7F6F2]/80"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#91A99B] shrink-0" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-10">
              <Link
                href="/healthcare"
                className="inline-flex items-center gap-2 bg-[#91A99B] text-[#17191D] px-8 py-4 text-sm font-medium transition-colors duration-300 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#91A99B]"
              >
                <span>Explore Healthcare Solutions</span>
                <span>↗</span>
              </Link>
            </motion.div>
          </motion.div>

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