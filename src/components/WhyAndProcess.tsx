'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp, viewportConfig } from '@/lib/animations';

const values = [
  {
    number: '01',
    title: 'Strategy First',
    description: 'Every project starts with understanding your business and objectives.',
  },
  {
    number: '02',
    title: 'Design That Matters',
    description: 'Create intuitive and visually distinctive experiences.',
  },
  {
    number: '03',
    title: 'Technology That Scales',
    description: 'Build responsive, secure and maintainable digital solutions.',
  },
  {
    number: '04',
    title: 'Built for Growth',
    description: 'Develop digital foundations that support visibility, engagement and enquiries.',
  },
];

const steps = [
  { number: '01', title: 'Discover', description: 'Understand your business, audience and goals.' },
  { number: '02', title: 'Strategise', description: 'Define the structure, user journey and direction.' },
  { number: '03', title: 'Design', description: 'Create a distinctive visual experience.' },
  { number: '04', title: 'Develop', description: 'Build, integrate and optimise.' },
  { number: '05', title: 'Launch & Grow', description: 'Deploy and continuously improve.' },
];

export default function WhyAndProcess() {
  return (
    <>
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
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-foreground max-w-2xl leading-tight"
            >
              Thoughtful design. Intelligent technology. Meaningful growth.
            </motion.h2>

            <motion.div
              variants={staggerContainer}
              className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {values.map((v) => (
                <motion.div
                  key={v.number}
                  variants={fadeInUp}
                  className="border-t border-border pt-6"
                >
                  <span className="text-xs font-mono uppercase text-accent font-semibold">
                    {v.number}
                  </span>
                  <h3 className="font-heading text-lg font-medium mt-3 text-foreground">
                    {v.title}
                  </h3>
                  <p className="text-secondary text-sm mt-2 leading-relaxed">
                    {v.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-foreground/[0.02] border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs uppercase tracking-[0.2em] text-secondary font-medium"
            >
              Our Process
            </motion.p>

            <motion.h2
              variants={fadeInUp}
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium mt-4 leading-tight"
            >
              From the first idea to the final experience.
            </motion.h2>

            <motion.div
              variants={staggerContainer}
              className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
            >
              {steps.map((step) => (
                <motion.div
                  key={step.number}
                  variants={fadeInUp}
                  className="border-t-2 border-border pt-6 transition-colors hover:border-accent"
                >
                  <span className="text-xs font-mono uppercase text-accent font-bold">
                    {step.number}
                  </span>
                  <h3 className="font-heading text-lg font-medium mt-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-secondary text-sm mt-2 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}