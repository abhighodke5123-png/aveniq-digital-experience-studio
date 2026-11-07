'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, Loader2, ArrowRight, Layers, CheckCircle2, Cpu } from 'lucide-react';
import type { ScopingAnalysis } from '@/lib/gemini';

export default function AiStudioScoper() {
  const [brief, setBrief] = useState('');
  const [selectedService, setSelectedService] = useState('Hospital Website & Clinical Triage');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ScopingAnalysis | null>(null);
  const [error, setError] = useState('');

  async function handleAnalyze() {
    if (!brief.trim() || brief.trim().length < 8) {
      setError('Please provide at least a sentence explaining your vision or project goals.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-scoper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: selectedService,
          description: brief.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to analyze brief');
      }

      setAnalysis(data.analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not generate architectural scope.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border border-border bg-white p-6 sm:p-10 shadow-xs relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-accent mb-1.5">
            <Cpu size={14} />
            <span>Gemini Studio Intelligence</span>
          </div>
          <h3 className="font-heading text-2xl font-medium text-foreground">
            Instant AI Architecture & Sprint Scoper
          </h3>
          <p className="text-xs text-secondary mt-1">
            Analyze your project vision with our Gemini AI engine to receive a bespoke technical architecture and sprint estimate.
          </p>
        </div>
        <span className="self-start sm:self-auto text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 bg-accent/15 text-accent rounded-full border border-accent/20">
          Gemini 2.5 Active
        </span>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-secondary mb-2">
            Select Focus Domain
          </label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-accent"
          >
            <option value="Hospital Website & Clinical Triage">Hospital Website & Clinical Triage</option>
            <option value="Modern Dental & Aesthetic Clinic">Modern Dental & Aesthetic Clinic</option>
            <option value="Luxury Hospitality & Villa Booking">Luxury Hospitality & Villa Booking</option>
            <option value="Real Estate Architectural Showcase">Real Estate Architectural Showcase</option>
            <option value="High-Performance SaaS & Tech Platform">High-Performance SaaS & Tech Platform</option>
            <option value="Custom E-Commerce & Brand Experience">Custom E-Commerce & Brand Experience</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-secondary mb-2">
            Describe Your Project Objectives or Current Bottlenecks
          </label>
          <textarea
            rows={3}
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            placeholder="e.g. We are a 250-bed hospital network looking to rebuild our patient portal with doctor search, WhatsApp OPD appointment booking, and sub-second mobile page loads..."
            className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-secondary/50 outline-none resize-y focus:border-accent"
          />
        </div>

        {error && (
          <p className="text-xs text-red-600 bg-red-50 p-3 border border-red-200">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleAnalyze}
          disabled={loading}
          className="px-8 py-3.5 bg-foreground text-background text-xs font-medium uppercase tracking-wider hover:bg-accent disabled:opacity-50 transition-colors flex items-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              <span>Synthesizing Technical Blueprint...</span>
            </>
          ) : (
            <>
              <Sparkles size={15} className="text-accent" />
              <span>Generate AI Architectural Blueprint</span>
            </>
          )}
        </button>

        <AnimatePresence>
          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="mt-8 pt-8 border-t border-border bg-background/50 p-6 sm:p-8 border rounded-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-accent font-semibold flex items-center gap-1.5">
                  <CheckCircle2 size={14} />
                  <span>Verified Blueprint Generated</span>
                </span>
                <span className="text-xs font-mono px-2.5 py-1 bg-white border border-border rounded">
                  {analysis.complexityTier} · {analysis.estimatedTimelineWeeks} Weeks Sprint
                </span>
              </div>

              <h4 className="font-heading text-xl font-medium text-foreground mb-3">
                {analysis.projectTitle}
              </h4>

              <p className="text-sm text-secondary leading-relaxed mb-6">
                {analysis.strategicInsights}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div>
                  <span className="text-xs font-mono uppercase text-secondary font-bold block mb-2">
                    Recommended Technical Architecture
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.recommendedArchitecture.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-mono bg-white border border-border rounded text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono uppercase text-secondary font-bold block mb-2">
                    Core Engineering Deliverables
                  </span>
                  <ul className="space-y-1.5">
                    {analysis.keyDeliverables.map((deliv) => (
                      <li key={deliv} className="text-xs text-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-secondary block">
                    Estimated Studio Investment Bracket
                  </span>
                  <span className="text-base font-medium font-heading text-foreground">
                    {analysis.estimatedBudgetBracket}
                  </span>
                </div>

                <Link
                  href={`/contact?scopeConcept=${encodeURIComponent(analysis.projectTitle)}`}
                  className="px-6 py-3 bg-foreground text-background text-xs font-medium uppercase tracking-wider hover:bg-accent transition-colors inline-flex items-center gap-2"
                >
                  <span>Commission This Scope</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}