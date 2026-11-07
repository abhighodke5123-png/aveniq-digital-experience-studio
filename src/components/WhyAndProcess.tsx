'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { staggerContainer, fadeInUp, viewportConfig } from '@/lib/animations';
import { useSiteContent } from '@/context/SiteContentContext';

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
  const faqs = content.faqs || [];
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
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="pt-16 lg:pt-20"
          >
            <motion.h2
              variants={fadeInUp}
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium max-w-4xl leading-tight"
            >
              Thoughtful design. Intelligent technology. Meaningful growth.
            </motion.h2>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-16 mt-16 lg:mt-20"
            >
              {values.map((v) => (
                <motion.div key={v.number} variants={fadeInUp}>
                  <span className="text-5xl font-heading font-light text-accent leading-none">
                    {v.number}
                  </span>
                  <h3 className="font-heading font-medium text-lg mt-4">
                    {v.title}
                  </h3>
                  <p className="text-secondary text-sm mt-2 leading-relaxed max-w-sm">
                    {v.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ PROCESS ═══════ */}
      <section className="py-24 lg:py-32 bg-foreground/[0.02]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.h2
              variants={fadeInUp}
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium mb-16 lg:mb-20"
            >
              From the first idea to the final experience.
            </motion.h2>

            {/* ── Desktop horizontal timeline ── */}
            <motion.div
              variants={fadeInUp}
              className="hidden lg:grid grid-cols-5 gap-0"
            >
              {steps.map((step, i) => (
                <div key={step.number} className="flex flex-col items-center text-center relative">
                  {i > 0 && (
                    <div className="absolute top-6 right-1/2 w-full h-px bg-border -translate-y-1/2 z-0" />
                  )}

                  <div className="relative z-10 w-12 h-12 rounded-full border-2 border-accent flex items-center justify-center bg-background text-sm font-heading font-medium">
                    {step.number}
                  </div>

                  <h3 className="font-heading font-medium text-base mt-4">
                    {step.title}
                  </h3>
                  <p className="text-secondary text-sm mt-2 max-w-[160px] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* ── Mobile vertical timeline ── */}
            <motion.div
              variants={staggerContainer}
              className="lg:hidden space-y-0"
            >
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  variants={fadeInUp}
                  className="flex gap-6"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border-2 border-accent flex items-center justify-center flex-shrink-0 bg-background text-sm font-heading font-medium">
                      {step.number}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-px flex-1 bg-border min-h-[40px]" />
                    )}
                  </div>

                  <div className="pb-10">
                    <h3 className="font-heading font-medium text-base">
                      {step.title}
                    </h3>
                    <p className="text-secondary text-sm mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ CLIENT FAQS ═══════ */}
      {faqs.length > 0 && (
        <section className="py-24 lg:py-32 border-t border-border">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <motion.p
                variants={fadeInUp}
                className="text-xs uppercase tracking-[0.2em] text-secondary font-medium mb-3"
              >
                Clarity & Expectations
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-heading text-3xl md:text-4xl font-medium mb-12 text-foreground"
              >
                Frequently Asked Questions
              </motion.h2>

              <div className="divide-y divide-border border-y border-border">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <motion.div key={index} variants={fadeInUp} className="py-6">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer focus-visible:outline-accent"
                        aria-expanded={isOpen}
                      >
                        <span className="font-heading font-medium text-lg text-foreground group-hover:text-accent transition-colors">
                          {faq.q}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`text-secondary shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-accent' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <p className="text-secondary text-sm leading-relaxed mt-4 pt-2">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
}
