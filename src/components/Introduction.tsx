'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations';
import { useSiteContent } from '@/context/SiteContentContext';

export default function Introduction() {
  const { content } = useSiteContent();
  const intro = content.introduction;

  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="border-t border-border"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        />

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 pt-16 lg:pt-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.h2
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-primary max-w-3xl leading-tight"
            variants={fadeInUp}
          >
            {intro.headline}
          </motion.h2>

          <motion.div className="space-y-6" variants={fadeInUp}>
            <p className="text-secondary text-lg leading-relaxed">
              {intro.paragraph1}
            </p>
            <p className="text-secondary text-lg leading-relaxed">
              {intro.paragraph2}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
