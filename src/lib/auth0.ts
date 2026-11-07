import { Auth0Client } from '@auth0/nextjs-auth0/server';

// Allowed origins for Auth0 redirect resolution and multi-domain support
const allowedBaseUrls = [
  'https://aveniq.in',
  'https://www.aveniq.in',
  'https://aveniq-digital-experience-studio.vercel.app',
  'https://aveniq-digital-experience-studio-derek21.vercel.app',
  'http://localhost:3000',
];

if (process.env.APP_BASE_URL && !allowedBaseUrls.includes(process.env.APP_BASE_URL)) {
  allowedBaseUrls.push(process.env.APP_BASE_URL);
}

if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
  const prodUrl = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (!allowedBaseUrls.includes(prodUrl)) {
    allowedBaseUrls.push(prodUrl);
  }
}

if (process.env.VERCEL_URL) {
  const vercelUrl = `https://${process.env.VERCEL_URL}`;
  if (!allowedBaseUrls.includes(vercelUrl)) {
    allowedBaseUrls.push(vercelUrl);
  }
}

export const auth0 = new Auth0Client({
  domain: process.env.AUTH0_DOMAIN || 'icfg-xtzsq7ngvlsp4aoe8kucbvbe.us.auth0.com',
  clientId: process.env.AUTH0_CLIENT_ID || 'HzfJ5iupaL5PRYZjMnuNMaLrwbHmnt6i',
  clientSecret: process.env.AUTH0_CLIENT_SECRET || 'placeholder_auth0_client_secret',
  secret: process.env.AUTH0_SECRET || 'SP4mcfBt6IloRqQ7wgZnCbE1y0psx2zT',
  appBaseUrl: allowedBaseUrls,
});
