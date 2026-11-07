'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Heart,
  Building2,
  Home,
  GraduationCap,
  Briefcase,
  Rocket,
  ArrowUpRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { staggerContainer, fadeInUp, viewportConfig } from '@/lib/animations';

interface Industry {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  tag?: string;
}

const industries: Industry[] = [
  {
    title: 'Healthcare',
    description: 'Hospitals, clinics, dental practices and diagnostic centres.',
    icon: Heart,
    href: '/healthcare',
    tag: 'Flagship Speciality',
  },
  {
    title: 'Hospitality',
    description: 'Hotels, resorts, restaurants and cafes.',
    icon: Building2,
    href: '/work',
  },
  {
    title: 'Real Estate',
    description: 'Builders, property developers and real estate agencies.',
    icon: Home,
    href: '/work',
  },
  {
    title: 'Education',
    description: 'Schools, colleges and educational institutions.',
    icon: GraduationCap,
    href: '/contact',
  },
  {
    title: 'Professional Services',
    description: 'Consultants, law firms and financial professionals.',
    icon: Briefcase,
    href: '/contact',
  },
  {
    title: 'Startups & Retail',
    description: 'Technology startups, e-commerce and growing businesses.',
    icon: Rocket,
    href: '/work',
  },
];

export default function Industries() {
  return (
    <section id="industries" className="py-24 lg:py-32">
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
            Industries We Work With
          </motion.p>

          <motion.h2
            variants={fadeInUp}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium mt-4 leading-tight"
          >
            Different industries. One digital standard.
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <Link
                  key={industry.title}
                  href={industry.href}
                  className="group relative border border-border bg-transparent p-8 transition-all duration-300 hover:bg-foreground/[0.02] hover:border-accent block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <motion.div variants={fadeInUp}>
                    <div className="flex items-center justify-between">
                      <Icon className="text-accent transition-transform duration-300 group-hover:scale-110" size={24} aria-hidden />
                      {industry.tag ? (
                        <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-accent/15 text-foreground rounded">
                          {industry.tag}
                        </span>
                      ) : (
                        <ArrowUpRight
                          size={18}
                          className="text-secondary/40 transition-all duration-300 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      )}
                    </div>

                    <h3 className="font-heading text-lg font-medium mt-6 group-hover:text-foreground transition-colors">
                      {industry.title}
                    </h3>
                    <p className="text-secondary text-sm mt-2 leading-relaxed">
                      {industry.description}
                    </p>

                    <div className="mt-6 flex items-center gap-1 text-xs font-medium text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span>Learn more</span>
                      <span>→</span>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}