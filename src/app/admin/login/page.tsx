'use client';

import { useState, useEffect, type FormEvent, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  User,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  AlertTriangle,
  Smartphone,
} from 'lucide-react';

interface ActiveDeviceConflict {
  sessionId?: string;
  deviceId: string;
  deviceName: string;
  ipAddress?: string;
  createdAt: string;
  lastActiveAt: string;
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const terminationReason = searchParams.get('reason');

  const [username, setUsername] = useState('abhighodke5123@admin');
  const [password, setPassword] = useState('Aarti@1256');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [conflictData, setConflictData] = useState<ActiveDeviceConflict | null>(null);
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);

  // Initialize or retrieve persistent device fingerprint
  useEffect(() => {
    try {
      let storedId = localStorage.getItem('aveniq_admin_device_id');
      if (!storedId) {
        storedId = `dev_${crypto.randomUUID().replace(/-/g, '').slice(0, 16)}`;
        localStorage.setItem('aveniq_admin_device_id', storedId);
      }
      setDeviceId(storedId);
    } catch {
      setDeviceId(`dev_${Date.now()}`);
    }
  }, []);

  async function submitLogin(forceReplace = false) {
    setError('');
    setLoading(true);

    try {
      const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'Browser Terminal';
      const deviceName = getBrowserDeviceName(userAgent);

      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          deviceId,
          deviceName,
          forceReplace,
        }),
      });

      const data = await res.json();

      if (res.status === 409 && data.conflict) {
        setConflictData(data.activeDevice);
        setLoading(false);
        return;
      }

      if (res.ok && data.success) {
        setConflictData(null);
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'Authentication rejected. Verify clearance credentials.');
        setLoading(false);
      }
    } catch {
      setError('Connection failed. Please check network connectivity and retry.');
      setLoading(false);
    }
  }

  function handleStandardLogin(e: FormEvent) {
    e.preventDefault();
    submitLogin(isRecoveryMode);
  }

  function handleAuthorizeAndReplace() {
    submitLogin(true);
  }

  return (
    <div className="bg-[#17191D] border border-white/10 rounded-lg p-8 md:p-10 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center gap-2.5 mb-2 text-[#91A99B]">
        <ShieldCheck size={20} />
        <span className="text-xs font-mono uppercase tracking-[0.2em] font-medium">
          Exclusive Clearance Gateway
        </span>
      </div>

      <h1 className="font-heading text-2xl md:text-3xl font-medium text-white mb-2">
        Super Admin Portal
      </h1>
      <p className="text-sm text-white/60 mb-6 leading-relaxed">
        Single-device exclusive terminal for website content management, lead CRM, and architecture settings.
      </p>

      {/* Session Terminated / Replaced Banner */}
      {terminationReason && (
        <div className="mb-6 p-4 bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs rounded-md flex items-start gap-3 leading-relaxed">
          <AlertTriangle size={18} className="shrink-0 text-amber-400 mt-0.5" />
          <div>
            <span className="font-semibold block text-amber-300">Clearance Reassigned</span>
            <span>
              Your session was terminated because this Super Admin account was authorized from another device or browser. Only one device may hold active clearance.
            </span>
          </div>
        </div>
      )}

      {/* Standard Error Notice */}
      {error && (
        <div className="mb-6 p-3.5 bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs rounded leading-relaxed">
          {error}
        </div>
      )}

      {/* ── Conflict Modal / Card: Another device is currently active ── */}
      {conflictData ? (
        <div className="p-5 bg-[#1F2228] border border-[#91A99B]/40 rounded-lg space-y-4">
          <div className="flex items-center gap-2 text-[#91A99B] text-xs font-mono uppercase tracking-wider">
            <Smartphone size={16} />
            <span>Active Session Detected On Another Device</span>
          </div>

          <div className="text-xs text-white/80 space-y-2 bg-[#141518] p-3.5 rounded border border-white/10 font-mono">
            <div className="flex justify-between">
              <span className="text-white/40">Active Device:</span>
              <span className="text-white font-medium">{conflictData.deviceName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">IP Address:</span>
              <span className="text-white">{conflictData.ipAddress || 'Verified Edge'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Registered:</span>
              <span className="text-white">
                {conflictData.createdAt ? new Date(conflictData.createdAt).toLocaleTimeString() : 'Recent'}
              </span>
            </div>
          </div>

          <p className="text-xs text-white/70 leading-relaxed">
            Aveniq enforces a strict single-device security policy. Authorizing this device will <span className="text-rose-300 font-semibold">immediately terminate</span> the session on the other device.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <button
              type="button"
              onClick={handleAuthorizeAndReplace}
              disabled={loading}
              className="flex-1 py-2.5 px-4 rounded bg-[#91A99B] text-[#111215] text-xs font-semibold hover:bg-[#A5B5AA] transition-colors cursor-pointer text-center"
            >
              {loading ? 'Reassigning...' : 'Authorize This Device & Invalidate Previous'}
            </button>
            <button
              type="button"
              onClick={() => setConflictData(null)}
              className="py-2.5 px-4 rounded border border-white/20 text-xs text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        /* ── Standard Login Form ── */
        <form onSubmit={handleStandardLogin} className="space-y-4">
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

          {/* Recovery Checkbox */}
          <div className="pt-1 flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-white/70 hover:text-white cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isRecoveryMode}
                onChange={(e) => setIsRecoveryMode(e.target.checked)}
                className="rounded border-white/20 bg-[#111215] text-[#91A99B] focus:ring-[#91A99B]"
              />
              <span>Force device replacement / recovery</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded bg-[#91A99B] text-[#111215] font-body text-sm font-semibold tracking-wide hover:bg-[#A5B5AA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#91A99B] disabled:opacity-50 transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Verifying Clearance & Device...</span>
              </>
            ) : (
              <>
                <span>
                  {isRecoveryMode ? 'Recover & Authorize This Device' : 'Unlock Super Admin Portal'}
                </span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      )}

      {/* Clearance Info */}
      <div className="mt-6 pt-5 border-t border-white/10 text-center">
        <span className="text-[11px] font-mono text-white/50 block">
          Exclusive Clearance Policy:
        </span>
        <span className="text-xs font-mono text-[#91A99B] block mt-1">
          abhighodke5123@admin • Single Device Enforced via Supabase
        </span>
      </div>
    </div>
  );
}

function getBrowserDeviceName(ua: string): string {
  let os = 'Desktop Terminal';
  if (/Windows/i.test(ua)) os = 'Windows PC';
  else if (/Macintosh|Mac OS/i.test(ua)) os = 'macOS Workstation';
  else if (/iPhone|iPad/i.test(ua)) os = 'iOS Device';
  else if (/Android/i.test(ua)) os = 'Android Mobile';
  else if (/Linux/i.test(ua)) os = 'Linux Terminal';

  let browser = 'Browser';
  if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) browser = 'Chrome';
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
  else if (/Firefox/i.test(ua)) browser = 'Firefox';
  else if (/Edg/i.test(ua)) browser = 'Edge';

  return `${browser} on ${os}`;
}

export default function SuperAdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#111215] text-[#F7F6F2] font-body flex flex-col justify-between p-6 md:p-12 relative overflow-hidden selection:bg-[#91A99B] selection:text-[#111215]">
      {/* Background grid */}
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

      {/* Main Content wrapped in Suspense for useSearchParams */}
      <main className="relative z-10 max-w-md w-full mx-auto my-auto py-12">
        <Suspense
          fallback={
            <div className="bg-[#17191D] border border-white/10 rounded-lg p-8 text-center text-xs font-mono text-white/50">
              Loading security terminal...
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-xs font-mono text-white/40 max-w-5xl mx-auto w-full">
        AVENIQ Digital Experience Studio • Secure Administrative Environment
      </footer>
    </div>
  );
}
