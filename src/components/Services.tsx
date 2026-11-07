'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Globe, Palette, TrendingUp, Bot, Server, ArrowUpRight } from 'lucide-react';
import { staggerContainer, fadeInUp, viewportConfig } from '@/lib/animations';
import type { LucideIcon } from 'lucide-react';

interface Service {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const services: Service[] = [
  {
    number: '01',
    title: 'Digital Experiences',
    description:
      'Custom websites, landing pages, e-commerce, booking platforms and web applications.',
    icon: Globe,
  },
  {
    number: '02',
    title: 'Brand & Creative',
    description:
      'Brand identity, visual design, UI/UX and digital brand experiences.',
    icon: Palette,
  },
  {
    number: '03',
    title: 'Search & Growth',
    description:
      'SEO, local SEO, conversion optimisation, analytics and content strategy.',
    icon: TrendingUp,
  },
  {
    number: '04',
    title: 'AI & Automation',
    description:
      'AI-powered chat interfaces, lead management, appointment workflows and business automation.',
    icon: Bot,
  },
  {
    number: '05',
    title: 'Digital Infrastructure',
    description:
      'Hosting, website maintenance, security, performance and integrations.',
    icon: Server,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {/* Header */}
          <motion.p
            variants={fadeInUp}
            className="text-xs tracking-[0.2em] uppercase text-secondary mb-4"
          >
            What We Do
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium max-w-2xl mb-16 lg:mb-20"
          >
            Everything your business needs to grow digitally.
          </motion.h2>

          {/* Services Grid */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0"
          >
            {services.map((service) => (
              <ServiceCard key={service.number} service={service} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <Link
      href={`/services#service-${service.number}`}
      className="group block border-t border-border pt-8 pb-12 transition-colors duration-300 hover:border-accent focus-visible:outline-accent"
    >
      <motion.div
        variants={fadeInUp}
        whileHover={{ y: -4 }}
      >
        <div className="flex items-start justify-between mb-6">
          <span className="text-6xl font-heading font-light text-border leading-none transition-colors group-hover:text-accent">
            {service.number}
          </span>
          <div className="flex items-center gap-1">
            <Icon
              className="w-5 h-5 text-secondary transition-colors duration-300 group-hover:text-accent"
              strokeWidth={1.5}
            />
            <ArrowUpRight
              size={14}
              className="text-secondary opacity-0 -translate-x-1 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-accent"
            />
          </div>
        </div>
        <h3 className="text-xl font-heading font-medium mb-3 group-hover:text-foreground transition-colors">
          {service.title}
        </h3>
        <p className="text-secondary font-body leading-relaxed text-sm">
          {service.description}
        </p>
      </motion.div>
    </Link>
  );
}