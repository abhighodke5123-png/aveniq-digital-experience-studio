'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSiteContent } from '@/context/SiteContentContext';
import {
  fadeInUp,
  slideInRight,
  staggerContainer,
  viewportConfig,
} from '@/lib/animations';
import { sound } from '@/lib/sound-fx';

function InteractiveArchitecturalComposition() {
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 280, y: 240 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 480);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 560);
    if (!isNaN(x) && !isNaN(y)) {
      setCoords({ x, y });
    }
  };

  return (
    <div className="relative w-full max-w-[500px] select-none group">
      {/* Interactive Blueprint HUD */}
      <div className="absolute -top-7 left-2 right-2 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-secondary/70 pointer-events-none">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span>{hoveredNode ? `TARGET: ${hoveredNode}` : 'ARCHITECTURAL GRID: LIVE'}</span>
        </span>
        <span>
          X: {coords.x} • Y: {coords.y}
        </span>
      </div>

      <svg
        ref={svgRef}
        viewBox="0 0 480 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-[560px] cursor-crosshair transition-transform duration-300 group-hover:scale-[1.01]"
        onMouseMove={handleMouseMove}
        onClick={() => sound.playClick(950)}
        aria-label="Interactive Architectural Composition"
      >
        {/* Large background rectangle — accent fill */}
        <rect
          x="60"
          y="40"
          width="280"
          height="360"
          fill="#91A99B"
          opacity="0.18"
          className="transition-opacity duration-300 hover:opacity-30"
          onMouseEnter={() => setHoveredNode('GRID_SURFACE_01')}
          onMouseLeave={() => setHoveredNode(null)}
        />

        {/* Overlapping tall rectangle — border stroke */}
        <rect
          x="160"
          y="0"
          width="200"
          height="480"
          stroke="#E5E2DC"
          strokeWidth="1.5"
          fill="none"
          className="transition-colors duration-300 hover:stroke-accent"
          onMouseEnter={() => setHoveredNode('VERTICAL_AXIS_02')}
          onMouseLeave={() => setHoveredNode(null)}
        />

        {/* Solid dark block */}
        <rect
          x="220"
          y="100"
          width="160"
          height="200"
          fill="#17191D"
          className="transition-all duration-300 hover:opacity-90"
          onMouseEnter={() => setHoveredNode('MONOLITH_CORE')}
          onMouseLeave={() => setHoveredNode(null)}
        />

        {/* Accent horizontal bar */}
        <rect
          x="0"
          y="320"
          width="320"
          height="48"
          fill="#91A99B"
          opacity="0.35"
          className="transition-opacity duration-300 hover:opacity-50"
          onMouseEnter={() => setHoveredNode('HORIZON_BEAM')}
          onMouseLeave={() => setHoveredNode(null)}
        />

        {/* Dynamic Interactive Reticle & Crosshair */}
        <line
          x1={coords.x}
          y1="0"
          x2={coords.x}
          y2="560"
          stroke="#91A99B"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.4"
        />
        <line
          x1="0"
          y1={coords.y}
          x2="480"
          y2={coords.y}
          stroke="#91A99B"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.4"
        />
        <circle
          cx={coords.x}
          cy={coords.y}
          r="6"
          stroke="#91A99B"
          strokeWidth="1.5"
          fill="none"
          className="animate-ping"
          style={{ transformOrigin: `${coords.x}px ${coords.y}px`, animationDuration: '2.5s' }}
        />
        <circle cx={coords.x} cy={coords.y} r="2.5" fill="#91A99B" />

        {/* Architectural measurement callout */}
        <text
          x={Math.min(Math.max(coords.x + 10, 15), 380)}
          y={Math.max(coords.y - 10, 25)}
          fill="#91A99B"
          fontSize="10"
          fontFamily="monospace"
          opacity="0.85"
        >
          [{coords.x}, {coords.y}]
        </text>

        {/* Decorative corner brackets */}
        <path d="M 10 20 L 10 10 L 20 10" stroke="#91A99B" strokeWidth="1" opacity="0.6" />
        <path d="M 470 20 L 470 10 L 460 10" stroke="#91A99B" strokeWidth="1" opacity="0.6" />
        <path d="M 10 540 L 10 550 L 20 550" stroke="#91A99B" strokeWidth="1" opacity="0.6" />
        <path d="M 470 540 L 470 550 L 460 550" stroke="#91A99B" strokeWidth="1" opacity="0.6" />
      </svg>
    </div>
  );
}

export default function Hero() {
  const { content } = useSiteContent();
  const heroData = content.hero;

  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-32 lg:pt-40 lg:pb-36">
      {/* Background architectural grid — subtle */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* ── Left Column: Typography & CTAs (7 cols) ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 border border-border px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {heroData.eyebrow}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeInUp}
              className="mt-6 font-heading text-4xl font-normal leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {heroData.headline}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="mt-6 max-w-xl text-base leading-relaxed text-secondary sm:text-lg md:text-xl font-normal"
            >
              {heroData.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href={heroData.primaryCtaHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-8 py-4 font-body text-sm font-medium text-background transition-colors duration-200 hover:bg-accent focus-visible:outline-accent"
              >
                <span>{heroData.primaryCtaText}</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href={heroData.secondaryCtaHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 py-4 font-body text-sm font-medium text-foreground transition-colors duration-200 hover:border-foreground focus-visible:outline-accent"
              >
                <span>{heroData.secondaryCtaText}</span>
              </Link>
            </motion.div>

            {/* Bottom Descriptor */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 flex items-center gap-3 border-t border-border pt-6 text-xs font-mono uppercase tracking-wider text-secondary"
            >
              <span className="text-accent">&#9670;</span>
              <span>{heroData.bottomDescriptor}</span>
            </motion.div>
          </motion.div>

          {/* ── Right Column: Interactive Geometric Composition (5 cols) ── */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center lg:col-span-5"
          >
            <InteractiveArchitecturalComposition />
          </motion.div>
        </div>
      </div>
    </section>
  );
}