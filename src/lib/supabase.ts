import { createClient } from '@supabase/supabase-js';

// Production Supabase Project (pikgvqzvainywbfdlusv)
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pikgvqzvainywbfdlusv.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpa2d2cXp2YWlueXdiZmRsdXN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM4MTYzMzAsImV4cCI6MjEwOTM5MjMzMH0.iBEAIKS3pEER10n70U8FpmCFzAI9IRaOCclCtZA51DY';

export const supabase = createClient(
  SUPABASE_URL.includes('pikgvqzvainywbfdlusv') ? SUPABASE_URL : 'https://pikgvqzvainywbfdlusv.supabase.co',
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false,
    },
  }
);

export interface SupabaseLeadRecord {
  full_name: string;
  business_name?: string;
  email: string;
  phone?: string;
  country?: string;
  interested_service?: string;
  budget_range?: string;
  timeline?: string;
  project_description: string;
  status?: 'New' | 'Contacted' | 'Qualified' | 'Proposal Sent' | 'Converted' | 'Closed';
  source?: string;
}

/**
 * Saves project enquiry lead to Supabase 'leads' table.
 * Adheres strictly to anonymous RLS INSERT policy: status='New', full_name >= 2, project_description >= 15.
 * Note: Anon role has INSERT permission without SELECT, so we do not chain .select() to prevent RLS denial.
 */
export async function saveLeadToSupabase(lead: SupabaseLeadRecord): Promise<{ success: boolean; error?: string }> {
  try {
    const description = lead.project_description && lead.project_description.length >= 15
      ? lead.project_description
      : `${lead.project_description || 'Website project enquiry'} [Direct inquiry via AVENIQ portal]`;

    const { error } = await supabase.from('leads').insert([
      {
        full_name: lead.full_name,
        business_name: lead.business_name || null,
        email: lead.email,
        phone: lead.phone || null,
        country: lead.country || 'Global',
        interested_service: lead.interested_service || 'Digital Experiences',
        budget_range: lead.budget_range || '$15,000 — $35,000',
        timeline: lead.timeline || 'Standard (6 — 8 Weeks)',
        project_description: description,
        status: 'New',
        source: lead.source || 'AVENIQ Web Form',
      },
    ]);

    if (error) {
      console.warn('Supabase lead insert note:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown database error';
    console.warn('Supabase exception:', msg);
    return { success: false, error: msg };
  }
}
