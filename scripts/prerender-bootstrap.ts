import { loadEnv } from 'vite';

// Load Vite's .env files before importing the app, so prerendered sponsorship
// CTAs use the same validated links as the browser bundle.
const mode = process.env.NODE_ENV || 'production';
const env = loadEnv(mode, process.cwd(), 'NEXT_PUBLIC_');
for (const [key, value] of Object.entries(env)) {
  process.env[key] ??= value;
}

const { prerenderAllRoutes } = await import('./prerender');
await prerenderAllRoutes();
