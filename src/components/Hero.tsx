'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  ArrowUpRight,
  Clock,
  Sparkles,
  Layers,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Cpu,
  CornerDownRight,
  Stethoscope,
  Compass,
} from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';
import { fadeInUp, slideInRight, staggerContainer, viewportConfig } from '@/lib/animations';
import { sound } from '@/lib/sound-fx';

type CanvasMode = 'clinical' | 'blueprint' | 'ai';

interface DoctorSlot {
  id: string;
  name: string;
  department: string;
  nextSlot: string;
  status: 'available' | 'high_demand';
}

const SAMPLE_DOCTORS: DoctorSlot[] = [
  { id: 'doc-1', name: 'Dr. Sameer Mehta', department: 'Cardiology', nextSlot: '16:30 Today', status: 'available' },
  { id: 'doc-2', name: 'Dr. Priya Kulkarni', department: 'Orthopaedics', nextSlot: '17:15 Today', status: 'high_demand' },
  { id: 'doc-3', name: 'Dr. Arvind Sen', department: 'Neurology', nextSlot: 'Tomorrow 10:00', status: 'available' },
];

export default function Hero() {
  const { content } = useSiteContent();
  const hero = content.hero;

  const [activeMode, setActiveMode] = useState<CanvasMode>('clinical');
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 240, y: 180 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<DoctorSlot>(SAMPLE_DOCTORS[0]);
  const [triageConfirmed, setTriageConfirmed] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  const svgRef = useRef<SVGSVGElement | null>(null);

  // Live Studio Clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        setCurrentTime(
          now.toLocaleTimeString('en-US', {
            timeZone: 'Asia/Kolkata',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })
        );
      } catch {
        const now = new Date();
        setCurrentTime(now.toTimeString().slice(0, 8));
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 480);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 400);
    if (!isNaN(x) && !isNaN(y)) {
      setCoords({ x, y });
    }
  };

  const switchMode = (mode: CanvasMode) => {
    sound.playClick(850);
    setActiveMode(mode);
  };

  return (
    <section
      id="home"
      className="relative min-h-[94vh] flex flex-col justify-between bg-[#0E1013] text-[#F7F6F2] pt-28 pb-14 lg:pt-36 lg:pb-16 overflow-hidden border-b border-[#262930]"
    >
      {/* Precision Architectural Grid Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Radial architectural vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(145,169,155,0.12),transparent_70%)]"
        aria-hidden="true"
      />

      {/* ── Studio Telemetry HUD Bar (Top Strip) ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#262930] pb-4 text-[11px] font-mono uppercase tracking-widest text-[#777873]">
          {/* Status badge with pulsing dot */}
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#91A99B] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#91A99B]" />
            </span>
            <span className="text-[#F7F6F2] font-semibold">STUDIO CAPACITY:</span>
            <span className="text-[#91A99B]">Q2 2026 ENGAGEMENTS ACTIVE</span>
          </div>

          {/* Studio Clock & Locations */}
          <div className="hidden sm:flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#F7F6F2]/80">
              <Clock size={12} className="text-[#91A99B]" />
              <span>{currentTime ? `${currentTime} IST` : '15:52:00 IST'}</span>
            </span>
            <span className="text-[#262930]">|</span>
            <span className="text-[#777873]">DELIVERY: IN • US • UK</span>
            <span className="text-[#262930]">|</span>
            <span className="flex items-center gap-1 text-[#91A99B]">
              <ShieldCheck size={12} />
              <span>WCAG 2.1 AA CLINICAL</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Main Hero Two-Column Layout ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column — Editorial Studio Statement (7 cols) */}
          <motion.div
            className="lg:col-span-7 flex flex-col gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeInUp} className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#91A99B]" />
              <p className="text-xs uppercase tracking-[0.25em] font-mono text-[#91A99B] font-medium">
                {hero.eyebrow || 'Independent Creative Technology & Clinical Studio'}
              </p>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-medium leading-[1.08] tracking-tight text-[#F7F6F2] max-w-3xl"
            >
              {hero.headline || (
                <>
                  Engineering Digital Flagships{' '}
                  <span className="text-[#91A99B] italic font-normal">&amp; Clinical Systems</span>{' '}
                  That Move Business Forward.
                </>
              )}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-[#9E9F9A] leading-relaxed max-w-2xl font-light"
            >
              {hero.description ||
                'We unite architectural design rigor with clinical-grade UX standards. Specialising in modern hospital ecosystems, bespoke web applications, and conversion-driven brand experiences.'}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <Link
                href={hero.primaryCtaHref || '/contact'}
                onClick={() => sound.playClick(950)}
                className="group inline-flex items-center gap-2 bg-[#F7F6F2] text-[#0E1013] px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 hover:bg-[#91A99B] hover:text-[#0E1013] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#91A99B]"
              >
                <span>{hero.primaryCtaText || 'Initiate Studio Scoping'}</span>
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href={hero.secondaryCtaHref || '/work'}
                onClick={() => sound.playClick(750)}
                className="inline-flex items-center gap-2 border border-[#262930] text-[#F7F6F2] px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 hover:border-[#F7F6F2] hover:bg-white/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#91A99B]"
              >
                <span>{hero.secondaryCtaText || 'Inspect Selected Work ↓'}</span>
              </Link>

              <a
                href="https://wa.me/919226638440?text=Hi%20AVENIQ,%20I%20would%20like%20to%20discuss%20a%20digital%20project."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick(1000)}
                className="inline-flex items-center gap-2 px-4 py-3.5 text-xs font-mono uppercase tracking-wider text-[#91A99B] hover:text-[#F7F6F2] transition-colors"
                title="Direct WhatsApp Studio Desk"
              >
                <MessageSquare size={14} />
                <span>WhatsApp Desk ↗</span>
              </a>
            </motion.div>

            {/* Architectural Guarantee Markers */}
            <motion.div
              variants={fadeInUp}
              className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-[11px] font-mono text-[#777873]"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#91A99B]" />
                <span>Zero Templates (100% Custom)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#91A99B]" />
                <span>99+ Lighthouse Vitals</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#91A99B]" />
                <span>Edge Microservices</span>
              </span>
            </motion.div>
          </motion.div>

          {/* Right Column — Interactive Architectural Studio Canvas (5 cols) */}
          <motion.div
            className="lg:col-span-5"
            variants={slideInRight}
            initial="hidden"
            animate="visible"
          >
            <div className="relative bg-[#131519] border border-[#262930] rounded-sm p-4 sm:p-5 shadow-2xl">
              
              {/* Canvas Corner Markers */}
              <div className="absolute top-2 left-2 text-[9px] font-mono text-[#777873]/50 pointer-events-none">+</div>
              <div className="absolute top-2 right-2 text-[9px] font-mono text-[#777873]/50 pointer-events-none">+</div>
              <div className="absolute bottom-2 left-2 text-[9px] font-mono text-[#777873]/50 pointer-events-none">+</div>
              <div className="absolute bottom-2 right-2 text-[9px] font-mono text-[#777873]/50 pointer-events-none">+</div>

              {/* Mode Selector Tabs */}
              <div className="flex items-center justify-between border-b border-[#262930] pb-3 mb-4">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => switchMode('clinical')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-colors rounded-xs ${
                      activeMode === 'clinical'
                        ? 'bg-[#91A99B] text-[#0E1013] font-bold'
                        : 'text-[#777873] hover:text-[#F7F6F2] hover:bg-white/[0.04]'
                    }`}
                  >
                    <Stethoscope size={12} />
                    <span>01 / OPD Triage</span>
                  </button>

                  <button
                    onClick={() => switchMode('blueprint')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-colors rounded-xs ${
                      activeMode === 'blueprint'
                        ? 'bg-[#91A99B] text-[#0E1013] font-bold'
                        : 'text-[#777873] hover:text-[#F7F6F2] hover:bg-white/[0.04]'
                    }`}
                  >
                    <Compass size={12} />
                    <span>02 / Grid HUD</span>
                  </button>

                  <button
                    onClick={() => switchMode('ai')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-colors rounded-xs ${
                      activeMode === 'ai'
                        ? 'bg-[#91A99B] text-[#0E1013] font-bold'
                        : 'text-[#777873] hover:text-[#F7F6F2] hover:bg-white/[0.04]'
                    }`}
                  >
                    <Sparkles size={12} />
                    <span>03 / AI Scoper</span>
                  </button>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-[#777873]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#91A99B] animate-pulse" />
                  <span>INTERACTIVE</span>
                </div>
              </div>

              {/* Dynamic Mode Screen */}
              <div className="relative min-h-[360px] flex flex-col justify-between">
                
                {/* ── MODE 1: Interactive Clinical OPD Triage Prototype ── */}
                {activeMode === 'clinical' && (
                  <motion.div
                    key="clinical-mode"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-4 font-mono text-xs"
                  >
                    <div className="flex items-center justify-between bg-black/30 p-2.5 rounded border border-[#262930]">
                      <span className="text-[#9E9F9A] uppercase tracking-wider text-[10px]">
                        HOSPITAL OPD TRIAGE ENGINE
                      </span>
                      <span className="text-[10px] text-[#91A99B] bg-[#91A99B]/10 px-2 py-0.5 rounded">
                        WhatsApp Sync: 100%
                      </span>
                    </div>

                    <div className="text-[11px] text-[#9E9F9A]">
                      Select a clinical speciality to test the 2-click patient discovery flow:
                    </div>

                    {/* Specialist Selection Buttons */}
                    <div className="space-y-2">
                      {SAMPLE_DOCTORS.map((doc) => {
                        const isSelected = selectedDoc.id === doc.id;
                        return (
                          <button
                            key={doc.id}
                            onClick={() => {
                              sound.playClick(900);
                              setSelectedDoc(doc);
                              setTriageConfirmed(false);
                            }}
                            className={`w-full text-left p-3 rounded border transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? 'bg-[#91A99B]/15 border-[#91A99B] text-[#F7F6F2]'
                                : 'bg-[#181A1F] border-[#262930] text-[#777873] hover:border-[#3B3F4A] hover:text-[#9E9F9A]'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-xs text-[#F7F6F2]">{doc.name}</span>
                              <span className="text-[10px] text-[#91A99B] bg-[#91A99B]/15 px-1.5 py-0.5 rounded">
                                {doc.department}
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-1 text-[10px]">
                              <span>Next OPD Slot: {doc.nextSlot}</span>
                              <span className={doc.status === 'available' ? 'text-emerald-400' : 'text-amber-400'}>
                                {doc.status === 'available' ? '● Available' : '▲ High Demand'}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Interactive Action Simulation */}
                    <div className="bg-black/40 p-3 rounded border border-[#262930] space-y-2 mt-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#777873]">Selected Speciality:</span>
                        <span className="text-[#F7F6F2] font-semibold">{selectedDoc.department}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#777873]">Patient Triage Latency:</span>
                        <span className="text-[#91A99B] font-mono">&lt; 140ms (Edge Cache)</span>
                      </div>

                      <button
                        onClick={() => {
                          sound.playClick(1050);
                          setTriageConfirmed(true);
                        }}
                        className="w-full mt-2 bg-[#91A99B] hover:bg-[#A3BCAF] text-[#0E1013] font-bold py-2 px-3 text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Calendar size={13} />
                        <span>{triageConfirmed ? '✓ WhatsApp Routing Active' : 'Simulate Direct Patient Booking'}</span>
                      </button>

                      {triageConfirmed && (
                        <p className="text-[10px] text-emerald-400 text-center pt-1 animate-pulse">
                          Lead synced to Supabase (AVQ-SB-DEMO) + WhatsApp Cloud webhook triggered.
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* ── MODE 2: Dynamic Architectural Grid Canvas ── */}
                {activeMode === 'blueprint' && (
                  <motion.div
                    key="blueprint-mode"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="relative w-full h-[360px] select-none"
                  >
                    {/* Live Coordinate HUD */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#777873] pb-2 border-b border-[#262930]">
                      <span className="text-[#91A99B]">
                        {hoveredNode ? `NODE: ${hoveredNode}` : 'ACTIVE ARCHITECTURE GRID'}
                      </span>
                      <span>
                        X: {coords.x} • Y: {coords.y}
                      </span>
                    </div>

                    <svg
                      ref={svgRef}
                      viewBox="0 0 480 340"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-[320px] cursor-crosshair mt-2"
                      onMouseMove={handleMouseMove}
                      onClick={() => sound.playClick(920)}
                    >
                      {/* Background grid blocks */}
                      <rect
                        x="40"
                        y="30"
                        width="240"
                        height="240"
                        fill="#91A99B"
                        opacity="0.12"
                        className="transition-opacity hover:opacity-25"
                        onMouseEnter={() => setHoveredNode('GRID_SURFACE_PRIMARY')}
                        onMouseLeave={() => setHoveredNode(null)}
                      />
                      <rect
                        x="160"
                        y="10"
                        width="180"
                        height="300"
                        stroke="#262930"
                        strokeWidth="1.5"
                        fill="none"
                        className="hover:stroke-[#91A99B] transition-colors"
                        onMouseEnter={() => setHoveredNode('AXIS_COLUMN_02')}
                        onMouseLeave={() => setHoveredNode(null)}
                      />
                      <rect
                        x="220"
                        y="70"
                        width="160"
                        height="180"
                        fill="#1C1F26"
                        stroke="#3B3F4A"
                        strokeWidth="1"
                        onMouseEnter={() => setHoveredNode('MONOLITH_CORE_CONTAINER')}
                        onMouseLeave={() => setHoveredNode(null)}
                      />
                      <circle
                        cx="380"
                        cy="90"
                        r="50"
                        stroke="#91A99B"
                        strokeWidth="1.5"
                        fill="none"
                        strokeDasharray="4 4"
                        onMouseEnter={() => setHoveredNode('RADIAL_DISPATCH_ORBIT')}
                        onMouseLeave={() => setHoveredNode(null)}
                      />
                      <circle cx="380" cy="90" r="6" fill="#91A99B" />

                      {/* Structural lines */}
                      <line x1="20" y1="280" x2="460" y2="280" stroke="#262930" strokeWidth="1" />
                      <line x1="380" y1="140" x2="380" y2="320" stroke="#262930" strokeWidth="1" />
                      <line x1="100" y1="30" x2="100" y2="310" stroke="#262930" strokeWidth="1" strokeDasharray="2 2" />

                      {/* Interactive Crosshairs tracking cursor */}
                      <line
                        x1={coords.x - 14}
                        y1={coords.y}
                        x2={coords.x + 14}
                        y2={coords.y}
                        stroke="#91A99B"
                        strokeWidth="1.5"
                      />
                      <line
                        x1={coords.x}
                        y1={coords.y - 14}
                        x2={coords.x}
                        y2={coords.y + 14}
                        stroke="#91A99B"
                        strokeWidth="1.5"
                      />
                      <circle cx={coords.x} cy={coords.y} r="5" stroke="#91A99B" strokeWidth="1" fill="none" />
                    </svg>
                  </motion.div>
                )}

                {/* ── MODE 3: Live Gemini AI Scoping Telemetry ── */}
                {activeMode === 'ai' && (
                  <motion.div
                    key="ai-mode"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-3 font-mono text-xs"
                  >
                    <div className="flex items-center justify-between bg-black/30 p-2 rounded border border-[#262930]">
                      <span className="text-[#91A99B] text-[10px]">MODEL: gemini-2.5-flash</span>
                      <span className="text-[10px] text-[#777873]">ENDPOINT: /api/ai-scoper</span>
                    </div>

                    <div className="bg-[#0B0C0E] border border-[#262930] p-3 rounded font-mono text-[11px] space-y-2 text-[#9E9F9A]">
                      <div className="text-white/60 text-[10px] uppercase">// LIVE CLIENT INPUT SIMULATION</div>
                      <p className="text-[#F7F6F2] italic">
                        &quot;Multi-speciality hospital web platform with OPD doctor triage, WhatsApp booking sync, and bilingual patient portals.&quot;
                      </p>
                      
                      <div className="border-t border-[#262930] pt-2 text-[10px] space-y-1">
                        <div className="flex justify-between">
                          <span className="text-[#777873]">Architecture:</span>
                          <span className="text-[#91A99B]">Next.js 16 + Turbopack</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#777873]">Data Layer:</span>
                          <span className="text-[#F7F6F2]">Supabase PostgreSQL + RLS</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#777873]">Authentication:</span>
                          <span className="text-[#F7F6F2]">Auth0 SSO (OAuth 2.0)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#777873]">Sprint Estimate:</span>
                          <span className="text-[#91A99B] font-bold">4 - 6 Weeks</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/services#scoper"
                      onClick={() => sound.playClick(980)}
                      className="w-full bg-[#1F2228] hover:bg-[#91A99B] hover:text-[#0E1013] text-[#F7F6F2] py-2 px-3 text-xs uppercase tracking-wider rounded text-center transition-colors border border-[#262930]"
                    >
                      Open Full Studio Scoping Engine ↗
                    </Link>
                  </motion.div>
                )}

                {/* Canvas Footer Status */}
                <div className="border-t border-[#262930] pt-2.5 mt-2 flex items-center justify-between text-[9px] font-mono text-[#777873]">
                  <span>FRAMEWORK: NEXT.JS 16.4</span>
                  <span>MOTION: GPU-ACCELERATED</span>
                  <span className="text-[#91A99B]">LATENCY: &lt;10MS</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom Architectural Milestones Strip ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full mt-12 pt-6 border-t border-[#262930]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          
          <div className="flex flex-col">
            <span className="font-heading text-2xl sm:text-3xl font-bold text-[#F7F6F2] tracking-tight">
              99.4<span className="text-xs font-mono font-normal text-[#91A99B] ml-1">/100</span>
            </span>
            <span className="text-xs text-[#777873] mt-1 font-mono uppercase tracking-wider">
              Core Web Vitals Score
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-heading text-2xl sm:text-3xl font-bold text-[#F7F6F2] tracking-tight">
              64<span className="text-sm font-mono text-[#91A99B] ml-0.5">%</span>
            </span>
            <span className="text-xs text-[#777873] mt-1 font-mono uppercase tracking-wider">
              Patient Call Reduction
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-heading text-2xl sm:text-3xl font-bold text-[#F7F6F2] tracking-tight">
              100<span className="text-sm font-mono text-[#91A99B] ml-0.5">%</span>
            </span>
            <span className="text-xs text-[#777873] mt-1 font-mono uppercase tracking-wider">
              Custom Architecture
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-heading text-2xl sm:text-3xl font-bold text-[#F7F6F2] tracking-tight">
              14<span className="text-sm font-mono text-[#91A99B] ml-1">Days</span>
            </span>
            <span className="text-xs text-[#777873] mt-1 font-mono uppercase tracking-wider">
              Average MVP Sprint
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
