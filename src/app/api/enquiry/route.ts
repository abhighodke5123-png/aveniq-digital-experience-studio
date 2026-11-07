import { NextResponse } from 'next/server';
import type { EnquiryPayload, EnquiryResponse } from '@/types';
import { saveLeadToSupabase } from '@/lib/supabase';
import { logFirebaseEnquiry } from '@/lib/firebase';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body: EnquiryPayload = await request.json();

    // 1. Anti-spam honeypot verification
    if (body._hp && body._hp.trim() !== '') {
      return NextResponse.json<EnquiryResponse>(
        {
          success: false,
          message: 'Spam validation triggered.',
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    // 2. Field validation
    const name = body.name?.trim();
    const email = body.email?.trim();
    const service = body.service?.trim();

    if (!name || name.length < 2) {
      return NextResponse.json<EnquiryResponse>(
        {
          success: false,
          message: 'Full Name is required and must be at least 2 characters.',
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json<EnquiryResponse>(
        {
          success: false,
          message: 'A valid business email address is required.',
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    if (!service) {
      return NextResponse.json<EnquiryResponse>(
        {
          success: false,
          message: 'Interested service must be specified.',
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    const generatedId = `AVQ-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // 3. Supabase Integration (Live DB Insertion)
    const sbResult = await saveLeadToSupabase({
      full_name: name,
      business_name: body.business?.trim(),
      email,
      phone: body.phone?.trim(),
      country: body.country?.trim() || 'Global',
      interested_service: service,
      budget_range: body.budget,
      timeline: body.timeline,
      project_description: body.description?.trim() || 'Direct inquiry via AVENIQ scoping studio',
      status: 'New',
      source: 'AVENIQ Web Form',
    });

    // 4. Firebase Event Logging (Secondary Firestore & Telemetry Sync)
    await logFirebaseEnquiry({
      enquiryId: generatedId,
      supabaseSaved: sbResult.success,
      name,
      email,
      service,
      timestamp: new Date().toISOString(),
    }).catch(() => null);

    const trackingId = sbResult.success ? `AVQ-SB-${generatedId.split('-')[1]}` : generatedId;

    return NextResponse.json<EnquiryResponse>(
      {
        success: true,
        message: 'Your project enquiry has been successfully logged with the studio directors.',
        enquiryId: trackingId,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown server error';
    console.error('Enquiry API Error:', errorMsg);
    return NextResponse.json<EnquiryResponse>(
      {
        success: false,
        message: 'Failed to process enquiry. Please contact hello@aveniq.in directly.',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
