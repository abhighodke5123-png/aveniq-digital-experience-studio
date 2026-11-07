import type { ServiceDetail, DetailedProject, ClinicalDepartment, FaqItem } from './index';

export interface SiteHeroContent {
  eyebrow: string;
  headline: string;
  description: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  bottomDescriptor: string;
}

export interface SiteIntroductionContent {
  eyebrow: string;
  headline: string;
  paragraph1: string;
  paragraph2: string;
}

export interface SiteContactContent {
  email: string;
  phone: string;
  address: string;
  whatsappNotice: string;
  statusBadge: string;
}

export interface SiteHealthcareContent {
  badge: string;
  headline: string;
  description: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  features: string[];
  departments: ClinicalDepartment[];
}

export interface WebsiteContent {
  brandName: string;
  hero: SiteHeroContent;
  introduction: SiteIntroductionContent;
  services: ServiceDetail[];
  projects: DetailedProject[];
  healthcare: SiteHealthcareContent;
  faqs: FaqItem[];
  contact: SiteContactContent;
  lastUpdated?: string;
  updatedBy?: string;
}
