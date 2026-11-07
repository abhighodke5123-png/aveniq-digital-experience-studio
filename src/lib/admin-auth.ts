import crypto from 'crypto';
import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';

export const SUPER_ADMIN_USERNAME = 'abhighodke5123@admin';
export const SUPER_ADMIN_PASSWORD = 'Aarti@1256';
export const ADMIN_COOKIE_NAME = 'aveniq_admin_session';

const AUTH_SECRET = process.env.AUTH0_SECRET || 'AVENIQ_SUPER_ADMIN_SECURE_HMAC_SECRET_2026';

export interface ActiveDeviceInfo {
  sessionId?: string;
  deviceId: string;
  deviceName: string;
  ipAddress?: string;
  createdAt: string;
  lastActiveAt: string;
}

export interface AdminAuthCheckResult {
  authenticated: boolean;
  code?: 'VALID' | 'NO_TOKEN' | 'INVALID_FORMAT' | 'EXPIRED' | 'SESSION_TERMINATED' | 'DB_UNAVAILABLE';
  reason?: string;
  activeDevice?: ActiveDeviceInfo;
}

export function verifyAdminCredentials(username?: string, password?: string): boolean {
  if (!username || !password) return false;
  const userValid = username.trim() === SUPER_ADMIN_USERNAME;
  const passValid = password === SUPER_ADMIN_PASSWORD;
  return userValid && passValid;
}

/**
 * Validates cryptographic format and HMAC signature of token.
 */
function verifyTokenHMAC(token?: string | null): { valid: boolean; timestamp?: number } {
  if (!token) return { valid: false };
  const parts = token.split('.');
  
  // 3-part token: nonce.timestamp.signature
  if (parts.length === 3) {
    const [nonce, timestampStr, signature] = parts;
    const timestamp = parseInt(timestampStr, 10);
    const tokenAge = Date.now() - timestamp;
    const maxAge = 1000 * 60 * 60 * 24 * 7; // 7 days

    if (isNaN(tokenAge) || tokenAge < 0 || tokenAge > maxAge) {
      return { valid: false };
    }

    const expectedSignature = crypto
      .createHmac('sha256', AUTH_SECRET)
      .update(`${SUPER_ADMIN_USERNAME}:${nonce}:${timestampStr}`)
      .digest('hex');

    try {
      const valid = crypto.timingSafeEqual(
        Buffer.from(signature, 'utf8'),
        Buffer.from(expectedSignature, 'utf8')
      );
      return { valid, timestamp };
    } catch {
      return { valid: false };
    }
  }

  // Legacy 2-part token: timestamp.signature
  if (parts.length === 2) {
    const [timestampStr, signature] = parts;
    const timestamp = parseInt(timestampStr, 10);
    const tokenAge = Date.now() - timestamp;
    const maxAge = 1000 * 60 * 60 * 24 * 7;

    if (isNaN(tokenAge) || tokenAge < 0 || tokenAge > maxAge) {
      return { valid: false };
    }

    const expectedSignature = crypto
      .createHmac('sha256', AUTH_SECRET)
      .update(`${SUPER_ADMIN_USERNAME}:${timestampStr}`)
      .digest('hex');

    try {
      const valid = crypto.timingSafeEqual(
        Buffer.from(signature, 'utf8'),
        Buffer.from(expectedSignature, 'utf8')
      );
      return { valid, timestamp };
    } catch {
      return { valid: false };
    }
  }

  return { valid: false };
}

/**
 * Creates and registers a new single-device Super Admin session in Supabase.
 * If another device already holds an active session and forceReplace is false, returns conflict details.
 */
export async function createSingleDeviceAdminSession(options: {
  deviceId: string;
  deviceName?: string;
  ipAddress?: string;
  userAgent?: string;
  forceReplace?: boolean;
}): Promise<
  | { success: true; token: string; activeDevice: ActiveDeviceInfo }
  | { success: false; conflict: true; activeDevice: ActiveDeviceInfo; message: string }
  | { success: false; conflict?: false; error: string }
> {
  const {
    deviceId,
    deviceName = 'Standard Browser Terminal',
    ipAddress = 'Unknown IP',
    userAgent = '',
    forceReplace = false,
  } = options;

  try {
    // 1. Check for existing active session in Supabase
    const { data: activeRows, error: fetchErr } = await supabase
      .from('admin_active_session')
      .select('id, session_id, device_id, device_name, ip_address, created_at, last_active_at')
      .eq('username', SUPER_ADMIN_USERNAME)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1);

    if (fetchErr) {
      console.warn('Supabase session fetch warning:', fetchErr.message);
    }

    const currentActive = activeRows && activeRows.length > 0 ? activeRows[0] : null;

    // 2. Conflict detection: Active session on a DIFFERENT device without forceReplace
    if (currentActive && currentActive.device_id !== deviceId && !forceReplace) {
      return {
        success: false,
        conflict: true,
        activeDevice: {
          sessionId: currentActive.session_id,
          deviceId: currentActive.device_id,
          deviceName: currentActive.device_name || 'Previously Registered Device',
          ipAddress: currentActive.ip_address || 'Hidden IP',
          createdAt: currentActive.created_at,
          lastActiveAt: currentActive.last_active_at,
        },
        message: 'Another device is currently registered as Super Admin.',
      };
    }

    // 3. Atomically invalidate ALL previous active sessions for this account
    const { error: invalidateErr } = await supabase
      .from('admin_active_session')
      .update({
        is_active: false,
        invalidated_at: new Date().toISOString(),
        invalidation_reason: `Session superseded by login from device: ${deviceName} (${ipAddress})`,
      })
      .eq('username', SUPER_ADMIN_USERNAME)
      .eq('is_active', true);

    if (invalidateErr) {
      console.warn('Supabase invalidate previous sessions warning:', invalidateErr.message);
    }

    // 4. Generate unique cryptographically signed session token
    const nonce = crypto.randomUUID().replace(/-/g, '');
    const timestampStr = Date.now().toString();
    const signature = crypto
      .createHmac('sha256', AUTH_SECRET)
      .update(`${SUPER_ADMIN_USERNAME}:${nonce}:${timestampStr}`)
      .digest('hex');
    const token = `${nonce}.${timestampStr}.${signature}`;

    // 5. Insert new active session row into Supabase
    const nowIso = new Date().toISOString();
    const { error: insertErr } = await supabase
      .from('admin_active_session')
      .insert([
        {
          username: SUPER_ADMIN_USERNAME,
          session_id: token,
          device_id: deviceId,
          device_name: deviceName,
          ip_address: ipAddress,
          user_agent: userAgent,
          is_active: true,
          created_at: nowIso,
          last_active_at: nowIso,
        },
      ]);

    if (insertErr) {
      console.error('Supabase insert session error:', insertErr.message);
      return { success: false, error: 'Database rejected session registration: ' + insertErr.message };
    }

    return {
      success: true,
      token,
      activeDevice: {
        sessionId: token,
        deviceId,
        deviceName,
        ipAddress,
        createdAt: nowIso,
        lastActiveAt: nowIso,
      },
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Session registration failed';
    return { success: false, error: msg };
  }
}

/**
 * Checks server-side authentication for the incoming request.
 * Verifies token signature AND verifies against live Supabase database that this session is still the exclusive active session.
 */
export async function checkAdminAuth(): Promise<AdminAuthCheckResult> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

    if (!token) {
      return { authenticated: false, code: 'NO_TOKEN', reason: 'No admin session token provided.' };
    }

    // 1. Verify HMAC cryptographic signature
    const hmacCheck = verifyTokenHMAC(token);
    if (!hmacCheck.valid) {
      return { authenticated: false, code: 'INVALID_FORMAT', reason: 'Invalid or forged token signature.' };
    }

    // 2. Query Supabase for the status of this exact session
    const { data: sessionRows, error: dbErr } = await supabase
      .from('admin_active_session')
      .select('id, session_id, device_id, device_name, ip_address, is_active, created_at, last_active_at, invalidation_reason')
      .eq('session_id', token)
      .limit(1);

    if (dbErr) {
      console.warn('Supabase session check error:', dbErr.message);
      return { authenticated: false, code: 'DB_UNAVAILABLE', reason: 'Unable to verify session with database.' };
    }

    if (!sessionRows || sessionRows.length === 0) {
      return {
        authenticated: false,
        code: 'SESSION_TERMINATED',
        reason: 'Session record not found or was purged.',
      };
    }

    const session = sessionRows[0];

    // 3. Enforce single-device exclusivity: if invalidated or inactive, immediately reject
    if (!session.is_active) {
      return {
        authenticated: false,
        code: 'SESSION_TERMINATED',
        reason: session.invalidation_reason || 'This session was terminated because another device has been registered.',
      };
    }

    // 4. Update last_active_at asynchronously (touch heartbeat)
    Promise.resolve(
      supabase
        .from('admin_active_session')
        .update({ last_active_at: new Date().toISOString() })
        .eq('id', session.id)
    ).catch(() => {});

    return {
      authenticated: true,
      code: 'VALID',
      activeDevice: {
        sessionId: session.session_id,
        deviceId: session.device_id,
        deviceName: session.device_name || 'Authorized Terminal',
        ipAddress: session.ip_address,
        createdAt: session.created_at,
        lastActiveAt: session.last_active_at,
      },
    };
  } catch (err) {
    return {
      authenticated: false,
      code: 'DB_UNAVAILABLE',
      reason: err instanceof Error ? err.message : 'Authentication verification error',
    };
  }
}

/**
 * Backward compatible boolean check for existing callers.
 */
export async function isAuthenticatedAdmin(): Promise<boolean> {
  const result = await checkAdminAuth();
  return result.authenticated;
}

/**
 * Invalidates the current session on logout.
 */
export async function invalidateCurrentAdminSession(): Promise<void> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (token) {
      await supabase
        .from('admin_active_session')
        .update({
          is_active: false,
          invalidated_at: new Date().toISOString(),
          invalidation_reason: 'Super Admin logged out manually',
        })
        .eq('session_id', token);
    }
  } catch (e) {
    console.warn('Logout session invalidation warning:', e);
  }
}

/**
 * Emergency recovery: Terminate all sessions for the super admin account.
 */
export async function terminateAllAdminSessions(reason = 'Emergency device recovery reset'): Promise<void> {
  await supabase
    .from('admin_active_session')
    .update({
      is_active: false,
      invalidated_at: new Date().toISOString(),
      invalidation_reason: reason,
    })
    .eq('username', SUPER_ADMIN_USERNAME)
    .eq('is_active', true);
}
