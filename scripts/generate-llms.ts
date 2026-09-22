import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const LLMS_PATH = path.join(ROOT_DIR, 'public', 'llms.txt');
const REGISTRY_PATH = path.join(ROOT_DIR, 'registry.json');

const SITE_URL = 'https://easyui.site';

export function generateLlmsTxt(): void {
  let componentCount = 96;
  let componentList = '';

  if (fs.existsSync(REGISTRY_PATH)) {
    try {
      const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'));
      const items = registry.items || [];
      componentCount = items.length;

      // Group components by category or provide curated listing with clean links
      const sorted = [...items].sort((a: any, b: any) => (a.title || a.name).localeCompare(b.title || b.name));
      componentList = sorted
        .map((c: any) => `- [${c.title || c.name}](${SITE_URL}/components/${c.name}): ${c.description || 'Interactive React animated component.'}`)
        .join('\n');
    } catch (e: any) {
      console.warn(`Could not read registry for llms.txt: ${e.message}`);
    }
  }

  const content = `# EasyUI

> Production-ready, beautifully crafted animated UI components built with React, Tailwind CSS, and Framer Motion for modern web applications. Open source, copy-paste ownership with zero configuration via shadcn CLI.

## Documentation

- [Introduction](${SITE_URL}/docs/introduction): Core architecture, design philosophy, and component model.
- [Quick Start](${SITE_URL}/docs/quick-start): Installation, dependencies setup, and shadcn CLI integration.
- [Registry Architecture](${SITE_URL}/docs/architecture): Design tokens, monochrome color system, elevation surfaces, and registry sync engine.
- [Motion System](${SITE_URL}/docs/motion-system): Spring physics parameters, transition tokens, and reduced-motion accessibility guidelines.
- [Contributing Guide](${SITE_URL}/docs/collaboration): Building, validating, documenting, and publishing new components.
- [Automated SEO System](${SITE_URL}/docs/seo): Single source of truth metadata, dynamic sitemaps, JSON-LD schemas, and health audit engine.

## Components Directory

- [All Components Catalog](${SITE_URL}/components): Browse the full catalog of ${componentCount} animated React components.

### Component Index

${componentList}

## Resources

- [EasyUI Website](${SITE_URL}/): Official website and interactive live demos.
- [GitHub Repository](https://github.com/Surajmaurya1/easyui): Source code, issues, and contributions.
- [Component Registry](${SITE_URL}/registry.json): Standard shadcn/ui compatible registry definition.
- [Sitemap](${SITE_URL}/sitemap.xml): Search engine and crawler index of all public URLs.
`;

  fs.writeFileSync(LLMS_PATH, content.trim() + '\n', 'utf-8');
  console.log(`✓ Generated ${path.relative(ROOT_DIR, LLMS_PATH)} (${componentCount} components referenced)`);

  const distDir = path.join(ROOT_DIR, 'dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'llms.txt'), content.trim() + '\n', 'utf-8');
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  generateLlmsTxt();
}
