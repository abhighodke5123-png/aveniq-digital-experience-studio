export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'AVENIQ',
    legalName: 'AVENIQ Digital Experience Studio',
    url: 'https://aveniq.in',
    logo: 'https://aveniq.in/icon.png',
    image: 'https://aveniq.in/og-image.jpg',
    description:
      'AVENIQ is an independent creative technology studio helping ambitious businesses and hospital networks transform their digital presence through premium website design, clinical UX, high-performance engineering, and intelligent automation.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    areaServed: ['IN', 'US', 'GB', 'AU', 'CA'],
    knowsAbout: [
      'Healthcare Website Development',
      'Hospital Triage Portals',
      'Next.js Web Applications',
      'Brand & Creative Strategy',
      'Search Engine Optimisation (SEO)',
      'WhatsApp Automation & EHR Integrations',
    ],
    sameAs: [
      'https://linkedin.com',
      'https://instagram.com',
      'https://github.com/abhighodke5123-png',
    ],
    priceRange: '$$$$',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Client Strategy & Project Enquiries',
      email: 'hello@aveniq.in',
      url: 'https://aveniq.in/contact',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function MedicalSpecialisationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'Healthcare Website & Hospital Digital Solutions | AVENIQ',
    description:
      'Specialised hospital digital ecosystem design: 2-click doctor directories, friction-free OPD appointment triage, WhatsApp integrations, and NABL-accredited diagnostic report downloads.',
    publisher: {
      '@type': 'Organization',
      name: 'AVENIQ',
      url: 'https://aveniq.in',
    },
    about: {
      '@type': 'MedicalBusiness',
      name: 'AVENIQ Healthcare Digital Solutions',
      medicalSpecialty: [
        'Cardiovascular',
        'Orthopedic',
        'Dentistry',
        'Neurology',
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FaqJsonLd({
  faqs,
}: {
  faqs: { q: string; a: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}