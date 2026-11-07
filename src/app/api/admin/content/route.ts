import { NextResponse } from 'next/server';
import { initialWebsiteContent } from '@/data/initial-content';
import { supabase } from '@/lib/supabase';
import { checkAdminAuth } from '@/lib/admin-auth';
import type { WebsiteContent } from '@/types/content';

// In-memory runtime cache for high-speed edge delivery
let runtimeContentCache: WebsiteContent | null = null;

export async function GET() {
  try {
    if (runtimeContentCache) {
      return NextResponse.json({ success: true, content: runtimeContentCache, source: 'cache' });
    }

    const { data, error } = await supabase
      .from('website_settings')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1);

    if (!error && data && data.length > 0 && data[0].content_json) {
      runtimeContentCache = data[0].content_json as WebsiteContent;
      return NextResponse.json({ success: true, content: runtimeContentCache, source: 'database' });
    }

    return NextResponse.json({
      success: true,
      content: initialWebsiteContent,
      source: 'defaults',
    });
  } catch (err) {
    console.warn('API get content fallback note:', err);
    return NextResponse.json({
      success: true,
      content: runtimeContentCache || initialWebsiteContent,
      source: 'fallback',
    });
  }
}

export async function POST(req: Request) {
  try {
    const authResult = await checkAdminAuth();
    if (!authResult.authenticated) {
      return NextResponse.json(
        {
          success: false,
          code: authResult.code || 'UNAUTHORIZED',
          error: authResult.reason || 'Unauthorized. Super Admin login required.',
        },
        { status: 401 }
      );
    }

    const body = (await req.json()) as WebsiteContent;
    if (!body || !body.hero) {
      return NextResponse.json(
        { success: false, error: 'Invalid content payload provided.' },
        { status: 400 }
      );
    }

    // Update in-memory cache immediately
    runtimeContentCache = body;

    // Persist to Supabase website_settings
    try {
      const { data: existingRows } = await supabase
        .from('website_settings')
        .select('id')
        .limit(1);

      const targetId = existingRows?.[0]?.id;

      if (targetId) {
        await supabase
          .from('website_settings')
          .update({
            brand_name: body.brandName || 'AVENIQ',
            tagline: body.hero.eyebrow || 'Bespoke Digital Experience Studio',
            hero_headline: body.hero.headline,
            contact_email: body.contact.email,
            whatsapp_number: body.contact.phone,
            content_json: body,
            updated_by: 'abhighodke5123@admin',
            updated_at: new Date().toISOString(),
          })
          .eq('id', targetId);
      } else {
        await supabase.from('website_settings').insert([
          {
            brand_name: body.brandName || 'AVENIQ',
            tagline: body.hero.eyebrow || 'Bespoke Digital Experience Studio',
            hero_headline: body.hero.headline,
            contact_email: body.contact.email,
            whatsapp_number: body.contact.phone,
            primary_geography: 'India & Global',
            content_json: body,
            updated_by: 'abhighodke5123@admin',
            updated_at: new Date().toISOString(),
          },
        ]);
      }
    } catch (dbErr) {
      console.warn('Supabase website_settings persistence warning:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Website content updated and published live across all pages.',
      lastUpdated: body.lastUpdated || new Date().toISOString(),
    });
  } catch (err) {
    console.error('API update content error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error while saving content.' },
      { status: 500 }
    );
  }
}
