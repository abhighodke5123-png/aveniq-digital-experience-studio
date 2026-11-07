import { NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, invalidateCurrentAdminSession } from '@/lib/admin-auth';

export async function POST() {
  await invalidateCurrentAdminSession();

  const response = NextResponse.json({
    success: true,
    message: 'Super admin session terminated and logged out successfully.',
  });

  response.cookies.delete(ADMIN_COOKIE_NAME);
  return response;
}
