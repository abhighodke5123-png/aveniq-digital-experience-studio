import { serviceCatalog, portfolioProjects, clinicalDepartments, clientFaqs } from './catalog';
import type { WebsiteContent } from '@/types/content';

export const initialWebsiteContent: WebsiteContent = {
  brandName: 'AVENIQ',
  hero: {
    eyebrow: 'Independent Digital Experience Studio',
    headline: 'Your next stage of growth starts with a better digital presence.',
    description: 'We design and build high-performance digital experiences that help businesses attract, engage and convert their audiences.',
    primaryCtaText: 'Start a Project ↗',
    primaryCtaHref: '/contact',
    secondaryCtaText: 'Explore Our Work ↓',
    secondaryCtaHref: '/work',
    bottomDescriptor: 'Strategy / Design / Technology / Growth',
  },
  introduction: {
    eyebrow: 'Studio Philosophy',
    headline: 'Good businesses deserve better digital experiences.',
    paragraph1: 'Your website is more than an online presence. It is where people discover your business, understand your value and decide to take the next step.',
    paragraph2: 'At AVENIQ, we bring together thoughtful design, intelligent technology and business-focused strategy to create digital experiences that make a meaningful difference.',
  },
  services: serviceCatalog,
  projects: portfolioProjects,
  healthcare: {
    badge: 'Speciality Focus',
    headline: 'Modern digital experiences for healthcare and medical practices.',
    description: 'Healthcare websites require a distinct standard of care. They need to inform, build trust, and guide patients to the right care without friction.',
    stat1Value: '99.4/100',
    stat1Label: 'Mobile Core Web Vitals',
    stat2Value: '64%',
    stat2Label: 'Drop in Patient Call Bottlenecks',
    stat3Value: '100%',
    stat3Label: 'Direct WhatsApp Triage Sync',
    features: [
      'Modern hospital websites',
      'Doctor and specialist profiles',
      'Department and speciality pages',
      'Appointment enquiry systems',
      'WhatsApp integration',
      'Patient information pages',
      'Local SEO',
      'Mobile-first experiences',
    ],
    departments: clinicalDepartments,
  },
  faqs: clientFaqs,
  contact: {
    email: 'hello@aveniq.in',
    phone: '+91 91754 00000',
    address: 'Studio HQ — Digital Experience Architecture, Global Delivery (IN / US / UK)',
    whatsappNotice: 'WhatsApp Priority Line Active for Direct Scoping',
    statusBadge: 'Q2 2026 Studio Slots Open',
  },
};
