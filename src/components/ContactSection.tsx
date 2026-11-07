'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations';
import { Loader2, CheckCircle2, ShieldCheck } from 'lucide-react';

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

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactSection() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [emailError, setEmailError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    service: string;
    enquiryId?: string;
  } | null>(null);

  function validateEmail(email: string) {
    if (!email) return 'Email is required.';
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Please enter a valid email address.';
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get('_hp')) return;

    const email = (data.get('email') as string)?.trim();
    const name = (data.get('name') as string)?.trim();
    const service = (data.get('service') as string) || 'General Enquiry';

    const err = validateEmail(email);
    if (err) {
      setEmailError(err);
      return;
    }

    if (!name) return;

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
          country: (data.get('country') as string)?.trim(),
          service,
          description: (data.get('description') as string)?.trim(),
          _hp: (data.get('_hp') as string) || '',
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Validation failed');
      }

      setSubmittedData({ name, email, service, enquiryId: json.enquiryId });
      setStatus('success');
      form.reset();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  return (
    <>
      <section className="bg-[#17191D] py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.h2
              variants={fadeInUp}
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight"
            >
              Your next digital chapter starts here.
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-[#999] text-lg mt-6 max-w-2xl mx-auto"
            >
              Have a business, idea or project in mind? Let&apos;s create
              something meaningful together.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-4 mt-10"
            >
              <Link
                href="/contact"
                className="inline-flex items-center bg-white text-[#17191D] px-8 py-4 text-sm font-medium transition-colors duration-300 hover:bg-[#91A99B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Start a Project ↗
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center border border-[#333] text-white px-8 py-4 text-sm font-medium transition-colors duration-300 hover:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Quick Enquiry Form ↓
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-24 lg:py-32 scroll-mt-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
              <motion.p
                variants={fadeInUp}
                className="text-xs uppercase tracking-[0.2em] text-secondary font-medium"
              >
                Start a Conversation
              </motion.p>
              <span className="inline-flex items-center gap-1.5 text-xs text-secondary bg-[#17191D]/5 px-2.5 py-1 rounded">
                <ShieldCheck size={13} className="text-accent" />
                Spam-protected & Secure
              </span>
            </div>

            <motion.h2
              variants={fadeInUp}
              className="font-heading text-3xl md:text-4xl font-medium leading-tight"
            >
              Start a project
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-secondary mt-3 mb-10 text-base"
            >
              Fill in the details below. We typically review project scopes and respond within 24 hours.
            </motion.p>

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-accent bg-accent/10 p-6 md:p-8 rounded-sm mb-8"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-accent flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h3 className="font-heading font-medium text-foreground text-lg">
                      Enquiry Details Validated
                    </h3>
                    <p className="text-secondary text-sm mt-1 leading-relaxed">
                      Thank you, <strong className="text-foreground">{submittedData?.name}</strong>. Your scope for{' '}
                      <span className="text-foreground font-medium">{submittedData?.service}</span> has been structured and validated.
                    </p>
                    {submittedData?.enquiryId && (
                      <p className="text-xs font-mono text-accent mt-2">
                        Tracking Reference: {submittedData.enquiryId}
                      </p>
                    )}
                    <p className="text-xs text-secondary/80 mt-3 pt-3 border-t border-accent/20">
                      Logged via studio API. Ready for direct Supabase / Resend webhook distribution.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="mt-4 text-xs font-medium uppercase tracking-wider text-foreground hover:text-accent transition-colors underline cursor-pointer"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-red-300 bg-red-50 p-6 rounded-sm mb-8"
              >
                <p className="text-red-800 font-medium text-sm">Submission error</p>
                <p className="text-red-700 text-xs mt-1">
                  {errorMessage || 'Please try again or reach out directly at hello@aveniq.in.'}
                </p>
              </motion.div>
            )}

            {status !== 'success' && (
              <motion.form
                variants={fadeInUp}
                onSubmit={handleSubmit}
                className="space-y-6"
                noValidate
              >
                <input
                  type="text"
                  name="_hp"
                  autoComplete="off"
                  tabIndex={-1}
                  className="absolute opacity-0 pointer-events-none h-0 w-0"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
                      Full Name <span className="text-accent">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full border border-border bg-transparent px-4 py-3.5 text-sm text-foreground placeholder:text-secondary/50 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                      placeholder="e.g. Dr. Alok Verma / Sarah Jenkins"
                    />
                  </div>
                  <div>
                    <label htmlFor="business" className="block text-sm font-medium mb-2 text-foreground">
                      Business Name
                    </label>
                    <input
                      id="business"
                      name="business"
                      type="text"
                      className="w-full border border-border bg-transparent px-4 py-3.5 text-sm text-foreground placeholder:text-secondary/50 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                      placeholder="e.g. Apex Hospital / Aura Boutique Hotel"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                      Email <span className="text-accent">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      onBlur={(e) => setEmailError(validateEmail(e.target.value))}
                      onChange={() => emailError && setEmailError('')}
                      className={`w-full border bg-transparent px-4 py-3.5 text-sm text-foreground placeholder:text-secondary/50 outline-none transition-colors focus:ring-1 ${
                        emailError
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
                          : 'border-border focus:border-accent focus:ring-accent'
                      }`}
                      placeholder="you@company.com"
                    />
                    {emailError && (
                      <p className="text-red-500 text-xs mt-1.5">{emailError}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2 text-foreground">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="w-full border border-border bg-transparent px-4 py-3.5 text-sm text-foreground placeholder:text-secondary/50 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                      placeholder="+91 98765 43210 / +1 (555) 019-2834"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium mb-2 text-foreground">
                      Country
                    </label>
                    <input
                      id="country"
                      name="country"
                      type="text"
                      className="w-full border border-border bg-transparent px-4 py-3.5 text-sm text-foreground placeholder:text-secondary/50 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                      placeholder="India, USA, UK, Australia, Canada, etc."
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium mb-2 text-foreground">
                      Interested Service
                    </label>
                    <div className="relative">
                      <select
                        id="service"
                        name="service"
                        defaultValue=""
                        className="w-full border border-border bg-transparent px-4 py-3.5 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="text-secondary">
                          Select your primary requirement
                        </option>
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-background text-foreground">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-secondary">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-2 text-foreground">
                    Project Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="w-full border border-border bg-transparent px-4 py-3.5 text-sm text-foreground placeholder:text-secondary/50 outline-none transition-colors resize-y focus:border-accent focus:ring-1 focus:ring-accent"
                    placeholder="Tell us about your organization, goals, key functionality, or timeline expectations..."
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="inline-flex items-center justify-center bg-foreground text-background px-9 py-4 text-sm font-medium transition-colors duration-300 hover:bg-accent disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground min-h-[52px] cursor-pointer"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Validating Enquiry...
                      </>
                    ) : (
                      'Send Project Enquiry'
                    )}
                  </button>

                  <p className="text-xs text-secondary">
                    NDA protected. Direct partner response.
                  </p>
                </div>
              </motion.form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}