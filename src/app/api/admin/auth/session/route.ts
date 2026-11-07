import { NextResponse } from 'next/server';
import { checkAdminAuth, SUPER_ADMIN_USERNAME } from '@/lib/admin-auth';

export async function GET() {
  const authResult = await checkAdminAuth();

  if (!authResult.authenticated) {
    return NextResponse.json(
      {
        authenticated: false,
        code: authResult.code || 'UNAUTHORIZED',
        error: authResult.reason || 'Super Admin authorization required.',
      },
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      username: SUPER_ADMIN_USERNAME,
      role: 'Super Administrator',
    },
    activeDevice: authResult.activeDevice,
  });
}
