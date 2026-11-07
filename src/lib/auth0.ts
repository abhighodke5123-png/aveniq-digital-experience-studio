import { Auth0Client } from '@auth0/nextjs-auth0/server';

export const auth0 = new Auth0Client({
  domain: process.env.AUTH0_DOMAIN || 'dev-aveniq.us.auth0.com',
  clientId: process.env.AUTH0_CLIENT_ID || 'your_auth0_client_id_placeholder',
  clientSecret: process.env.AUTH0_CLIENT_SECRET || 'your_auth0_client_secret_placeholder',
  secret: process.env.AUTH0_SECRET || 'SP4mcfBt6IloRqQ7wgZnCbE1y0psx2zT',
  appBaseUrl: process.env.APP_BASE_URL || 'http://localhost:3000',
});