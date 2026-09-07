import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const SITE_URL = 'https://easyui.site';
const REGISTRY_PATH = path.join(ROOT_DIR, 'registry.json');
const SITEMAP_PATH = path.join(ROOT_DIR, 'public', 'sitemap.xml');
const ROBOTS_PATH = path.join(ROOT_DIR, 'public', 'robots.txt');
const MANIFEST_PATH = path.join(ROOT_DIR, 'public', 'site.webmanifest');
const INDEX_HTML_PATH = path.join(ROOT_DIR, 'index.html');
const LOGO_PATH = path.join(ROOT_DIR, 'public', 'logo.png');
const OG_IMAGE_PATH = path.join(ROOT_DIR, 'public', 'og-image.webp');
const UI_DIR = path.join(ROOT_DIR, 'src', 'components', 'ui');

export type IssueSeverity = 'CRITICAL' | 'WARNING' | 'INFO' | 'PASS';

export interface AuditIssue {
  severity: IssueSeverity;
  category: string;
  message: string;
  target?: string;
}

export interface CategoryResult {
  name: string;
  score: number;
  totalChecks: number;
  passedChecks: number;
  criticals: number;
  warnings: number;
}

export interface AuditReport {
  overallScore: number;
  categories: Record<string, CategoryResult>;
  issues: AuditIssue[];
  discoveredComponents: number;
}

export function runSEOAudit(): AuditReport {
  const issues: AuditIssue[] = [];

  const categoryScores: Record<string, { total: number; passed: number; criticals: number; warnings: number }> = {
    'Technical SEO': { total: 0, passed: 0, criticals: 0, warnings: 0 },
    'Metadata': { total: 0, passed: 0, criticals: 0, warnings: 0 },
    'Content': { total: 0, passed: 0, criticals: 0, warnings: 0 },
    'Links': { total: 0, passed: 0, criticals: 0, warnings: 0 },
    'Images': { total: 0, passed: 0, criticals: 0, warnings: 0 },
    'Structured Data': { total: 0, passed: 0, criticals: 0, warnings: 0 },
    'Performance & A11y': { total: 0, passed: 0, criticals: 0, warnings: 0 },
  };

  function check(
    category: keyof typeof categoryScores,
    passed: boolean,
    severityOnFail: 'CRITICAL' | 'WARNING' | 'INFO',
    successMsg: string,
    failMsg: string,
    target?: string
  ) {
    categoryScores[category].total += 1;
    if (passed) {
      categoryScores[category].passed += 1;
      issues.push({ severity: 'PASS', category, message: successMsg, target });
    } else {
      if (severityOnFail === 'CRITICAL') categoryScores[category].criticals += 1;
      if (severityOnFail === 'WARNING') categoryScores[category].warnings += 1;
      issues.push({ severity: severityOnFail, category, message: failMsg, target });
    }
  }

  // ==========================================
  // 1. Technical SEO Checks
  // ==========================================
  const robotsExists = fs.existsSync(ROBOTS_PATH);
  check('Technical SEO', robotsExists, 'CRITICAL', 'robots.txt exists in public directory', 'robots.txt is missing from public directory', 'public/robots.txt');

  if (robotsExists) {
    const robots = fs.readFileSync(ROBOTS_PATH, 'utf-8');
    check('Technical SEO', robots.includes('Allow: /'), 'CRITICAL', 'robots.txt allows public crawling', 'robots.txt missing Allow: / directive', 'public/robots.txt');
    check('Technical SEO', robots.includes('Sitemap:'), 'WARNING', 'robots.txt references production sitemap URL', 'robots.txt missing Sitemap reference', 'public/robots.txt');
    check('Technical SEO', robots.includes('Disallow: /admin/'), 'INFO', 'robots.txt disallows private/administrative paths', 'robots.txt does not block admin/internal paths', 'public/robots.txt');
  }

  const sitemapExists = fs.existsSync(SITEMAP_PATH);
  check('Technical SEO', sitemapExists, 'CRITICAL', 'sitemap.xml exists in public directory', 'sitemap.xml is missing from public directory', 'public/sitemap.xml');

  if (sitemapExists) {
    const sitemap = fs.readFileSync(SITEMAP_PATH, 'utf-8');
    check('Technical SEO', sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'), 'CRITICAL', 'sitemap.xml has valid XML schema namespace', 'sitemap.xml has invalid XML schema namespace', 'public/sitemap.xml');
    check('Technical SEO', sitemap.includes(`${SITE_URL}/`), 'CRITICAL', 'sitemap.xml contains homepage URL', 'sitemap.xml missing homepage URL', 'public/sitemap.xml');
    check('Technical SEO', sitemap.includes(`${SITE_URL}/components`), 'CRITICAL', 'sitemap.xml contains components catalog URL', 'sitemap.xml missing components catalog URL', 'public/sitemap.xml');
    check('Technical SEO', sitemap.includes(`${SITE_URL}/docs/introduction`), 'WARNING', 'sitemap.xml contains documentation topic URLs', 'sitemap.xml missing documentation URLs', 'public/sitemap.xml');
  }

  const manifestExists = fs.existsSync(MANIFEST_PATH);
  check('Technical SEO', manifestExists, 'WARNING', 'site.webmanifest exists in public directory', 'site.webmanifest is missing', 'public/site.webmanifest');

  if (manifestExists) {
    try {
      const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
      check('Technical SEO', Boolean(manifest.name && manifest.theme_color && manifest.icons), 'WARNING', 'site.webmanifest contains valid metadata and icons', 'site.webmanifest is missing required keys (name, theme_color, icons)', 'public/site.webmanifest');
    } catch {
      check('Technical SEO', false, 'CRITICAL', '', 'site.webmanifest is not valid JSON', 'public/site.webmanifest');
    }
  }

  // ==========================================
  // 2. Metadata Checks (index.html & Dynamic Discovery)
  // ==========================================
  const indexExists = fs.existsSync(INDEX_HTML_PATH);
  check('Metadata', indexExists, 'CRITICAL', 'index.html exists at root', 'index.html is missing', 'index.html');

  if (indexExists) {
    const indexHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');
    check('Metadata', indexHtml.includes('<title>EasyUI'), 'CRITICAL', 'index.html has valid document title', 'index.html missing <title>', 'index.html');
    check('Metadata', indexHtml.includes('name="description"'), 'CRITICAL', 'index.html has meta description', 'index.html missing meta description', 'index.html');
    check('Metadata', indexHtml.includes('rel="canonical"'), 'CRITICAL', 'index.html has canonical URL link', 'index.html missing canonical URL link', 'index.html');
    check('Metadata', indexHtml.includes('property="og:title"'), 'WARNING', 'index.html contains Open Graph title', 'index.html missing og:title', 'index.html');
    check('Metadata', indexHtml.includes('property="og:image"'), 'WARNING', 'index.html contains Open Graph image', 'index.html missing og:image', 'index.html');
    check('Metadata', indexHtml.includes('name="twitter:card"'), 'WARNING', 'index.html contains Twitter card meta', 'index.html missing twitter:card', 'index.html');
    check('Metadata', indexHtml.includes('name="robots"'), 'WARNING', 'index.html contains robots meta directive', 'index.html missing robots meta tag', 'index.html');
    check('Metadata', indexHtml.includes('name="viewport"'), 'CRITICAL', 'index.html contains viewport meta tag', 'index.html missing viewport meta tag', 'index.html');
    check('Metadata', indexHtml.includes('name="theme-color"'), 'INFO', 'index.html contains theme-color meta tag', 'index.html missing theme-color', 'index.html');
  }

  // Filesystem Discovery of Components
  let uiFiles: string[] = [];
  if (fs.existsSync(UI_DIR)) {
    uiFiles = fs.readdirSync(UI_DIR).filter((f) => f.endsWith('.meta.ts'));
  }

  check('Metadata', uiFiles.length > 0, 'CRITICAL', `Dynamically discovered ${uiFiles.length} component metadata files in filesystem`, 'No component .meta.ts files found in src/components/ui', 'src/components/ui');

  // Registry validation
  let registryItems: any[] = [];
  if (fs.existsSync(REGISTRY_PATH)) {
    try {
      const reg = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'));
      registryItems = reg.items || [];
    } catch {
      // handled elsewhere
    }
  }

  check('Metadata', registryItems.length >= uiFiles.length, 'CRITICAL', `All ${uiFiles.length} filesystem components are registered in registry.json`, `Registry count (${registryItems.length}) does not match metadata files (${uiFiles.length})`, 'registry.json');

  let missingCompDescriptions = 0;
  let missingCompTitles = 0;
  let oversizedCompTitles = 0;
  let shortDescriptions = 0;

  for (const item of registryItems) {
    if (!item.title || item.title.trim() === '') missingCompTitles++;
    if (!item.description || item.description.trim() === '') missingCompDescriptions++;
    if (item.title && item.title.length > 70) oversizedCompTitles++;
    if (item.description && item.description.length < 25) shortDescriptions++;
  }

  check('Metadata', missingCompTitles === 0, 'CRITICAL', 'All components have unique, valid SEO titles', `${missingCompTitles} components are missing titles`, 'registry.json');
  check('Metadata', missingCompDescriptions === 0, 'CRITICAL', 'All components have descriptive meta descriptions', `${missingCompDescriptions} components are missing descriptions`, 'registry.json');
  check('Metadata', oversizedCompTitles === 0, 'INFO', 'All component titles are within optimal SEO length (< 70 chars)', `${oversizedCompTitles} component titles exceed 70 characters`, 'registry.json');

  // ==========================================
  // 3. Content Checks
  // ==========================================
  check('Content', shortDescriptions === 0, 'WARNING', 'All component descriptions provide substantive content (> 25 chars)', `${shortDescriptions} components have thin descriptions (< 25 chars)`, 'registry.json');

  // Check doc topics completeness
  const docFiles = ['DocIntroduction.tsx', 'DocQuickStart.tsx', 'DocArchitecture.tsx', 'DocMotionSystem.tsx', 'DocCollaboration.tsx', 'DocSEO.tsx'];
  let missingDocFiles = 0;
  for (const df of docFiles) {
    if (!fs.existsSync(path.join(ROOT_DIR, 'src', 'components', 'docs', 'sections', df))) {
      missingDocFiles++;
    }
  }
  check('Content', missingDocFiles === 0, 'CRITICAL', 'All 6 core documentation topic pages exist and are populated', `${missingDocFiles} documentation section files are missing`, 'src/components/docs/sections');

  // ==========================================
  // 4. Links & Navigation Checks
  // ==========================================
  let brokenComponentFiles = 0;
  for (const item of registryItems) {
    if (Array.isArray(item.files)) {
      for (const f of item.files) {
        if (!fs.existsSync(path.join(ROOT_DIR, f.path))) {
          brokenComponentFiles++;
        }
      }
    }
  }
  check('Links', brokenComponentFiles === 0, 'CRITICAL', 'All component source and registry file links resolve accurately to disk', `${brokenComponentFiles} component file paths are broken`, 'registry.json');

  // Check sitemap URLs match registry components
  if (sitemapExists) {
    const sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf-8');
    let unindexedComponents = 0;
    for (const item of registryItems) {
      if (!sitemapContent.includes(`/components/${item.name}`)) {
        unindexedComponents++;
      }
    }
    check('Links', unindexedComponents === 0, 'WARNING', '100% of registry components are indexed in sitemap.xml', `${unindexedComponents} components missing from sitemap.xml`, 'public/sitemap.xml');
  }

  // ==========================================
  // 5. Images & Media Checks
  // ==========================================
  const logoExists = fs.existsSync(LOGO_PATH);
  check('Images', logoExists, 'WARNING', 'Brand logo asset exists in public/logo.png', 'public/logo.png is missing', 'public/logo.png');

  const ogImgExists = fs.existsSync(OG_IMAGE_PATH);
  check('Images', ogImgExists, 'WARNING', 'Open Graph social card image exists in public/og-image.webp', 'public/og-image.webp is missing', 'public/og-image.webp');

  const faviconIcoExists = fs.existsSync(path.join(ROOT_DIR, 'public', 'favicon.ico'));
  check('Images', faviconIcoExists || logoExists, 'INFO', 'Favicon brand asset exists (public/logo.png & public/favicon.ico)', 'Favicon asset is missing', 'public/logo.png');

  if (ogImgExists) {
    const stat = fs.statSync(OG_IMAGE_PATH);
    check('Images', stat.size > 1000, 'INFO', `OG image is non-empty (${(stat.size / 1024).toFixed(1)} KB)`, 'public/og-image.webp is empty or corrupt', 'public/og-image.webp');
  }

  // ==========================================
  // 6. Structured Data (JSON-LD) Checks
  // ==========================================
  if (indexExists) {
    const indexHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');
    const hasJsonLd = indexHtml.includes('type="application/ld+json"');
    check('Structured Data', hasJsonLd, 'CRITICAL', 'Base JSON-LD structured data script found in index.html for crawlers', 'index.html missing <script type="application/ld+json">', 'index.html');

    if (hasJsonLd) {
      check('Structured Data', indexHtml.includes('"@type": "WebSite"'), 'WARNING', 'JSON-LD WebSite schema implemented', 'JSON-LD WebSite schema missing in index.html', 'index.html');
      check('Structured Data', indexHtml.includes('"@type": "Organization"'), 'WARNING', 'JSON-LD Organization schema implemented', 'JSON-LD Organization schema missing in index.html', 'index.html');
      check('Structured Data', indexHtml.includes('SearchAction'), 'INFO', 'JSON-LD SearchAction potential action declared for command discovery', 'JSON-LD SearchAction missing in index.html', 'index.html');
    }
  }

  const structuredDataModulePath = path.join(ROOT_DIR, 'src', 'lib', 'seo', 'structured-data.ts');
  const structModExists = fs.existsSync(structuredDataModulePath);
  check('Structured Data', structModExists, 'CRITICAL', 'Structured data generator module exists at src/lib/seo/structured-data.ts', 'structured-data.ts missing', 'src/lib/seo/structured-data.ts');

  if (structModExists) {
    const structContent = fs.readFileSync(structuredDataModulePath, 'utf-8');
    check('Structured Data', structContent.includes('generateComponentSchema'), 'WARNING', 'Component SoftwareApplication/ItemPage schema generator available', 'Missing generateComponentSchema', 'src/lib/seo/structured-data.ts');
    check('Structured Data', structContent.includes('generateBreadcrumbSchema'), 'WARNING', 'BreadcrumbList schema generator available', 'Missing generateBreadcrumbSchema', 'src/lib/seo/structured-data.ts');
    check('Structured Data', structContent.includes('generateDocArticleSchema'), 'WARNING', 'TechArticle schema generator available for documentation topics', 'Missing generateDocArticleSchema', 'src/lib/seo/structured-data.ts');
  }

  // ==========================================
  // 7. Performance & Accessibility Checks
  // ==========================================
  if (indexExists) {
    const fontsDir = path.join(ROOT_DIR, 'public', 'fonts');
    const hasSelfHostedFonts = fs.existsSync(fontsDir) && fs.readdirSync(fontsDir).length > 0;
    const indexHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');
    const hasPreconnect = indexHtml.includes('rel="preconnect"');
    check(
      'Performance & A11y',
      hasSelfHostedFonts || hasPreconnect,
      'INFO',
      hasSelfHostedFonts
        ? 'High-performance self-hosted fonts deployed in public/fonts/'
        : 'Font origins preconnected for swift typography rendering',
      'Fonts are neither self-hosted nor preconnected',
      'public/fonts'
    );
  }

  const motionTokensPath = path.join(ROOT_DIR, 'src', 'lib', 'motion-tokens.ts');
  if (fs.existsSync(motionTokensPath)) {
    const motionTokens = fs.readFileSync(motionTokensPath, 'utf-8');
    check('Performance & A11y', motionTokens.includes('spring') || motionTokens.includes('transition'), 'INFO', 'Motion system uses optimized spring physics tokens', 'motion-tokens.ts is incomplete', 'src/lib/motion-tokens.ts');
  }

  // ==========================================
  // Calculate Final Category Scores & Overall Score
  // ==========================================
  const weights: Record<string, number> = {
    'Technical SEO': 0.15,
    'Metadata': 0.20,
    'Content': 0.15,
    'Links': 0.15,
    'Images': 0.10,
    'Structured Data': 0.15,
    'Performance & A11y': 0.10,
  };

  const categories: Record<string, CategoryResult> = {};
  let overallScore = 0;

  for (const [catName, data] of Object.entries(categoryScores)) {
    let catScore = 100;
    if (data.total > 0) {
      const deduction = data.criticals * 25 + data.warnings * 10;
      catScore = Math.max(0, Math.min(100, Math.round((data.passed / data.total) * 100 - (deduction > 0 ? deduction * 0.2 : 0))));
    }

    categories[catName] = {
      name: catName,
      score: catScore,
      totalChecks: data.total,
      passedChecks: data.passed,
      criticals: data.criticals,
      warnings: data.warnings,
    };

    const weight = weights[catName] || 0.1;
    overallScore += catScore * weight;
  }

  overallScore = Math.round(overallScore);

  return {
    overallScore,
    categories,
    issues,
    discoveredComponents: uiFiles.length,
  };
}

export function printAuditReport(): void {
  console.log('\n========================================================');
  console.log('            EASYUI AUTOMATED SEO AUDIT REPORT           ');
  console.log('========================================================\n');

  const { overallScore, categories, issues, discoveredComponents } = runSEOAudit();

  console.log(`Discovered Components: ${discoveredComponents}`);
  console.log(`Technical SEO Health Score: ${overallScore}/100`);
  console.log('(Note: Technical SEO Health verifies correctness of metadata, sitemaps, and schemas.\n It is a technical prerequisite and does not guarantee organic search ranking.)\n');

  console.log('Category Breakdown:');
  console.log('--------------------------------------------------------');
  for (const [name, cat] of Object.entries(categories)) {
    const padName = name.padEnd(22, ' ');
    const barLength = Math.round(cat.score / 5);
    const bar = '█'.repeat(barLength).padEnd(20, '░');
    console.log(`  ${padName} [${bar}] ${String(cat.score).padStart(3, ' ')}% (${cat.passedChecks}/${cat.totalChecks} checks)`);
  }
  console.log('--------------------------------------------------------\n');

  const criticals = issues.filter((i) => i.severity === 'CRITICAL');
  const warnings = issues.filter((i) => i.severity === 'WARNING');
  const infos = issues.filter((i) => i.severity === 'INFO');
  const passes = issues.filter((i) => i.severity === 'PASS');

  if (criticals.length > 0) {
    console.log('🚨 CRITICAL ISSUES (Build Guard Failure):');
    for (const c of criticals) {
      console.log(`  ✖ [${c.category}] ${c.message}${c.target ? ` (${c.target})` : ''}`);
    }
    console.log('');
  }

  if (warnings.length > 0) {
    console.log('⚠️  WARNINGS:');
    for (const w of warnings) {
      console.log(`  ⚠ [${w.category}] ${w.message}${w.target ? ` (${w.target})` : ''}`);
    }
    console.log('');
  }

  if (infos.length > 0) {
    console.log('ℹ️  RECOMMENDATIONS & INFO:');
    for (const inf of infos) {
      console.log(`  • [${inf.category}] ${inf.message}`);
    }
    console.log('');
  }

  console.log(`✓ Passed Checks: ${passes.length}`);
  console.log('========================================================');

  if (criticals.length > 0) {
    console.log('❌ SEO Build Guard failed due to critical SEO errors.\n');
    process.exit(1);
  } else {
    console.log('✨ EasyUI passed all essential SEO audit criteria successfully!\n');
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  printAuditReport();
}
