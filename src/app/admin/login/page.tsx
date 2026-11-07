'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Lock, User, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';

export default function SuperAdminLoginPage() {
  const [username, setUsername] = useState('abhighodke5123@admin');
  const [password, setPassword] = useState('Aarti@1256');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'Authentication rejected. Verify credentials.');
      }
    } catch {
      setError('Connection failed. Please check network and retry.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#111215] text-[#F7F6F2] font-body flex flex-col justify-between p-6 md:p-12 relative overflow-hidden selection:bg-[#91A99B] selection:text-[#111215]">
      {/* Subtle architectural background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#91A99B_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      {/* Top Header */}
      <header className="relative z-10 flex items-center justify-between max-w-5xl mx-auto w-full">
        <Link href="/" className="group flex items-center gap-2.5">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M16 3L4 28h5.5l2.8-6h7.4l2.8 6H28L16 3Z" fill="#F7F6F2" />
            <path d="M16 12l-3.2 7h6.4L16 12Z" fill="#91A99B" />
          </svg>
          <span className="font-heading text-lg font-bold tracking-tight text-white">AVENIQ</span>
          <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 bg-[#91A99B]/20 text-[#91A99B] rounded ml-2">
            Super Admin
          </span>
        </Link>
        <Link
          href="/"
          className="text-xs font-mono uppercase tracking-wider text-white/50 hover:text-white transition-colors"
        >
          ← Return to Studio
        </Link>
      </header>

      {/* Login Box */}
      <main className="relative z-10 max-w-md w-full mx-auto my-auto py-12">
        <div className="bg-[#17191D] border border-white/10 rounded-lg p-8 md:p-10 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2.5 mb-2 text-[#91A99B]">
            <ShieldCheck size={20} />
            <span className="text-xs font-mono uppercase tracking-[0.2em] font-medium">
              Clearance Gateway
            </span>
          </div>

          <h1 className="font-heading text-2xl md:text-3xl font-medium text-white mb-2">
            Super Admin Portal
          </h1>
          <p className="text-sm text-white/60 mb-6 leading-relaxed">
            Authenticated control terminal for live website architecture, client case studies, services, and enquiries.
          </p>

          {error && (
            <div className="mb-6 p-3.5 bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs rounded leading-relaxed">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5"
              >
                Super Admin Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <User size={16} />
                </div>
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="abhighodke5123@admin"
                  className="w-full pl-10 pr-4 py-3 bg-[#111215] border border-white/15 rounded text-sm text-white placeholder-white/30 focus:border-[#91A99B] focus:outline-none focus:ring-1 focus:ring-[#91A99B] transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5"
              >
                Master Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <Lock size={16} />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-3 bg-[#111215] border border-white/15 rounded text-sm text-white placeholder-white/30 focus:border-[#91A99B] focus:outline-none focus:ring-1 focus:ring-[#91A99B] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded bg-[#91A99B] text-[#111215] font-body text-sm font-semibold tracking-wide hover:bg-[#A5B5AA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#91A99B] disabled:opacity-50 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Verifying Clearance...</span>
                </>
              ) : (
                <>
                  <span>Unlock Super Admin Portal</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Quick Preset Credentials Notice */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <span className="text-[11px] font-mono text-white/50 block">
              Configured Clearance:
            </span>
            <span className="text-xs font-mono text-[#91A99B] block mt-1">
              abhighodke5123@admin • Aarti@1256
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-xs font-mono text-white/40 max-w-5xl mx-auto w-full">
        <span>AVENIQ Studio Systems • Encrypted Session Token Guard</span>
      </footer>
    </div>
  );
}
