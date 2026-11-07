'use client';

import { useEffect, useState } from 'react';

/**
 * Interactive ambient spotlight that softly tracks the user's cursor across the page.
 * Elevates cards, borders, and dark glass surfaces with tactile lighting.
 */
export default function InteractiveSpotlight() {
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    try {
      const hasPointer = window.matchMedia('(pointer: fine)').matches;
      if (!hasPointer) return;

      let rafId: number;

      const handlePointerMove = (e: MouseEvent) => {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          setCoords({ x: e.clientX, y: e.clientY });
        });
      };

      window.addEventListener('mousemove', handlePointerMove, { passive: true });
      return () => {
        window.removeEventListener('mousemove', handlePointerMove);
        cancelAnimationFrame(rafId);
      };
    } catch {
      // Graceful fallback for browsers without matchMedia pointer support
    }
  }, []);

  if (!coords) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${coords.x}px ${coords.y}px, rgba(145, 169, 155, 0.05), transparent 80%)`,
      }}
      aria-hidden="true"
    />
  );
}