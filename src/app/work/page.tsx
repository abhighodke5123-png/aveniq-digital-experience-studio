'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  ArrowUpRight,
  Filter,
  Layers,
  X,
} from 'lucide-react';
import { staggerContainer } from '@/lib/animations';
import { portfolioProjects } from '@/data/catalog';
import type { DetailedProject } from '@/types';

type CategoryFilter = 'All' | 'Healthcare' | 'Hospitality' | 'Real Estate' | 'Technology';

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [inspectingProject, setInspectingProject] = useState<DetailedProject | null>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setInspectingProject(null);
      }
    }
    if (inspectingProject) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [inspectingProject]);

  const filteredProjects = selectedCategory === 'All'
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.industry === selectedCategory);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background text-foreground pt-32 pb-24 lg:pt-40 lg:pb-32 font-body">
        {/* Header Hero */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-16 lg:mb-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-secondary font-medium font-mono">
              Selected Work Archive
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium mt-4 leading-tight">
              Digital experiences, thoughtfully created.
            </h1>
            <p className="text-secondary text-lg mt-6 leading-relaxed max-w-2xl">
              A curated collection of concept projects and architectural blueprints illustrating our design philosophy, clinical UX standards, and technical precision.
            </p>
          </motion.div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-10 border-b border-border pb-6 mt-8">
            <span className="text-xs font-mono uppercase tracking-widest text-secondary flex items-center gap-1.5 mr-2">
              <Filter size={13} />
              <span>Filter Sector:</span>
            </span>
            {(['All', 'Healthcare', 'Hospitality', 'Real Estate', 'Technology'] as CategoryFilter[]).map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
                    active
                      ? 'bg-foreground text-background font-semibold shadow-xs'
                      : 'border border-border text-secondary hover:border-foreground hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* Project Grid */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group border border-border bg-white p-6 md:p-8 flex flex-col justify-between hover:border-accent hover:shadow-sm transition-all"
              >
                <div>
                  {/* Top Meta */}
                  <div className="flex items-center justify-between text-xs text-secondary mb-4 pb-3 border-b border-border">
                    <span className="font-mono uppercase tracking-wider text-accent font-semibold">
                      {project.industry}
                    </span>
                    <span className="font-mono">{project.year} Concept Blueprint</span>
                  </div>

                  {/* Title & Summary */}
                  <h2 className="font-heading text-2xl font-medium text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-xs font-mono text-secondary/80 mt-1 uppercase tracking-wide">
                    Client: {project.client}
                  </p>
                  <p className="text-sm text-secondary mt-3 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Architecture Blueprint Mockup */}
                  <div className="my-6 p-4 bg-[#17191D] text-white text-xs font-mono rounded-sm border border-white/10 space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px] text-white/50">
                      <span>Concept Architecture Preview</span>
                      <span className="text-[#91A99B]">100% Responsive</span>
                    </div>
                    <p className="text-white text-xs font-heading font-medium leading-tight">
                      &quot;{project.layoutBlueprint.heroHeading}&quot;
                    </p>
                    <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] text-[#ccc]">
                      <div className="bg-white/5 p-2 rounded">
                        <span className="block text-[#91A99B]">✓ {project.layoutBlueprint.keyFeature1}</span>
                      </div>
                      <div className="bg-white/5 p-2 rounded">
                        <span className="block text-[#91A99B]">✓ {project.layoutBlueprint.keyFeature2}</span>
                      </div>
                    </div>
                  </div>

                  {/* Impact metrics chips */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-secondary block">
                      Targeted Impact
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.impactMetrics.map((metric) => (
                        <span
                          key={metric}
                          className="text-[11px] px-2.5 py-1 bg-background border border-border text-foreground font-medium rounded"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
                  <button
                    onClick={() => setInspectingProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-foreground hover:text-accent transition-colors cursor-pointer"
                  >
                    <span>Inspect Blueprint</span>
                    <ArrowUpRight size={14} />
                  </button>

                  <Link
                    href={`/contact?projectRef=${encodeURIComponent(project.title)}`}
                    className="text-xs font-medium text-secondary hover:text-foreground underline transition-colors"
                  >
                    Request Similar Build →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center border-t border-border pt-8">
            <p className="text-xs text-secondary italic">
              IMPORTANT: These projects represent AVENIQ concept studies and architectural prototypes engineered to demonstrate sector-specific creative direction.
            </p>
          </div>
        </section>

        {/* Blueprint Inspection Drawer Modal */}
        <AnimatePresence>
          {inspectingProject && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setInspectingProject(null)}
                className="fixed inset-0 bg-foreground/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 sm:p-6"
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="blueprint-modal-title"
                  initial={{ scale: 0.95, opacity: 0, y: 16 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 16 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border p-6 sm:p-10 shadow-2xl relative"
                >
                  <button
                    onClick={() => setInspectingProject(null)}
                    className="absolute top-6 right-6 p-2 text-secondary hover:text-foreground cursor-pointer"
                    aria-label="Close blueprint modal"
                  >
                    <X size={20} />
                  </button>

                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent mb-2">
                    <Layers size={14} />
                    <span>{inspectingProject.industry} Architecture Blueprint</span>
                  </div>

                  <h3 id="blueprint-modal-title" className="font-heading text-2xl font-medium text-foreground">
                    {inspectingProject.title}
                  </h3>
                  <p className="text-xs text-secondary mt-1">Client Prototype: {inspectingProject.client}</p>

                  <div className="my-6 space-y-4 text-xs">
                    <div className="p-4 bg-background border border-border">
                      <span className="font-mono uppercase text-[10px] text-secondary font-bold block mb-1">
                        The Core Challenge
                      </span>
                      <p className="text-secondary leading-relaxed">{inspectingProject.challenge}</p>
                    </div>

                    <div className="p-4 bg-background border border-border">
                      <span className="font-mono uppercase text-[10px] text-accent font-bold block mb-1">
                        The Architectural Solution
                      </span>
                      <p className="text-foreground leading-relaxed">{inspectingProject.solution}</p>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-secondary block mb-2">
                      Deconstructed Tech Stack
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {inspectingProject.techStack.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 text-xs font-mono bg-background border border-border rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                    <Link
                      href={`/contact?scopeConcept=${encodeURIComponent(inspectingProject.title)}`}
                      className="px-6 py-3 bg-foreground text-background text-xs font-medium uppercase tracking-wider hover:bg-accent transition-colors"
                    >
                      Commission Blueprint Implementation ↗
                    </Link>
                    <button
                      onClick={() => setInspectingProject(null)}
                      className="px-5 py-3 border border-border text-xs font-medium uppercase tracking-wider text-secondary hover:text-foreground"
                    >
                      Close Blueprint
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* CTA Banner */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 text-center pt-12">
          <h3 className="font-heading text-3xl font-medium mb-4">
            Have a project in mind for your industry?
          </h3>
          <p className="text-secondary text-base mb-8 max-w-lg mx-auto">
            From hospital web systems to luxury hospitality and tech platforms, we build to lead.
          </p>
          <Link
            href="/contact"
            className="px-8 py-4 bg-foreground text-background text-sm font-medium hover:bg-accent transition-colors inline-block"
          >
            Start Your Project Blueprint ↗
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
