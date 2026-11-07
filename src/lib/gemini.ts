import { GoogleGenAI } from '@google/genai';

export interface ScopingAnalysis {
  projectTitle: string;
  recommendedArchitecture: string[];
  estimatedTimelineWeeks: number;
  complexityTier: 'Focused Sprint' | 'Mid-Scale Custom' | 'Enterprise Clinical';
  recommendedServices: string[];
  strategicInsights: string;
  keyDeliverables: string[];
  estimatedBudgetBracket: string;
}

const GEMINI_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '';

export async function analyzeProjectScopeWithGemini(brief: {
  service: string;
  description: string;
  industry?: string;
}): Promise<ScopingAnalysis> {
  if (GEMINI_KEY) {
    try {
      const ai = new GoogleGenAI({ apiKey: GEMINI_KEY });
      const prompt = `You are the Lead Creative Director and Principal Cloud Architect at AVENIQ, an internationally recognised independent creative technology studio specialising in healthcare web development and premium digital experiences.
Analyze the following project brief and respond with pure JSON only matching this schema:
{
  "projectTitle": "short editorial title",
  "recommendedArchitecture": ["tech 1", "tech 2", "tech 3"],
  "estimatedTimelineWeeks": number,
  "complexityTier": "Focused Sprint" | "Mid-Scale Custom" | "Enterprise Clinical",
  "recommendedServices": ["service 1", "service 2"],
  "strategicInsights": "2-3 concise strategic recommendations for commercial/clinical conversion",
  "keyDeliverables": ["deliverable 1", "deliverable 2", "deliverable 3"],
  "estimatedBudgetBracket": "$15,000 — $35,000"
}

Client service focus: ${brief.service}
Industry: ${brief.industry || 'General Business'}
Client brief: ${brief.description}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = response.text?.trim() || '';
      const cleanJson = text.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      const parsed = JSON.parse(cleanJson) as ScopingAnalysis;
      return parsed;
    } catch (err) {
      console.warn('Gemini API call failed, falling back to studio heuristic engine:', err);
    }
  }

  return getStudioHeuristicAnalysis(brief);
}

function getStudioHeuristicAnalysis(brief: {
  service: string;
  description: string;
  industry?: string;
}): ScopingAnalysis {
  const isHealthcare =
    brief.service.toLowerCase().includes('hospital') ||
    brief.service.toLowerCase().includes('clinic') ||
    brief.description.toLowerCase().includes('patient') ||
    brief.description.toLowerCase().includes('doctor');

  if (isHealthcare) {
    return {
      projectTitle: 'Enterprise Clinical Digital Experience & Patient Triage Portal',
      recommendedArchitecture: [
        'Next.js 16 (Turbopack + App Router)',
        'TypeScript & Tailwind CSS v4',
        'Supabase PostgreSQL with RLS',
        'WhatsApp Cloud API Webhooks',
        'Auth0 Enterprise HIPAA/GDPR Access',
      ],
      estimatedTimelineWeeks: 8,
      complexityTier: 'Enterprise Clinical',
      recommendedServices: [
        '01 — Digital Experiences (Clinical Web System)',
        '03 — Search & Growth (Local 3-Pack Hospital SEO)',
        '04 — AI & Automation (Automated WhatsApp Triage)',
      ],
      strategicInsights:
        'Prioritise a 2-click doctor discovery taxonomy and friction-free OPD triage. Medical conversion spikes when doctor credentials and department wait-times are transparent before appointment submission.',
      keyDeliverables: [
        'Doctor & Specialist Directory with Filter Engine',
        'Direct WhatsApp & HIS Appointment Triage Workflow',
        'Local SEO Authority & Schema.org MedicalBusiness',
        'Sub-second Mobile Performance Optimization',
      ],
      estimatedBudgetBracket: '$35,000 — $75,000',
    };
  }

  return {
    projectTitle: 'Bespoke Brand Experience & High-Performance Growth Platform',
    recommendedArchitecture: [
      'Next.js 16 App Router',
      'Tailwind CSS v4 & Framer Motion',
      'Vercel Edge Global CDN',
      'Supabase Lead Pipeline',
    ],
    estimatedTimelineWeeks: 6,
    complexityTier: 'Mid-Scale Custom',
    recommendedServices: [
      '01 — Digital Experiences (Custom Web App)',
      '02 — Brand & Creative (Design System & Tokens)',
      '03 — Search & Growth (Conversion Rate Optimization)',
    ],
    strategicInsights:
      'Emphasize editorial typography and architectural compositions over generic SaaS templates. Lead capture rates increase when users encounter clear case studies and instant project scoping calculators.',
    keyDeliverables: [
      'Editorial Brand Design System & Figma Tokens',
      'High-Conversion Responsive Next.js Web Experience',
      'Interactive Client Scoping & Quotation Matrix',
      'SEO & Performance Optimization (95+ Core Web Vitals)',
    ],
    estimatedBudgetBracket: '$15,000 — $35,000',
  };
}