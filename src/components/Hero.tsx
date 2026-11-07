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
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 480);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 560);
    setCoords({ x, y });
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

        {/* Small square — foreground */}
        <rect x="100" y="140" width="80" height="80" fill="#17191D" opacity="0.08" />

        {/* Circle — accent outline */}
        <circle
          cx="400"
          cy="120"
          r="60"
          stroke="#91A99B"
          strokeWidth="1.5"
          fill="none"
          className="transition-all duration-500 hover:stroke-[2.5]"
          onMouseEnter={() => setHoveredNode('RADIAL_ORBIT')}
          onMouseLeave={() => setHoveredNode(null)}
        />

        {/* Small filled circle */}
        <circle cx="400" cy="120" r="8" fill="#91A99B" />

        {/* Vertical line */}
        <line x1="420" y1="200" x2="420" y2="520" stroke="#E5E2DC" strokeWidth="1" />

        {/* Horizontal line — lower */}
        <line x1="40" y1="440" x2="460" y2="440" stroke="#E5E2DC" strokeWidth="1" />

        {/* Diagonal accent line */}
        <line x1="320" y1="300" x2="460" y2="380" stroke="#91A99B" strokeWidth="1" opacity="0.6" />

        {/* Small square cluster — bottom right */}
        <rect x="380" y="460" width="40" height="40" fill="#17191D" opacity="0.06" />
        <rect x="430" y="460" width="40" height="40" stroke="#E5E2DC" strokeWidth="1" fill="none" />

        {/* Thin horizontal bar — top */}
        <rect x="60" y="60" width="120" height="2" fill="#91A99B" />

        {/* Small accent dot — bottom left */}
        <circle cx="80" cy="500" r="4" fill="#91A99B" opacity="0.5" />

        {/* Architectural crosshair lines */}
        <line x1="280" y1="480" x2="280" y2="540" stroke="#E5E2DC" strokeWidth="1" />
        <line x1="250" y1="510" x2="310" y2="510" stroke="#E5E2DC" strokeWidth="1" />

        {/* Dynamic crosshair tracking mouse */}
        <line
          x1={coords.x - 12}
          y1={coords.y}
          x2={coords.x + 12}
          y2={coords.y}
          stroke="#91A99B"
          strokeWidth="1.5"
          opacity="0.75"
        />
        <line
          x1={coords.x}
          y1={coords.y - 12}
          x2={coords.x}
          y2={coords.y + 12}
          stroke="#91A99B"
          strokeWidth="1.5"
          opacity="0.75"
        />
        <circle
          cx={coords.x}
          cy={coords.y}
          r="4"
          stroke="#91A99B"
          strokeWidth="1"
          fill="none"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}

export default function Hero() {
  const { content } = useSiteContent();
  const hero = content.hero;

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 gap-16">
          {/* Left — Content (55-60%) */}
          <motion.div
            className="lg:w-[58%] flex flex-col gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {/* Eyebrow */}
            <motion.p
              variants={fadeInUp}
              className="text-xs uppercase tracking-[0.2em] text-secondary"
            >
              {hero.eyebrow}
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-tight text-foreground max-w-4xl"
            >
              {hero.headline}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-lg text-secondary max-w-xl"
            >
              {hero.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Link
                href={hero.primaryCtaHref || '/contact'}
                className="inline-flex items-center bg-foreground text-background px-8 py-4 text-sm font-medium transition-colors duration-300 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                {hero.primaryCtaText || 'Start a Project ↗'}
              </Link>
              <Link
                href={hero.secondaryCtaHref || '/work'}
                className="inline-flex items-center border border-border text-foreground px-8 py-4 text-sm font-medium transition-colors duration-300 hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                {hero.secondaryCtaText || 'Explore Our Work ↓'}
              </Link>
            </motion.div>

            {/* Bottom descriptor */}
            <motion.p
              variants={fadeInUp}
              className="text-xs uppercase tracking-[0.15em] text-secondary pt-8"
            >
              {hero.bottomDescriptor}
            </motion.p>
          </motion.div>

          {/* Right — Architectural Visual (40-45%) */}
          <motion.div
            className="lg:w-[42%] flex items-center justify-center"
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <InteractiveArchitecturalComposition />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
