import { NextResponse } from 'next/server';
import {
  verifyAdminCredentials,
  createSingleDeviceAdminSession,
  ADMIN_COOKIE_NAME,
  SUPER_ADMIN_USERNAME,
} from '@/lib/admin-auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password, deviceId, deviceName, forceReplace } = body;

    if (!verifyAdminCredentials(username, password)) {
      return NextResponse.json(
        { success: false, error: 'Invalid super admin username or password.' },
        { status: 401 }
      );
    }

    // Extract network & client device metadata
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0].trim() : (realIp || '127.0.0.1');
    const userAgent = req.headers.get('user-agent') || 'Unknown Terminal';

    // Fallback device identifier if client did not supply a stored client deviceId
    const resolvedDeviceId = deviceId?.trim() || `device_${Buffer.from(`${ipAddress}:${userAgent.slice(0, 40)}`).toString('base64url').slice(0, 24)}`;
    const resolvedDeviceName = deviceName?.trim() || getSimplifiedDeviceName(userAgent);

    const sessionResult = await createSingleDeviceAdminSession({
      deviceId: resolvedDeviceId,
      deviceName: resolvedDeviceName,
      ipAddress,
      userAgent,
      forceReplace: Boolean(forceReplace),
    });

    if (!sessionResult.success) {
      if (sessionResult.conflict) {
        return NextResponse.json(
          {
            success: false,
            conflict: true,
            activeDevice: sessionResult.activeDevice,
            message: sessionResult.message,
          },
          { status: 409 } // 409 Conflict indicates existing active session on another device
        );
      }

      return NextResponse.json(
        { success: false, error: sessionResult.error || 'Failed to register exclusive admin session.' },
        { status: 500 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: 'Super admin clearance granted.',
      user: {
        username: SUPER_ADMIN_USERNAME,
        role: 'Super Administrator',
      },
      activeDevice: sessionResult.activeDevice,
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: sessionResult.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err) {
    console.error('Super admin login error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error during authentication.' },
      { status: 500 }
    );
  }
}

function getSimplifiedDeviceName(userAgent: string): string {
  if (/Windows/i.test(userAgent)) return 'Windows PC Terminal';
  if (/Macintosh|Mac OS/i.test(userAgent)) return 'Mac Terminal';
  if (/iPhone|iPad/i.test(userAgent)) return 'iOS Mobile Terminal';
  if (/Android/i.test(userAgent)) return 'Android Mobile Terminal';
  if (/Linux/i.test(userAgent)) return 'Linux Terminal';
  return 'Architectural Studio Terminal';
}
