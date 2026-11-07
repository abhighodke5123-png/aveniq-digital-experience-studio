export type IndustrySector =
  | 'Healthcare'
  | 'Hospitality'
  | 'Real Estate'
  | 'Technology'
  | 'Education'
  | 'Professional Services'
  | 'Startups & Retail';

export interface ServiceDetail {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  idealFor: string;
}

export interface DetailedProject {
  id: string;
  title: string;
  client: string;
  industry: 'Healthcare' | 'Hospitality' | 'Real Estate' | 'Technology';
  year: string;
  summary: string;
  challenge: string;
  solution: string;
  impactMetrics: string[];
  techStack: string[];
  accentColor: string;
  layoutBlueprint: {
    heroHeading: string;
    subheading: string;
    keyFeature1: string;
    keyFeature2: string;
  };
}

export interface ClinicalDepartment {
  name: string;
  doctorCount: number;
  avgWait: string;
  leadSpecialist: string;
  speciality: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface EnquiryPayload {
  name: string;
  email: string;
  business?: string;
  phone?: string;
  country?: string;
  service: string;
  budget?: string;
  timeline?: string;
  description?: string;
  _hp?: string;
}

export interface EnquiryResponse {
  success: boolean;
  message: string;
  enquiryId?: string;
  timestamp: string;
}