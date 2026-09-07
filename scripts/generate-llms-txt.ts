import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { EASY_COMPONENTS } from '../src/components/registry/components-data';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const LLMS_PATH = path.join(ROOT_DIR, 'public', 'llms.txt');

const SITE_URL = 'https://easyui.site';

export function generateLlmsTxt(): void {
  let content = '# EasyUI\n\n';
  content += '> EasyUI is a collection of polished, copy-paste React UI components focused on beautiful interactions, animations, and micro-interactions.\n\n';

  content += '## Overview\n\n';
  content += '- **What EasyUI is**: A developer-first collection of interactive React components built with React 18/19, Tailwind CSS, and Framer Motion spring physics. You own the component code in your project without runtime package lock-in.\n';
  content += '- **Who it is for**: Frontend developers, full-stack engineers, and design-conscious teams building modern web apps who want polished micro-interactions and animations without starting from scratch.\n';
  content += '- **Main technologies**: React, TypeScript, Tailwind CSS, Framer Motion, Lucide React.\n';
  content += '- **Installation pattern**: Copy-paste or CLI add via shadcn CLI: `npx shadcn@latest add Surajmaurya1/easyui/<component-name>`.\n';
  content += '- **Source code repository**: https://github.com/Surajmaurya1/easyui\n';
  content += '- **Official website**: https://easyui.site\n';
  content += '- **License**: MIT License\n\n';

  content += '## Documentation\n\n';
  content += `- [Introduction](${SITE_URL}/docs/introduction): Core architecture, motion principles, and design system philosophy.\n`;
  content += `- [Quick Start](${SITE_URL}/docs/quick-start): Installation steps, Tailwind CSS setup, and adding your first animated component.\n`;
  content += `- [Architecture & Design Tokens](${SITE_URL}/docs/architecture): Monochrome surface tokens, spring physics curves, and design token specifications.\n`;
  content += `- [Motion System](${SITE_URL}/docs/motion-system): Framer Motion tokens, GPU hardware acceleration, and accessible prefers-reduced-motion support.\n`;
  content += `- [Library Comparison & Alternatives](${SITE_URL}/docs/comparison): Factual comparison between EasyUI, shadcn/ui, MUI, and Framer Motion primitives.\n`;
  content += `- [Automated SEO System](${SITE_URL}/docs/seo): Single source-of-truth metadata, dynamic sitemaps, JSON-LD schemas, and health auditing.\n`;
  content += `- [Contributing Guide](${SITE_URL}/docs/collaboration): Guide to building, documenting, and contributing new components.\n\n`;

  content += '## Component Categories\n\n';

  const categories = ['Buttons', 'Forms', 'Navigation', 'Feedback', 'Overlays', 'Motion', 'Auth'] as const;
  const catMap: Record<string, typeof EASY_COMPONENTS> = {};

  for (const c of EASY_COMPONENTS) {
    catMap[c.category] = catMap[c.category] || [];
    catMap[c.category].push(c);
  }

  for (const cat of categories) {
    const items = catMap[cat] || [];
    content += `### ${cat} (${items.length} components)\n\n`;
    for (const item of items) {
      content += `- [${item.name}](${SITE_URL}/components/${item.id}): ${item.description || item.tagline}\n`;
    }
    content += '\n';
  }

  content += '## CLI Installation Examples\n\n';
  content += '```bash\n';
  content += '# Add Magnetic Button\n';
  content += 'npx shadcn@latest add Surajmaurya1/easyui/magnetic-button\n\n';
  content += '# Add Spotlight Card\n';
  content += 'npx shadcn@latest add Surajmaurya1/easyui/spotlight-card\n\n';
  content += '# Add Animated Tabs\n';
  content += 'npx shadcn@latest add Surajmaurya1/easyui/animated-tabs\n\n';
  content += '# Add Morphing Dialog\n';
  content += 'npx shadcn@latest add Surajmaurya1/easyui/morphing-dialog\n';
  content += '```\n';

  fs.writeFileSync(LLMS_PATH, content, 'utf-8');
  console.log(`✓ Generated public/llms.txt (${EASY_COMPONENTS.length} components)`);

  const distDir = path.join(ROOT_DIR, 'dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'llms.txt'), content, 'utf-8');
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  generateLlmsTxt();
}
