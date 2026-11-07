import { NextResponse } from 'next/server';
import { isAuthenticatedAdmin, SUPER_ADMIN_USERNAME } from '@/lib/admin-auth';

export async function GET() {
  const isAuth = await isAuthenticatedAdmin();

  if (!isAuth) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      username: SUPER_ADMIN_USERNAME,
      role: 'Super Administrator',
    },
  });
}
