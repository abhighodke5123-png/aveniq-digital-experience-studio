'use client';

import { useState, Suspense, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  MessageCircle,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  ChevronDown,
  ArrowRight,
  HelpCircle,
  Copy,
  Check,
} from 'lucide-react';
import { staggerContainer } from '@/lib/animations';
import { clientFaqs } from '@/data/catalog';
import { FaqJsonLd } from '@/components/JsonLd';

const SERVICE_OPTIONS = [
  'Hospital Website',
  'Clinic Website',
  'Business Website',
  'E-commerce Website',
  'Website Redesign',
  'SEO & Digital Growth',
  'AI & Automation',
  'Other',
];

const BUDGET_TIERS = [
  '$5,000 — $15,000',
  '$15,000 — $35,000',
  '$35,000 — $75,000',
  'Enterprise Custom',
];

const TIMELINE_OPTIONS = [
  'Immediate (< 4 Weeks)',
  'Standard (6 — 8 Weeks)',
  'Quarterly Roadmap (3+ Months)',
];

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

function ContactFormInner() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<FormStatus>('idle');
  const [emailError, setEmailError] = useState('');

  const initialService = (() => {
    const sParam = searchParams.get('service');
    if (!sParam) return 'Hospital Website';
    const match = SERVICE_OPTIONS.find((s) =>
      s.toLowerCase().includes(sParam.toLowerCase()) || sParam.toLowerCase().includes(s.toLowerCase())
    );
    return match || 'Hospital Website';
  })();

  const initialBudget = (() => {
    const bParam = searchParams.get('budget');
    if (!bParam) return '$15,000 — $35,000';
    const bMatch = BUDGET_TIERS.find((b) => bParam.includes(b.split('—')[0].trim()));
    return bMatch || '$15,000 — $35,000';
  })();

  const initialTimeline = (() => {
    const tParam = searchParams.get('timeline');
    if (!tParam) return 'Standard (6 — 8 Weeks)';
    const tMatch = TIMELINE_OPTIONS.find((t) => t.toLowerCase().includes(tParam.toLowerCase()));
    return tMatch || 'Standard (6 — 8 Weeks)';
  })();

  const initialDescription = (() => {
    const concept = searchParams.get('scopeConcept') || searchParams.get('projectRef');
    const modules = searchParams.get('selectedModules');
    if (concept) return `Inquiry regarding ${concept} architectural blueprint.`;
    if (modules) return `Selected modules: ${modules.split(',').join(', ')}.`;
    return '';
  })();

  const [selectedService, setSelectedService] = useState(initialService);
  const [selectedBudget, setSelectedBudget] = useState(initialBudget);
  const [selectedTimeline, setSelectedTimeline] = useState(initialTimeline);
  const [description, setDescription] = useState(initialDescription);
  const [submittedName, setSubmittedName] = useState('');
  const [enquiryId, setEnquiryId] = useState('');
  const [serverError, setServerError] = useState('');
  const [copiedId, setCopiedId] = useState(false);

  function validateEmail(email: string) {
    if (!email) return 'Email is required.';
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Please enter a valid business email address.';
  }

  function handleCopyReference() {
    if (!enquiryId) return;
    navigator.clipboard.writeText(enquiryId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get('_hp')) return;

    const email = (data.get('email') as string)?.trim();
    const name = (data.get('name') as string)?.trim();

    const err = validateEmail(email);
    if (err) {
      setEmailError(err);
      return;
    }

    if (!name) return;

    setServerError('');
    setStatus('loading');

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          business: (data.get('business') as string)?.trim(),
          phone: (data.get('phone') as string)?.trim(),
          service: selectedService,
          budget: selectedBudget,
          timeline: selectedTimeline,
          description: description || (data.get('description') as string)?.trim(),
          _hp: (data.get('_hp') as string) || '',
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Validation failed');
      }

      setSubmittedName(name);
      setEnquiryId(json.enquiryId || '');
      setStatus('success');
      form.reset();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Failed to transmit scope.');
      setStatus('error');
    }
  }

  return (
    <div className="border border-border bg-white p-6 sm:p-10 lg:p-12 shadow-xs">
      <div className="flex items-center justify-between pb-6 border-b border-border mb-8">
        <div>
          <h2 className="font-heading text-2xl font-medium text-foreground">
            Project Scoping Form
          </h2>
          <p className="text-xs text-secondary mt-1">
            Directly reviewed by senior strategy leads within 24 hours.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-secondary font-mono bg-background px-3 py-1.5 border border-border">
          <ShieldCheck size={14} className="text-accent" />
          <span>NDA Protected</span>
        </div>
      </div>

      {status === 'success' ? (
        <div className="border border-accent bg-accent/10 p-8 rounded-sm text-foreground">
          <div className="flex items-center justify-between mb-3">
            <CheckCircle2 className="text-accent" size={28} />
            {enquiryId && (
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs px-2.5 py-1 bg-white border border-accent/40 text-foreground rounded">
                  REF: {enquiryId}
                </span>
                <button
                  type="button"
                  onClick={handleCopyReference}
                  className="px-2 py-1 bg-white border border-border text-[11px] font-mono flex items-center gap-1 text-secondary hover:text-foreground cursor-pointer rounded"
                >
                  {copiedId ? <Check size={12} className="text-accent" /> : <Copy size={12} />}
                  <span>{copiedId ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            )}
          </div>
          <h3 className="font-heading text-xl font-medium">
            Scope Received, {submittedName}
          </h3>
          <p className="text-sm text-secondary mt-2 leading-relaxed">
            Thank you. Your project brief has been recorded directly into our Supabase studio database. Our Creative Director and Technical Architect will review your requirements and reply with initial thoughts within 24 hours.
          </p>
          <div className="mt-6 pt-4 border-t border-accent/20 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                setStatus('idle');
                setEnquiryId('');
                setServerError('');
                setDescription('');
              }}
              className="text-xs font-medium uppercase tracking-wider text-foreground hover:text-accent underline cursor-pointer"
            >
              Submit Another Project Scope
            </button>
            <Link
              href="/portal"
              className="text-xs font-mono px-3 py-1.5 bg-foreground text-background hover:bg-accent transition-colors"
            >
              Access Client Portal Workspace ↗
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          {serverError && (
            <div
              role="alert"
              className="p-4 border border-red-300 bg-red-50/80 text-red-800 text-xs rounded-sm flex items-start justify-between gap-4"
            >
              <div>
                <p className="font-semibold">Transmission Notice</p>
                <p className="mt-0.5 leading-relaxed">{serverError}</p>
              </div>
              <button
                type="button"
                onClick={() => setServerError('')}
                className="text-red-600 hover:text-red-900 font-mono text-[11px] underline uppercase shrink-0"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Anti-spam honeypot */}
          <input
            type="text"
            name="_hp"
            autoComplete="off"
            tabIndex={-1}
            className="absolute opacity-0 pointer-events-none h-0 w-0"
            aria-hidden="true"
          />

          {/* Service selector chips */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-secondary mb-3">
              1. Select Primary Service Focus
            </label>
            <div className="flex flex-wrap gap-2">
              {SERVICE_OPTIONS.map((srv) => {
                const active = selectedService === srv;
                return (
                  <button
                    type="button"
                    key={srv}
                    onClick={() => setSelectedService(srv)}
                    className={`px-3.5 py-2 text-xs rounded transition-all cursor-pointer ${
                      active
                        ? 'bg-foreground text-background font-medium'
                        : 'bg-background border border-border text-secondary hover:border-foreground/50'
                    }`}
                  >
                    {srv}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Budget Selector */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-secondary mb-3">
              2. Estimated Investment Bracket
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {BUDGET_TIERS.map((tier) => {
                const active = selectedBudget === tier;
                return (
                  <button
                    type="button"
                    key={tier}
                    onClick={() => setSelectedBudget(tier)}
                    className={`p-3 text-xs text-center border transition-all cursor-pointer ${
                      active
                        ? 'border-accent bg-accent/10 text-foreground font-semibold'
                        : 'border-border bg-background/50 text-secondary hover:border-foreground/40'
                    }`}
                  >
                    {tier}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timeline Selector */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-secondary mb-3">
              3. Target Delivery Horizon
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {TIMELINE_OPTIONS.map((horizon) => {
                const active = selectedTimeline === horizon;
                return (
                  <button
                    type="button"
                    key={horizon}
                    onClick={() => setSelectedTimeline(horizon)}
                    className={`p-3 text-xs text-center border transition-all cursor-pointer ${
                      active
                        ? 'border-accent bg-accent/10 text-foreground font-semibold'
                        : 'border-border bg-background/50 text-secondary hover:border-foreground/40'
                    }`}
                  >
                    {horizon}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contact Inputs */}
          <div className="space-y-6 pt-4 border-t border-border">
            <span className="block text-xs font-mono uppercase tracking-wider text-secondary">
              4. Organization & Contact Details
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-foreground mb-2">
                  Your Full Name <span className="text-accent">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Dr. Alok Verma / Jane Doe"
                  className="w-full border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-secondary/50 outline-none focus:border-accent"
                />
              </div>
              <div>
                <label htmlFor="business" className="block text-xs font-medium text-foreground mb-2">
                  Company / Hospital Name
                </label>
                <input
                  id="business"
                  name="business"
                  type="text"
                  placeholder="e.g. Meridian Heart Institute"
                  className="w-full border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-secondary/50 outline-none focus:border-accent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-foreground mb-2">
                  Business Email <span className="text-accent">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onBlur={(e) => setEmailError(validateEmail(e.target.value))}
                  onChange={() => emailError && setEmailError('')}
                  placeholder="you@company.com"
                  className={`w-full border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-secondary/50 outline-none ${
                    emailError ? 'border-red-400' : 'border-border focus:border-accent'
                  }`}
                />
                {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs font-medium text-foreground mb-2">
                  Phone / WhatsApp Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 9226638440"
                  className="w-full border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-secondary/50 outline-none focus:border-accent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-xs font-medium text-foreground mb-2">
                Project Overview & Key Objectives
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell us about your target audience, current bottlenecks, key integrations (e.g. WhatsApp, CRM, HIS), or preferred launch timeframe..."
                className="w-full border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-secondary/50 outline-none resize-y focus:border-accent"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full sm:w-auto px-10 py-4 bg-foreground text-background text-xs font-medium uppercase tracking-wider hover:bg-accent disabled:opacity-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Transmitting Scope...</span>
                </>
              ) : (
                <>
                  <span>Submit Project Enquiry</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
            <span className="text-xs text-secondary font-mono">
              Targeted response within 24 hours.
            </span>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <FaqJsonLd faqs={clientFaqs} />
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
              Inception & Project Scoping Studio
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-medium mt-4 leading-[1.08]">
              Your next digital chapter starts here.
            </h1>
            <p className="text-secondary text-lg sm:text-xl mt-6 leading-relaxed max-w-2xl">
              Have an ambitious vision, a hospital system redesign, or a new brand launch? Let&apos;s architect a clear digital roadmap together.
            </p>
          </motion.div>
        </section>

        {/* Contact Grid: Form + Quick Channels */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Scoping Form (8 Cols) */}
            <div className="lg:col-span-8">
              <Suspense
                fallback={
                  <div className="border border-border bg-white p-12 text-center text-xs font-mono text-secondary">
                    Loading studio scoping form...
                  </div>
                }
              >
                <ContactFormInner />
              </Suspense>
            </div>

            {/* Direct Connect Sidebar (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* WhatsApp direct card */}
              <div className="border border-border bg-white p-6 md:p-8">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#91A99B] mb-3">
                  <MessageCircle size={15} />
                  <span>Immediate Triage</span>
                </div>
                <h3 className="font-heading text-lg font-medium text-foreground">
                  WhatsApp Partner Line
                </h3>
                <p className="text-xs text-secondary mt-2 leading-relaxed">
                  Prefer direct instant messaging? Reach out directly on our studio WhatsApp channel for urgent timelines.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-border">
                  <a
                    href="https://wa.me/919226638440?text=Hello%20AVENIQ%20Studio%2C%20I%20would%20like%20to%20discuss%20a%20digital%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-foreground hover:text-accent transition-colors"
                  >
                    <span>Chat on WhatsApp</span>
                    <ArrowRight size={14} />
                  </a>
                  <a
                    href="tel:+919226638440"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-secondary hover:text-accent transition-colors"
                  >
                    <span>Call: +91 9226638440</span>
                  </a>
                </div>
              </div>

              {/* Direct Email Card */}
              <div className="border border-border bg-white p-6 md:p-8">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-secondary mb-3">
                  <Mail size={15} />
                  <span>Direct Inbox</span>
                </div>
                <h3 className="font-heading text-lg font-medium text-foreground">
                  Studio Correspondence
                </h3>
                <p className="text-xs text-secondary mt-2 leading-relaxed">
                  Have an RFP, detailed project specification, or vendor onboarding requirements? Send it directly to our leads.
                </p>
                <a
                  href="mailto:hello@aveniq.in?subject=Project%20Enquiry%20%7C%20AVENIQ"
                  className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-foreground hover:text-accent transition-colors"
                >
                  <span>hello@aveniq.in</span>
                  <ArrowRight size={14} />
                </a>
              </div>

              {/* Operational SLA Card */}
              <div className="border border-border bg-[#17191D] text-white p-6 md:p-8 space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#91A99B]">
                  Studio SLA Guarantees
                </span>
                <div className="space-y-3 text-xs text-[#ccc]">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-[#91A99B] shrink-0 mt-0.5" />
                    <span>Direct insertion into studio database</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-[#91A99B] shrink-0 mt-0.5" />
                    <span>Fixed milestone pricing with zero surprises</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-[#91A99B] shrink-0 mt-0.5" />
                    <span>Senior partner oversight throughout delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Client FAQ Section */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 mb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-secondary mb-2">
              <HelpCircle size={14} />
              <span>Common Inquiries</span>
            </div>
            <h2 className="font-heading text-3xl font-medium text-foreground">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="border-t border-border divide-y divide-border">
            {clientFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q} className="py-6">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left flex items-center justify-between gap-4 font-heading text-lg font-medium text-foreground hover:text-accent transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
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
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-secondary mt-3 leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
