import { NextResponse } from 'next/server';
import {
  verifyAdminCredentials,
  createSingleDeviceAdminSession,
  terminateAllAdminSessions,
  ADMIN_COOKIE_NAME,
  SUPER_ADMIN_USERNAME,
} from '@/lib/admin-auth';

/**
 * Super Admin Device Recovery & Force Session Reset Endpoint.
 * In the event a previous device is lost, stolen, or inaccessible, this endpoint
 * accepts the master credentials, terminates all active sessions in Supabase,
 * and authorizes the requesting device as the exclusive registered terminal.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password, deviceId, deviceName } = body;

    if (!verifyAdminCredentials(username, password)) {
      return NextResponse.json(
        { success: false, error: 'Invalid super admin credentials for device recovery.' },
        { status: 401 }
      );
    }

    // 1. Terminate all previous sessions in Supabase
    await terminateAllAdminSessions('Emergency manual device recovery authorization');

    // 2. Extract network metadata
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0].trim() : (realIp || '127.0.0.1');
    const userAgent = req.headers.get('user-agent') || 'Unknown Recovery Terminal';

    const resolvedDeviceId = deviceId?.trim() || `device_${Date.now()}`;
    const resolvedDeviceName = deviceName?.trim() || 'Recovered Primary Terminal';

    // 3. Register this device as the exclusive active session
    const sessionResult = await createSingleDeviceAdminSession({
      deviceId: resolvedDeviceId,
      deviceName: resolvedDeviceName,
      ipAddress,
      userAgent,
      forceReplace: true,
    });

    if (!sessionResult.success) {
      const errDetail = 'error' in sessionResult ? sessionResult.error : ('message' in sessionResult ? sessionResult.message : 'Failed to complete device recovery.');
      return NextResponse.json(
        { success: false, error: errDetail },
        { status: 500 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: 'All previous sessions terminated. This device is now registered as the exclusive Super Admin.',
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
    console.error('Device recovery error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error during device recovery.' },
      { status: 500 }
    );
  }
}
