import { auth0 } from '@/lib/auth0';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Client Portal | AVENIQ',
  description: 'Secure project workspace and design delivery portal for AVENIQ clients.',
};

export default async function ClientPortal() {
  let user: { name?: string; given_name?: string; email?: string; isDemo?: boolean } | null = null;

  try {
    const session = await auth0.getSession();
    if (session?.user) {
      user = session.user;
    }
  } catch (err) {
    console.warn('Auth0 session retrieval note:', err);
  }

  const hasAuth0Config = Boolean(process.env.AUTH0_SECRET && process.env.AUTH0_CLIENT_ID);
  if (!user && hasAuth0Config) {
    redirect('/auth/login?returnTo=/portal');
  }

  const activeUser = user || {
    name: 'Clinical Partner (Preview Mode)',
    given_name: 'Partner',
    email: 'client-preview@aveniq.in',
    isDemo: true,
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#17191D] font-body">
      {/* Header */}
      <header className="border-b border-[#E5E2DC] bg-white/60 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-heading text-xl font-bold tracking-tight">
              AVENIQ.
            </Link>
            <span className="text-xs font-mono uppercase tracking-widest text-[#777873] px-2 py-0.5 bg-[#17191D]/5 rounded">
              Client Portal
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-medium text-[#17191D]">{activeUser.name}</span>
              <span className="text-[11px] text-[#777873]">{activeUser.email}</span>
            </div>
            {activeUser.isDemo ? (
              <a
                href="/auth/login"
                className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#17191D] border border-[#E5E2DC] rounded-full hover:border-[#17191D] transition-colors"
              >
                Sign In with SSO
              </a>
            ) : (
              <a
                href="/auth/logout"
                className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#17191D] border border-[#E5E2DC] rounded-full hover:border-[#17191D] transition-colors"
              >
                Sign Out
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        {activeUser.isDemo && (
          <div className="mb-8 p-4 border border-[#91A99B]/30 bg-[#91A99B]/10 rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-semibold text-foreground">Auth0 Workspace Preview Mode</span>
              <p className="text-secondary mt-0.5">
                Viewing client portal workspace in verification mode. To enforce live Single Sign-On, connect `AUTH0_SECRET` and `AUTH0_CLIENT_ID` in your Vercel or local environment.
              </p>
            </div>
            <a
              href="/auth/login"
              className="px-3.5 py-1.5 bg-[#17191D] text-white font-mono text-[11px] uppercase tracking-wider rounded shrink-0 hover:bg-[#91A99B] hover:text-[#17191D] transition-colors"
            >
              Test Auth0 SSO
            </a>
          </div>
        )}

        {/* Welcome Banner */}
        <div className="border border-[#E5E2DC] bg-white p-8 md:p-12 mb-12">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#91A99B]">
            Authenticated Workspace
          </p>
          <h1 className="font-heading text-3xl md:text-4xl font-medium mt-3 text-[#17191D]">
            Welcome back, {activeUser.given_name || activeUser.name?.split(' ')[0] || 'Client'}.
          </h1>
          <p className="text-[#777873] text-base mt-2 max-w-2xl leading-relaxed">
            Track your ongoing studio deliverables, review sprint prototypes, and access staging environments directly.
          </p>
        </div>

        {/* Deliverables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="border border-[#E5E2DC] bg-white p-6">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#91A99B] font-semibold">
              Milestone 02 / In Progress
            </span>
            <h2 className="font-heading text-lg font-medium mt-2">
              Design Architecture & Prototypes
            </h2>
            <p className="text-xs text-[#777873] mt-2 leading-relaxed">
              Figma design tokens and clinical triage user flows submitted for director sign-off.
            </p>
            <div className="mt-4 pt-4 border-t border-[#E5E2DC] flex items-center justify-between text-xs font-mono">
              <span className="text-[#777873]">Progress</span>
              <span className="font-medium text-[#17191D]">65% Complete</span>
            </div>
          </div>

          <div className="border border-[#E5E2DC] bg-white p-6">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#777873] font-semibold">
              Milestone 03 / Queued
            </span>
            <h2 className="font-heading text-lg font-medium mt-2">
              Next.js 16 Production Codebase
            </h2>
            <p className="text-xs text-[#777873] mt-2 leading-relaxed">
              Vercel edge deployment, Supabase database bindings, and WhatsApp triage webhooks.
            </p>
            <div className="mt-4 pt-4 border-t border-[#E5E2DC] flex items-center justify-between text-xs font-mono">
              <span className="text-[#777873]">Target</span>
              <span className="font-medium text-[#17191D]">Sprint Week 4</span>
            </div>
          </div>

          <div className="border border-[#E5E2DC] bg-white p-6">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#777873] font-semibold">
              Milestone 04 / Queued
            </span>
            <h2 className="font-heading text-lg font-medium mt-2">
              Security Audit & DNS Cutover
            </h2>
            <p className="text-xs text-[#777873] mt-2 leading-relaxed">
              WCAG 2.1 AA audit, Core Web Vitals 95+ certification, and hospital EHR synchronization.
            </p>
            <div className="mt-4 pt-4 border-t border-[#E5E2DC] flex items-center justify-between text-xs font-mono">
              <span className="text-[#777873]">Target</span>
              <span className="font-medium text-[#17191D]">Sprint Week 6</span>
            </div>
          </div>
        </div>

        {/* Resources & Studio Contacts */}
        <div className="border border-[#E5E2DC] bg-white p-8">
          <h2 className="font-heading text-xl font-medium text-[#17191D] mb-4">
            Studio Resources & Communications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 bg-[#F7F6F2] border border-[#E5E2DC]">
              <span className="text-[#777873] block mb-1">Lead Creative Director</span>
              <span className="font-medium text-[#17191D]">Abhishek G.</span>
            </div>
            <div className="p-4 bg-[#F7F6F2] border border-[#E5E2DC]">
              <span className="text-[#777873] block mb-1">Technical Architect</span>
              <span className="font-medium text-[#17191D]">AVENIQ Core Systems</span>
            </div>
            <div className="p-4 bg-[#F7F6F2] border border-[#E5E2DC]">
              <span className="text-[#777873] block mb-1">Direct Phone Line</span>
              <a
                href="tel:+919226638440"
                className="font-medium text-[#17191D] hover:text-[#91A99B] transition-colors"
              >
                +91 9226638440
              </a>
            </div>
            <div className="p-4 bg-[#F7F6F2] border border-[#E5E2DC]">
              <span className="text-[#777873] block mb-1">WhatsApp Studio Desk</span>
              <a
                href="https://wa.me/919226638440?text=Hello%20AVENIQ%20Studio%2C%20client%20portal%20inquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#91A99B] hover:underline"
              >
                +91 9226638440 (Priority)
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
