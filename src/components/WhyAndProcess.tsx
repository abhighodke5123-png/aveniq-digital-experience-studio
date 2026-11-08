'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { staggerContainer, fadeInUp, viewportConfig } from '@/lib/animations';
import { useSiteContent } from '@/context/SiteContentContext';
import { initialWebsiteContent } from '@/data/initial-content';

/* ── Why AVENIQ data ── */
const values = [
  {
    number: '01',
    title: 'Strategy First',
    description:
      'Every project starts with understanding your business and objectives.',
  },
  {
    number: '02',
    title: 'Design That Matters',
    description:
      'Create intuitive and visually distinctive experiences.',
  },
  {
    number: '03',
    title: 'Technology That Scales',
    description:
      'Build responsive, secure and maintainable digital solutions.',
  },
  {
    number: '04',
    title: 'Built for Growth',
    description:
      'Develop digital foundations that support visibility, engagement and enquiries.',
  },
];

/* ── Process data ── */
const steps = [
  { number: '01', title: 'Discover', description: 'Understand your business, audience and goals.' },
  { number: '02', title: 'Strategise', description: 'Define the structure, user journey and direction.' },
  { number: '03', title: 'Design', description: 'Create a distinctive visual experience.' },
  { number: '04', title: 'Develop', description: 'Build, integrate and optimise.' },
  { number: '05', title: 'Launch & Grow', description: 'Deploy and continuously improve.' },
];

export default function WhyAndProcess() {
  const { content } = useSiteContent();
  const faqs = content?.faqs || initialWebsiteContent.faqs || [];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* ═══════ WHY AVENIQ ═══════ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="border-t border-border"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 lg:pt-16">
              {/* Left headline */}
              <div className="lg:col-span-5">
                <p className="text-xs tracking-[0.2em] uppercase text-secondary mb-4">
                  Why AVENIQ
                </p>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
                  Design that moves business forward.
                </h2>
              </div>

              {/* Right numbered list */}
              <motion.div
                className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
              >
                {values.map((v) => (
                  <motion.div key={v.number} variants={fadeInUp}>
                    <span className="font-heading text-xs text-secondary tracking-widest block mb-2">
                      {v.number}
                    </span>
                    <h3 className="text-lg font-heading font-medium mb-2">
                      {v.title}
                    </h3>
                    <p className="text-sm text-secondary leading-relaxed">
                      {v.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ OUR PROCESS ═══════ */}
      <section className="py-24 lg:py-32 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <p className="text-xs tracking-[0.2em] uppercase text-secondary mb-4">
              How We Work
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium max-w-xl mb-16 lg:mb-20">
              A structured process, from concept to launch.
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {steps.map((s) => (
              <motion.div
                key={s.number}
                variants={fadeInUp}
                className="border-t border-border pt-6"
              >
                <span className="font-heading text-xs text-secondary tracking-widest block mb-4">
                  {s.number}
                </span>
                <h3 className="text-base font-heading font-medium mb-2">
                  {s.title}
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  {s.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ FAQS ═══════ */}
      {faqs && faqs.length > 0 && (
        <section className="py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="text-center mb-16"
            >
              <p className="text-xs tracking-[0.2em] uppercase text-secondary mb-3">
                Common Questions
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-medium">
                Everything you need to know.
              </h2>
            </motion.div>

            <div className="divide-y divide-border border-y border-border">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={faq.question} className="py-6">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-left gap-4 cursor-pointer group"
                      aria-expanded={isOpen}
                    >
                      <span className="font-heading text-lg font-medium group-hover:text-accent transition-colors">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-secondary shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-accent' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="pt-4 text-sm text-secondary leading-relaxed font-body">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
