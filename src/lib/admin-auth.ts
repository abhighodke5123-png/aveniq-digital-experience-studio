import crypto from 'crypto';
import { cookies } from 'next/headers';

export const SUPER_ADMIN_USERNAME = 'abhighodke5123@admin';
export const SUPER_ADMIN_PASSWORD = 'Aarti@1256';
export const ADMIN_COOKIE_NAME = 'aveniq_admin_session';

const AUTH_SECRET = process.env.AUTH0_SECRET || 'AVENIQ_SUPER_ADMIN_SECURE_HMAC_SECRET_2026';

export function verifyAdminCredentials(username?: string, password?: string): boolean {
  if (!username || !password) return false;
  const userValid = username.trim() === SUPER_ADMIN_USERNAME;
  const passValid = password === SUPER_ADMIN_PASSWORD;
  return userValid && passValid;
}

export function createAdminSessionToken(): string {
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(`${SUPER_ADMIN_USERNAME}:${timestamp}`)
    .digest('hex');
  return `${timestamp}.${signature}`;
}

export function verifyAdminSessionToken(token?: string | null): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [timestamp, signature] = parts;
  const tokenAge = Date.now() - parseInt(timestamp, 10);
  const maxAge = 1000 * 60 * 60 * 24 * 7; // 7 days

  if (isNaN(tokenAge) || tokenAge < 0 || tokenAge > maxAge) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(`${SUPER_ADMIN_USERNAME}:${timestamp}`)
    .digest('hex');

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'utf8'),
      Buffer.from(expectedSignature, 'utf8')
    );
  } catch {
    return false;
  }
}

export async function isAuthenticatedAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminSessionToken(sessionCookie);
}
