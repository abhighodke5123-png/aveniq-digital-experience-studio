'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { MedicalSpecialisationJsonLd } from '@/components/JsonLd';
import {
  Heart,
  Calendar,
  Users,
  ShieldCheck,
  Smartphone,
  MapPin,
  MessageCircle,
  FileText,
  Activity,
  ArrowRight,
  CheckCircle2,
  Stethoscope,
} from 'lucide-react';
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations';
import { clinicalDepartments } from '@/data/catalog';
import type { ClinicalDepartment } from '@/types';

export default function HealthcarePage() {
  const [selectedDept, setSelectedDept] = useState<ClinicalDepartment>(clinicalDepartments[0]);
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [bookingReference, setBookingReference] = useState<string>('');
  const [patientForm, setPatientForm] = useState({ name: '', phone: '', date: '' });

  return (
    <>
      <MedicalSpecialisationJsonLd />
      <Navigation />
      <main className="min-h-screen bg-[#17191D] text-white pt-32 pb-24 lg:pt-40 lg:pb-32 font-body selection:bg-[#91A99B] selection:text-[#17191D]">
        {/* Header Hero */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-20 lg:mb-28">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#91A99B] animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#91A99B] font-medium">
                Primary Studio Specialisation
              </span>
            </div>

            <motion.h1
              variants={fadeInUp}
              className="font-heading text-4xl sm:text-5xl lg:text-7xl font-medium leading-[1.08] text-white"
            >
              Healthcare deserves a better digital experience.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-[#999] text-lg sm:text-xl mt-6 leading-relaxed max-w-2xl"
            >
              We partner with hospitals, multispeciality networks, and dental clinics to build patient-centred digital infrastructure that builds immediate trust, simplifies appointment booking, and elevates clinical reputation.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact?service=Hospital+Website"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#17191D] text-sm font-medium hover:bg-[#91A99B] transition-colors"
              >
                <span>Initiate Healthcare Consultation</span>
                <ArrowRight size={16} />
              </Link>
              <a
                href="#interactive-demo"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white text-sm font-medium hover:border-white transition-colors"
              >
                <span>Experience Patient Workflow Demo ↓</span>
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* 8 Essential Healthcare Pillars */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-28">
          <div className="pb-8 border-b border-white/10 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#777873] font-mono">
                The AVENIQ Clinical Digital Standard
              </p>
              <h2 className="font-heading text-2xl sm:text-4xl font-medium text-white mt-2">
                Engineered for patient trust and operational ease
              </h2>
            </div>
            <span className="text-xs text-[#777873] font-mono">
              8 Pillars of Patient UX
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Stethoscope,
                title: 'Doctor & Specialist Profiles',
                desc: 'Comprehensive clinical credentials, special interest tags, OPD timing schedules, and verified patient reviews.',
              },
              {
                icon: Calendar,
                title: 'Zero-Friction OPD Booking',
                desc: 'Streamlined appointment scheduling with real-time slot selection and instant SMS/WhatsApp calendar confirmation.',
              },
              {
                icon: MessageCircle,
                title: 'WhatsApp Triage System',
                desc: 'Direct hospital concierge integration for bed availability, ambulance dispatch, and quick second-opinion uploads.',
              },
              {
                icon: MapPin,
                title: 'Local SEO & Maps Dominance',
                desc: 'Hyper-local optimization ensuring your clinic ranks top 3 on Google for high-intent emergency and OPD searches.',
              },
              {
                icon: FileText,
                title: 'Diagnostic Report Portals',
                desc: 'Secure, passwordless mobile patient report retrieval saving administrative hospital desk hours.',
              },
              {
                icon: Users,
                title: 'Department Taxonomy',
                desc: 'Intuitive navigation structures so worried patients locate super-specialists in under 5 seconds.',
              },
              {
                icon: ShieldCheck,
                title: 'Regulatory & Data Guardrails',
                desc: 'Adherence to clinical privacy standards, encryption at rest, and medical ethics disclaimers.',
              },
              {
                icon: Smartphone,
                title: 'Mobile-First Speed (<1s)',
                desc: '90%+ of patients search during urgent distress on mobile. We deliver 99/100 Core Web Vitals on cellular networks.',
              },
            ].map((pillar) => {
              const PIcon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="border border-white/10 bg-white/[0.02] p-6 hover:border-[#91A99B] transition-colors group"
                >
                  <PIcon size={22} className="text-[#91A99B] transition-transform group-hover:scale-110 mb-4" />
                  <h3 className="font-heading text-base font-medium text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#999] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Interactive Hospital Patient Journey Demo */}
        <section id="interactive-demo" className="max-w-7xl mx-auto px-6 lg:px-8 mb-28 scroll-mt-24">
          <div className="border border-white/10 bg-[#1F2228] p-6 sm:p-10 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#91A99B]">
                  Interactive Component Demo
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-medium text-white mt-1">
                  Experience a high-converting patient booking flow
                </h3>
              </div>
              <p className="text-xs text-[#999] max-w-md">
                Click across departments to see how intuitive specialist discovery and instant triage reduce administrative hospital overhead.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
              {/* Department selector */}
              <div className="lg:col-span-5 space-y-3">
                <p className="text-xs font-mono uppercase text-[#777873] tracking-wider mb-2">
                  Select Department
                </p>
                {clinicalDepartments.map((dept) => {
                  const isSelected = selectedDept.name === dept.name;
                  return (
                    <button
                      key={dept.name}
                      onClick={() => {
                        setSelectedDept(dept);
                        setBookingStep(1);
                      }}
                      className={`w-full text-left p-4 border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#91A99B] bg-[#91A99B]/10 text-white'
                          : 'border-white/10 bg-white/[0.02] text-[#999] hover:border-white/30'
                      }`}
                    >
                      <div>
                        <span className="text-sm font-medium block text-white">{dept.name}</span>
                        <span className="text-xs text-[#777873]">{dept.doctorCount} Active Specialists</span>
                      </div>
                      <span className="text-xs font-mono text-[#91A99B] px-2 py-0.5 bg-white/5 rounded">
                        {dept.avgWait}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Specialist Card & Interactive Appointment Modal */}
              <div className="lg:col-span-7 bg-[#17191D] border border-white/10 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#91A99B]">
                        Department Lead
                      </span>
                      <h4 className="font-heading text-xl font-medium text-white mt-1">
                        {selectedDept.leadSpecialist}
                      </h4>
                      <p className="text-xs text-[#999] mt-0.5">{selectedDept.speciality}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60">
                      <Stethoscope size={20} className="text-[#91A99B]" />
                    </div>
                  </div>

                  {bookingStep === 1 ? (
                    <div className="py-6 space-y-4">
                      <p className="text-xs text-[#999]">Available Consultation Modes for Today:</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 border border-white/10 bg-white/5 rounded text-xs">
                          <span className="block font-medium text-white">In-Clinic OPD</span>
                          <span className="text-[11px] text-[#91A99B]">4 slots remaining</span>
                        </div>
                        <div className="p-3 border border-white/10 bg-white/5 rounded text-xs">
                          <span className="block font-medium text-white">Tele-Consultation</span>
                          <span className="text-[11px] text-[#91A99B]">Video link sent via SMS</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setBookingStep(2)}
                        className="w-full mt-4 py-3 bg-[#91A99B] text-[#17191D] font-medium text-xs uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
                      >
                        Request Slot with {selectedDept.leadSpecialist.split(',')[0]} ↗
                      </button>
                    </div>
                  ) : bookingStep === 2 ? (
                    <div className="py-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-[#91A99B]">Step 2 of 2 — Quick Patient Verification</span>
                        <button
                          onClick={() => setBookingStep(1)}
                          className="text-[11px] text-[#777873] hover:text-white cursor-pointer"
                        >
                          ← Back
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Patient Full Name"
                        value={patientForm.name}
                        onChange={(e) => setPatientForm({ ...patientForm, name: e.target.value })}
                        className="w-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-white placeholder:text-white/30 outline-none focus:border-[#91A99B]"
                      />
                      <input
                        type="tel"
                        placeholder="WhatsApp / Phone Number"
                        value={patientForm.phone}
                        onChange={(e) => setPatientForm({ ...patientForm, phone: e.target.value })}
                        className="w-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-white placeholder:text-white/30 outline-none focus:border-[#91A99B]"
                      />
                      <button
                        onClick={() => {
                          const refCode = `AVQ-MED-${Math.floor(1000 + Math.random() * 9000)}`;
                          setBookingReference(refCode);
                          setBookingStep(3);
                        }}
                        className="w-full py-3 bg-white text-[#17191D] font-medium text-xs uppercase tracking-wider hover:bg-[#91A99B] transition-colors cursor-pointer"
                      >
                        Confirm Demonstration Slot ✓
                      </button>
                    </div>
                  ) : (
                    <div className="py-6 space-y-4">
                      <div className="p-4 border border-[#91A99B]/40 bg-[#91A99B]/10 rounded-xs">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#91A99B] mb-2">
                          <CheckCircle2 size={16} />
                          <span>Demonstration Slot Reserved</span>
                        </div>
                        <h5 className="font-heading text-base font-medium text-white">
                          {patientForm.name || 'Demo Patient'} · {selectedDept.name}
                        </h5>
                        <p className="text-xs text-[#999] mt-1">
                          Lead Consultant: {selectedDept.leadSpecialist}
                        </p>
                        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                          <span className="text-[#777873]">Reference Token</span>
                          <span className="text-white font-semibold">{bookingReference || 'AVQ-MED-7482'}</span>
                        </div>
                      </div>

                      <p className="text-xs text-[#999] leading-relaxed">
                        In live hospital deployments, this action issues an automated WhatsApp appointment confirmation to {patientForm.phone || 'the patient'} and writes directly into your Hospital Information System (HIS) or EHR.
                      </p>

                      <button
                        onClick={() => {
                          setBookingStep(1);
                          setPatientForm({ name: '', phone: '', date: '' });
                        }}
                        className="w-full py-2.5 border border-white/20 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        Test Another Department Slot ↺
                      </button>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-[#777873]">
                  <span>Hospital Management System Sync Ready</span>
                  <span className="text-[#91A99B]">Direct WhatsApp Integration</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clinical Case Highlight */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border border-white/10 p-8 sm:p-12 bg-white/[0.02]">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#91A99B]">
                Hospital Case Blueprint
              </span>
              <h3 className="font-heading text-3xl font-medium text-white mt-3 leading-tight">
                Apex Superspeciality Hospital: 420 Beds, 1 Standard of Digital Excellence.
              </h3>
              <p className="text-sm text-[#999] mt-4 leading-relaxed">
                Rebuilding their digital presence resulted in 64% faster appointment triage, a 3.2x increase in international patient enquiries from the Middle East & Africa, and #1 local Google search ranking for cardiac and joint replacement surgery.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10 mt-6">
                <div>
                  <span className="font-heading text-2xl font-bold text-white">64%</span>
                  <p className="text-[11px] text-[#777873] mt-1">Faster OPD Triage</p>
                </div>
                <div>
                  <span className="font-heading text-2xl font-bold text-[#91A99B]">3.2x</span>
                  <p className="text-[11px] text-[#777873] mt-1">Int&apos;l Enquiries</p>
                </div>
                <div>
                  <span className="font-heading text-2xl font-bold text-white">#1</span>
                  <p className="text-[11px] text-[#777873] mt-1">Google Local Pack</p>
                </div>
              </div>
            </div>

            <div className="border border-white/10 p-6 bg-[#1F2228] text-xs space-y-4">
              <span className="font-mono text-[#91A99B] uppercase text-[10px] block">
                Deliverable Blueprint
              </span>
              <div className="space-y-2">
                {[
                  'Bilingual English & Arabic Patient Education Portal',
                  'Doctor Schedule Synchronisation with Hospital HIS',
                  'Instant WhatsApp Triage Bot for Emergency & Bed Booking',
                  'Automated Patient Review Acquisition Engine',
                  'ISO 27001 & Clinical Privacy Compliant Forms',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-[#ccc]">
                    <CheckCircle2 size={14} className="text-[#91A99B] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/contact?service=Hospital+Website"
                  className="inline-flex items-center gap-1.5 text-white hover:text-[#91A99B] transition-colors font-medium"
                >
                  <span>Commission a Similar Healthcare Platform</span>
                  <span>↗</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final Healthcare Action Call */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#777873] font-mono mb-3">
            Ready to Transform Your Hospital or Practice?
          </p>
          <h3 className="font-heading text-3xl sm:text-4xl font-medium text-white mb-6">
            Speak directly with our healthcare digital experience leads.
          </h3>
          <p className="text-[#999] text-base max-w-xl mx-auto mb-8">
            We evaluate your current patient journeys, local search presence, and appointment drop-offs free of charge.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?service=Hospital+Website"
              className="px-8 py-4 bg-[#91A99B] text-[#17191D] text-sm font-medium hover:bg-white transition-colors"
            >
              Book a Healthcare Digital Audit ↗
            </Link>
            <Link
              href="/work"
              className="px-8 py-4 border border-white/20 text-white text-sm font-medium hover:border-white transition-colors"
            >
              Explore Other Work Archive
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
