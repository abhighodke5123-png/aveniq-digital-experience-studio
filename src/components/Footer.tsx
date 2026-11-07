import Link from 'next/link';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Healthcare Specialisation', href: '/healthcare' },
  { label: 'Selected Work', href: '/work' },
  { label: 'About Studio', href: '/about' },
  { label: 'Contact & Scoping', href: '/contact' },
  { label: 'Client Portal', href: '/portal' },
  { label: 'Privacy Policy', href: '#' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#17191D] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M16 3L4 28h5.5l2.8-6h7.4l2.8 6H28L16 3Z"
                  fill="#F7F6F2"
                />
                <path
                  d="M16 12l-3.2 7h6.4L16 12Z"
                  fill="#91A99B"
                />
              </svg>
              <Link href="/" className="font-heading text-2xl font-medium tracking-tight hover:text-white">
                AVENIQ.
              </Link>
            </div>
            <p className="text-sm text-[#777873] mt-3">Digital Experience Studio.</p>
            <p className="text-sm text-[#777873] italic mt-1">
              Designed to move business forward.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-mono text-[#777873]">
              <span className="px-2 py-1 bg-white/5 rounded">IN</span>
              <span className="px-2 py-1 bg-white/5 rounded">US</span>
              <span className="px-2 py-1 bg-white/5 rounded">UK</span>
              <span className="px-2 py-1 bg-white/5 rounded">AU</span>
              <span className="px-2 py-1 bg-white/5 rounded">CA</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#777873] mb-4">
              Explore Studio
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm text-[#999] transition-colors hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#777873] mb-4">
              Get in Touch
            </p>
            <a
              href="mailto:hello@aveniq.in"
              className="inline-flex items-center gap-2 text-sm text-[#999] transition-colors hover:text-[#91A99B]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              hello@aveniq.in
            </a>
            <a
              href="https://wa.me/91XXXXXXXXXX"
              className="flex items-center gap-2 text-sm text-[#999] mt-3 transition-colors hover:text-[#91A99B]"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.63c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29" />
              </svg>
              WhatsApp Priority Line
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[#2a2d33] text-[#999] transition-colors hover:text-[#91A99B] hover:border-[#91A99B]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[#2a2d33] text-[#999] transition-colors hover:text-[#91A99B] hover:border-[#91A99B]"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28M7.85 18.5V10.13H5.08v8.37h2.77z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#2a2d33]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#777873]">
            © {year} AVENIQ. All rights reserved.
          </p>
          <p className="text-xs text-[#777873]">
            Designed to move business forward.
          </p>
        </div>
      </div>
    </footer>
  );
}