'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations';
import { useSiteContent } from '@/context/SiteContentContext';
import { initialWebsiteContent } from '@/data/initial-content';

export default function Introduction() {
  const { content } = useSiteContent();
  const intro = content?.introduction || initialWebsiteContent.introduction;

  return (
    <section id="about" className="py-24 lg:py-32 bg-[#F7F6F2] text-[#17191D] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Architectural Section Header */}
        <motion.div
          className="flex items-center justify-between border-t border-[#E5E2DC] pt-6 pb-2 text-[11px] font-mono text-[#777873] uppercase tracking-widest"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <div className="flex items-center gap-2">
            <span className="text-[#91A99B] font-bold">01 //</span>
            <span>{intro.eyebrow || 'Studio Philosophy'}</span>
          </div>
          <span>ARCHITECTURAL PRINCIPLES</span>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 lg:pt-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.h2
            className="lg:col-span-7 font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground leading-[1.15] tracking-tight"
            variants={fadeInUp}
          >
            {intro.headline}
          </motion.h2>

          <motion.div className="lg:col-span-5 space-y-6 pt-1" variants={fadeInUp}>
            <p className="text-secondary text-base sm:text-lg leading-relaxed">
              {intro.paragraph1}
            </p>
            <p className="text-secondary text-base sm:text-lg leading-relaxed">
              {intro.paragraph2}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
