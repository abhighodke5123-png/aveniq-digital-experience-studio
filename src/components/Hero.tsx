'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  fadeInUp,
  slideInRight,
  staggerContainer,
  viewportConfig,
} from '@/lib/animations';

function ArchitecturalComposition() {
  return (
    <svg
      viewBox="0 0 480 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-h-[560px]"
      aria-hidden="true"
    >
      <rect x="60" y="40" width="280" height="360" fill="#91A99B" opacity="0.18" />
      <rect x="160" y="0" width="200" height="480" stroke="#E5E2DC" strokeWidth="1.5" fill="none" />
      <rect x="220" y="100" width="160" height="200" fill="#17191D" />
      <rect x="0" y="320" width="320" height="48" fill="#91A99B" opacity="0.35" />
      <rect x="100" y="140" width="80" height="80" fill="#17191D" opacity="0.08" />
      <circle cx="400" cy="120" r="60" stroke="#91A99B" strokeWidth="1.5" fill="none" />
      <circle cx="400" cy="120" r="8" fill="#91A99B" />
      <line x1="420" y1="200" x2="420" y2="520" stroke="#E5E2DC" strokeWidth="1" />
      <line x1="40" y1="440" x2="460" y2="440" stroke="#E5E2DC" strokeWidth="1" />
      <line x1="320" y1="300" x2="460" y2="380" stroke="#91A99B" strokeWidth="1" opacity="0.6" />
      <rect x="380" y="460" width="40" height="40" fill="#17191D" opacity="0.06" />
      <rect x="430" y="460" width="40" height="40" stroke="#E5E2DC" strokeWidth="1" fill="none" />
      <rect x="60" y="60" width="120" height="2" fill="#91A99B" />
      <circle cx="80" cy="500" r="4" fill="#91A99B" opacity="0.5" />
      <line x1="280" y1="480" x2="280" y2="540" stroke="#E5E2DC" strokeWidth="1" />
      <line x1="250" y1="510" x2="310" y2="510" stroke="#E5E2DC" strokeWidth="1" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 gap-16">
          <motion.div
            className="lg:w-[58%] flex flex-col gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs uppercase tracking-[0.2em] text-secondary"
            >
              Independent Digital Experience Studio
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-tight text-foreground max-w-4xl"
            >
              Your next stage of growth starts with a better digital presence.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-secondary max-w-xl"
            >
              We design and build high-performance digital experiences that help
              businesses attract, engage and convert their audiences.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Link
                href="/contact"
                className="inline-flex items-center bg-foreground text-background px-8 py-4 text-sm font-medium transition-colors duration-300 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                Start a Project ↗
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center border border-border text-foreground px-8 py-4 text-sm font-medium transition-colors duration-300 hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                Explore Our Work ↓
              </Link>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-xs uppercase tracking-[0.15em] text-secondary pt-8"
            >
              Strategy / Design / Technology / Growth
            </motion.p>
          </motion.div>

          <motion.div
            className="lg:w-[42%] flex items-center justify-center"
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <ArchitecturalComposition />
          </motion.div>
        </div>
      </div>
    </section>
  );
}