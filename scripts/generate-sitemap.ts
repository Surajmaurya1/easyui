import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const SITEMAP_PATH = path.join(ROOT_DIR, 'public', 'sitemap.xml');
const REGISTRY_PATH = path.join(ROOT_DIR, 'registry.json');

const SITE_URL = 'https://easyui.site';

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

export function generateSitemap(): void {
  const today = new Date().toISOString().split('T')[0];

  const entries: SitemapEntry[] = [
    // 1. Homepage
    {
      loc: `${SITE_URL}/`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '1.0',
    },
    // 2. All Components Directory
    {
      loc: `${SITE_URL}/components`,
      lastmod: today,
      changefreq: 'daily',
      priority: '0.9',
    },
    // 3. Documentation Topics
    {
      loc: `${SITE_URL}/docs/introduction`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.85',
    },
    {
      loc: `${SITE_URL}/docs/quick-start`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.85',
    },
    {
      loc: `${SITE_URL}/docs/architecture`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.80',
    },
    {
      loc: `${SITE_URL}/docs/motion-system`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.80',
    },
    {
      loc: `${SITE_URL}/docs/collaboration`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.75',
    },
    {
      loc: `${SITE_URL}/docs/seo`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.80',
    },
  ];

  // 4. Read registry.json for all components
  if (fs.existsSync(REGISTRY_PATH)) {
    try {
      const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'));
      const items = registry.items || [];

      // Add component pagination pages if > 10 items
      const totalPages = Math.ceil(items.length / 10);
      for (let p = 2; p <= totalPages; p++) {
        entries.push({
          loc: `${SITE_URL}/components?page=${p}`,
          lastmod: today,
          changefreq: 'weekly',
          priority: '0.80',
        });
      }

      // Add each component
      for (const item of items) {
        if (item.name) {
          entries.push({
            loc: `${SITE_URL}/components/${item.name}`,
            lastmod: today,
            changefreq: 'weekly',
            priority: '0.85',
          });
        }
      }
    } catch (e: any) {
      console.warn(`Could not parse registry for sitemap: ${e.message}`);
    }
  }

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  fs.writeFileSync(SITEMAP_PATH, xml, 'utf-8');
  console.log(`✓ Generated sitemap.xml with ${entries.length} URLs at public/sitemap.xml`);

  // Also copy to dist if dist directory exists
  const distDir = path.join(ROOT_DIR, 'dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf-8');
  }
}

// Allow direct CLI invocation
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  console.log('🗺️ EasyUI Dynamic Sitemap Generator');
  console.log('------------------------------------');
  generateSitemap();
  console.log('✨ Sitemap generation completed!');
}
