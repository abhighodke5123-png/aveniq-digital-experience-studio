# AVENIQ — Digital Experience Studio

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/abhighodke5123-png/aveniq-digital-experience-studio&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,GEMINI_API_KEY,AUTH0_SECRET,AUTH0_BASE_URL,AUTH0_ISSUER_BASE_URL,AUTH0_CLIENT_ID,AUTH0_CLIENT_SECRET)

> **Designed to move business forward.**  
> An internationally recognised independent creative technology studio landing experience combining minimalist editorial design, clinical UX standards, and conversion-focused architecture.

---

## 🏛️ Brand & Architectural Identity

- **Brand Name**: AVENIQ
- **Category**: Digital Experience Studio
- **Primary Specialisation**: Healthcare & Hospital Website Development (OPD triage, 2-click doctor discovery, EHR sync, WhatsApp Cloud API).
- **Secondary Specialisation**: Complete digital solutions across Luxury Hospitality, High-End Real Estate, Education, and Tech Startups.
- **Design Language**: Minimal editorial typography (Manrope + Inter), generous architectural whitespace, subtle Framer Motion micro-interactions, WCAG 2.1 AA accessibility.

---

## 🚀 Live Integrations

### 1. ⚡ Supabase (Live Database & Lead Pipeline)
- **Table**: `public.leads`
- **Policies**: Row-Level Security (RLS) enabled for anonymous lead submission and authenticated studio management.
- **Auto-Sync**: The project scoping form on `/contact` transmits directly to Supabase with instant tracking reference generation (`AVQ-SB-...`).

### 2. 🧠 Google Gemini API (Studio Intelligence Engine)
- **Model**: `gemini-2.5-flash`
- **Endpoint**: `/api/ai-scoper`
- **Feature**: Interactive AI Architecture & Sprint Scoper on `/services`. Prospective clients describe their requirements and receive an instant technical blueprint, recommended stack, timeline estimate, and investment bracket. Includes deterministic studio heuristic fallback.

### 3. 🔥 Firebase (Secondary Telemetry & Audit Storage)
- **Service**: Cloud Firestore & Web App SDK
- **Handler**: `src/lib/firebase.ts` logs enquiry telemetry and secondary audit trail records seamlessly alongside Supabase.

### 4. 🔐 Auth0 (Client Portal SSO & Role-Based Access)
- **Route Guard**: `src/proxy.ts` (Next.js 16 Proxy Middleware) and `src/app/portal/page.tsx`.
- **SSO**: Supports enterprise identity providers with automatic redirect to Auth0 login and a resilient verification preview mode.

### 5. 🔍 Semrush Technical SEO & Rich Snippets
- **JSON-LD Schema**:
  - `ProfessionalService` & `Organization` on root layout
  - `MedicalWebPage` & `MedicalBusiness` on `/healthcare`
  - `FAQPage` schema on `/contact`
- **Sitemap & Robots**: Multi-page `public/sitemap.xml` and `public/robots.txt`.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16.4.5 (Turbopack, App Router)
- **Language**: TypeScript 5 (Strict Mode)
- **Styling**: Tailwind CSS v4 (`@theme` tokens)
- **Motion**: Framer Motion 14 (Reduced motion accessible)
- **Icons**: Lucide React + Custom Brand SVG Monogram
- **AI SDK**: `@google/genai`
- **Database**: `@supabase/supabase-js`
- **Backend / Auth**: `@auth0/nextjs-auth0` v4, Firebase 12

---

## 🏃 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local

# 3. Start development server
npm run dev

# 4. Production verification build
npm run build
npm run start
```

---

## 🧭 Page Architecture

- `/` — Homepage with all 14 core studio sections and interactive portfolio concepts.
- `/services` — 5-pillar capability matrix, project sprint timeline calculator, and Gemini AI Scoper.
- `/healthcare` — Dark clinical specialization portal with interactive 3-step OPD appointment triage prototype.
- `/work` — Sector-filtered concept portfolio archive with architectural blueprint inspection modal.
- `/about` — Studio narrative, 4 core principles, and 5-continent global delivery model.
- `/contact` — Project scoping studio with budget brackets, live Supabase transmission, and client FAQs.
- `/portal` — Protected client workspace with milestone deliverables and studio directory.
- `/api/enquiry` — Honeypot-shielded endpoint with Supabase and Firebase pipeline sync.
- `/api/ai-scoper` — Gemini AI technical scoping and sprint analysis engine.

---

## 📜 License & Ownership

Code & Design System © 2026 AVENIQ Studio. All rights reserved.