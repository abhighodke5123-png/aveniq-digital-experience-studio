'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { sound } from '@/lib/sound-fx';

interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Healthcare', href: '/healthcare', badge: 'Speciality' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const SCROLL_THRESHOLD = 40;

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, isLoading } = useUser();
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    setSoundActive(sound.isEnabled());
  }, []);

  const handleToggleSound = () => {
    const nextState = sound.toggle();
    setSoundActive(nextState);
  };

  // Track scroll for background transition
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const isDarkPage = pathname === '/healthcare';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? isDarkPage
            ? 'bg-[#17191D]/90 backdrop-blur-md border-b border-white/10'
            : 'bg-background/90 backdrop-blur-md border-b border-border shadow-xs'
          : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-[72px] md:px-8"
      >
        {/* ── Wordmark ── */}
        <Link
          href="/"
          aria-label="AVENIQ — Home"
          className="group flex items-center gap-2.5 focus-visible:outline-accent"
        >
          {/* Geometric A monogram */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:scale-105"
          >
            <path
              d="M16 3L4 28h5.5l2.8-6h7.4l2.8 6H28L16 3Z"
              fill={isDarkPage ? '#F7F6F2' : '#17191D'}
            />
            <path d="M16 12l-3.2 7h6.4L16 12Z" fill="#91A99B" />
          </svg>

          {/* Lettermark */}
          <span
            className={`font-heading text-xl font-bold tracking-tight transition-colors ${
              isDarkPage ? 'text-[#F7F6F2]' : 'text-foreground'
            }`}
          >
            AVENIQ
          </span>
        </Link>

        {/* ── Desktop nav list ── */}
        <ul className="hidden items-center gap-1 lg:flex" role="list">
          {NAV_LINKS.map(({ label, href, badge }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`relative flex items-center gap-1.5 px-3.5 py-2 font-body text-sm transition-colors duration-200 focus-visible:outline-accent ${
                    isActive
                      ? isDarkPage
                        ? 'text-white font-medium'
                        : 'text-foreground font-medium'
                      : isDarkPage
                      ? 'text-white/60 hover:text-white'
                      : 'text-secondary hover:text-foreground'
                  }`}
                >
                  <span>{label}</span>
                  {badge && (
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-accent/20 text-accent font-semibold">
                      {badge}
                    </span>
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-x-3.5 -bottom-0.5 h-px bg-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Desktop CTA + Auth + mobile toggle ── */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Tactile Sound FX Toggle */}
          <button
            onClick={handleToggleSound}
            title={soundActive ? 'Tactile Sound FX: Enabled' : 'Tactile Sound FX: Disabled'}
            aria-label={soundActive ? 'Mute sound effects' : 'Enable tactile sound effects'}
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-mono transition-colors border cursor-pointer ${
              soundActive
                ? 'bg-accent/20 border-accent/40 text-accent font-semibold'
                : isDarkPage
                ? 'border-white/10 text-white/50 hover:text-white hover:border-white/20'
                : 'border-border text-secondary hover:text-foreground hover:border-foreground/20'
            }`}
          >
            {soundActive ? <Volume2 size={13} /> : <VolumeX size={13} />}
            <span className="text-[10px] tracking-wider uppercase">
              {soundActive ? 'Audio ON' : 'Audio'}
            </span>
          </button>

          {/* Auth0 Login / Portal status */}
          {!isLoading && (
            user ? (
              <div className="hidden items-center gap-2 sm:flex">
                <Link
                  href="/portal"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border rounded-full transition-colors ${
                    isDarkPage
                      ? 'border-white/20 text-white hover:border-accent'
                      : 'border-border text-foreground hover:border-accent'
                  }`}
                >
                  <User size={13} className="text-accent" />
                  <span>{user.name?.split(' ')[0] || 'Client'}</span>
                </Link>
                <a
                  href="/auth/logout"
                  title="Sign Out"
                  className={`p-1.5 transition-colors ${
                    isDarkPage ? 'text-white/60 hover:text-white' : 'text-secondary hover:text-foreground'
                  }`}
                  aria-label="Log out"
                >
                  <LogOut size={16} />
                </a>
              </div>
            ) : (
              <a
                href="/auth/login"
                className={`hidden text-xs font-medium uppercase tracking-wider transition-colors sm:inline-block px-3 py-2 ${
                  isDarkPage ? 'text-white/60 hover:text-white' : 'text-secondary hover:text-foreground'
                }`}
              >
                Client Portal
              </a>
            )
          )}

          <Link
            href="/contact"
            className={`hidden rounded-full px-5 py-2 font-body text-sm font-medium transition-colors duration-200 focus-visible:outline-accent md:inline-flex items-center gap-1.5 ${
              isDarkPage
                ? 'bg-white text-[#17191D] hover:bg-accent'
                : 'bg-foreground text-background hover:bg-accent'
            }`}
          >
            <span>Start a Project</span>
            <ArrowUpRight size={14} />
          </Link>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:text-accent focus-visible:outline-accent lg:hidden ${
              isDarkPage ? 'text-white' : 'text-foreground'
            }`}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMobile}
              className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 34 }}
              className="fixed inset-y-0 right-0 z-50 flex w-80 flex-col bg-background px-6 pt-20 shadow-2xl lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <button
                type="button"
                aria-label="Close menu"
                onClick={closeMobile}
                className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:text-accent focus-visible:outline-accent"
              >
                <X size={22} />
              </button>

              <div className="mb-6 pb-4 border-b border-border">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-secondary">
                  Navigation
                </span>
              </div>

              <ul className="flex flex-col gap-1.5" role="list">
                {NAV_LINKS.map(({ label, href, badge }, i) => {
                  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

                  return (
                    <motion.li
                      key={href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.25 }}
                    >
                      <Link
                        href={href}
                        onClick={closeMobile}
                        className={`flex items-center justify-between rounded-lg px-3 py-3 font-body text-base transition-colors duration-200 focus-visible:outline-accent ${
                          isActive
                            ? 'bg-accent/15 text-foreground font-semibold'
                            : 'text-secondary hover:bg-foreground/[0.04] hover:text-foreground'
                        }`}
                      >
                        <span>{label}</span>
                        {badge && (
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-accent/20 text-accent font-semibold">
                            {badge}
                          </span>
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-8 pt-6 border-t border-border flex flex-col gap-3">
                <Link
                  href="/contact"
                  onClick={closeMobile}
                  className="w-full text-center bg-foreground text-background py-3.5 text-sm font-medium rounded-full hover:bg-accent transition-colors"
                >
                  Start a Project ↗
                </Link>

                {!isLoading && (
                  user ? (
                    <div className="flex items-center justify-between px-2 pt-2">
                      <span className="text-xs text-secondary truncate">{user.email}</span>
                      <a href="/auth/logout" className="text-xs text-rose-500 font-medium">
                        Log out
                      </a>
                    </div>
                  ) : (
                    <a
                      href="/auth/login"
                      className="text-center text-xs font-mono uppercase tracking-wider text-secondary py-2 border border-border rounded-full hover:text-foreground"
                    >
                      Client Portal Login
                    </a>
                  )
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
