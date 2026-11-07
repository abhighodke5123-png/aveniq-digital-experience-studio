'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations';

export default function Introduction() {
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
            Good businesses deserve better digital experiences.
          </motion.h2>

          <motion.div className="space-y-6" variants={fadeInUp}>
            <p className="text-secondary text-lg leading-relaxed">
              Your website is more than an online presence. It is where people
              discover your business, understand your value and decide to take
              the next step.
            </p>
            <p className="text-secondary text-lg leading-relaxed">
              At AVENIQ, we bring together thoughtful design, intelligent
              technology and business-focused strategy to create digital
              experiences that make a meaningful difference.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}