import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import type { EasyUIComponentMeta } from '../src/types/component';
import { generateSitemap } from './generate-sitemap';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const UI_DIR = path.join(ROOT_DIR, 'src', 'components', 'ui');
const REGISTRY_PATH = path.join(ROOT_DIR, 'registry.json');
const COMPONENTS_DATA_PATH = path.join(ROOT_DIR, 'src', 'components', 'registry', 'components-data.ts');
const SOURCE_DIR = path.join(ROOT_DIR, 'public', 'source');
const PACKAGE_JSON_PATH = path.join(ROOT_DIR, 'package.json');

const REPO_SLUG = 'Surajmaurya1/easyui';

interface DiscoveredComponent {
  componentName: string;
  slug: string;
  primaryFilePath: string;
  metaFilePath: string;
  additionalFiles: string[];
  meta: EasyUIComponentMeta;
  dependencies: string[];
  registryDependencies: string[];
  registryFiles: Array<{
    path: string;
    type: 'registry:ui' | 'registry:lib' | 'registry:hook' | 'registry:component' | 'registry:block' | 'registry:page';
    target: string;
  }>;
  sourceCode: string;
}

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
    .replace(/^-+|-+$/g, '');
}

function normalizeRelativePath(p: string): string {
  return p.replace(/\\/g, '/');
}

function getPackageDependencies(): Set<string> {
  if (!fs.existsSync(PACKAGE_JSON_PATH)) {
    throw new Error(`package.json not found at ${PACKAGE_JSON_PATH}`);
  }
  const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8'));
  const deps = Object.keys(pkg.dependencies || {});
  const devDeps = Object.keys(pkg.devDependencies || {});
  return new Set([...deps, ...devDeps]);
}

/**
 * Parses all imports from a source file and classifies them
 */
function analyzeSourceImports(
  sourceCode: string,
  filePath: string,
  validPackageDeps: Set<string>
): {
  npmDeps: Set<string>;
  internalFiles: Set<string>;
} {
  const npmDeps = new Set<string>();
  const internalFiles = new Set<string>();

  // Match import statements: import ... from '...'; import '...';
  const importRegex = /(?:import\s+(?:(?:[\w*\s{},]*)\s+from\s+)?['"]([^'"]+)['"]|require\(['"]([^'"]+)['"]\))/g;
  let match;

  while ((match = importRegex.exec(sourceCode)) !== null) {
    const importPath = match[1] || match[2];
    if (!importPath) continue;

    // Skip React (standard runtime)
    if (importPath === 'react' || importPath === 'react-dom' || importPath.startsWith('react/')) {
      continue;
    }

    if (importPath.startsWith('.') || importPath.startsWith('@/')) {
      // Resolve internal file
      let resolvedAbsPath: string | null = null;

      if (importPath.startsWith('@/')) {
        const subPath = importPath.slice(2);
        resolvedAbsPath = path.join(ROOT_DIR, 'src', subPath);
      } else {
        const fileDir = path.dirname(filePath);
        resolvedAbsPath = path.resolve(fileDir, importPath);
      }

      // Check extensions if exact file not found
      const extensions = ['', '.ts', '.tsx', '.js', '.jsx', '.css'];
      let foundPath: string | null = null;

      for (const ext of extensions) {
        const candidate = resolvedAbsPath + ext;
        if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
          foundPath = candidate;
          break;
        }
      }

      if (foundPath) {
        const rel = path.relative(ROOT_DIR, foundPath);
        internalFiles.add(rel);
      }
    } else {
      // External npm dependency (e.g. framer-motion, lucide-react, clsx)
      let pkgName = importPath;
      if (importPath.startsWith('@')) {
        const parts = importPath.split('/');
        pkgName = `${parts[0]}/${parts[1] || ''}`;
      } else {
        pkgName = importPath.split('/')[0];
      }

      if (validPackageDeps.has(pkgName)) {
        // Only include direct dependencies needed by the component
        // Note: we can keep framer-motion, lucide-react, etc.
        if (pkgName !== 'clsx' && pkgName !== 'tailwind-merge' && pkgName !== 'react' && pkgName !== 'react-dom') {
          npmDeps.add(pkgName);
        }
      }
    }
  }

  return { npmDeps, internalFiles };
}

async function discoverComponents(): Promise<DiscoveredComponent[]> {
  if (!fs.existsSync(UI_DIR)) {
    throw new Error(`UI directory not found at: ${UI_DIR}`);
  }

  const validPackageDeps = getPackageDependencies();
  const entries = fs.readdirSync(UI_DIR, { withFileTypes: true });
  const discovered: DiscoveredComponent[] = [];

  for (const entry of entries) {
    let componentName = '';
    let primaryFilePath = '';
    let metaFilePath = '';
    const additionalFiles: string[] = [];

    if (entry.isDirectory()) {
      // Folder-based component (e.g., src/components/ui/magnetic-button/)
      const folderPath = path.join(UI_DIR, entry.name);
      const folderFiles = fs.readdirSync(folderPath);

      // Look for primary TSX file
      const primaryTsx = folderFiles.find(
        (f) => f.endsWith('.tsx') && !f.endsWith('.meta.ts') && !f.endsWith('.test.tsx') && !f.endsWith('.stories.tsx')
      );
      if (!primaryTsx) continue;

      componentName = path.basename(primaryTsx, '.tsx');
      primaryFilePath = path.join(folderPath, primaryTsx);

      // Look for meta file
      const metaFile = folderFiles.find((f) => f === 'meta.ts' || f === `${componentName}.meta.ts` || f === 'meta.json');
      if (!metaFile) {
        throw new Error(`Component in folder "${entry.name}" is missing a metadata file (e.g. meta.ts).`);
      }
      metaFilePath = path.join(folderPath, metaFile);

      // Additional files in folder (css, utils, etc.)
      for (const f of folderFiles) {
        const full = path.join(folderPath, f);
        if (full !== primaryFilePath && full !== metaFilePath && !f.endsWith('.test.tsx') && !f.endsWith('.stories.tsx')) {
          additionalFiles.push(full);
        }
      }
    } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
      // Flat component file (e.g., src/components/ui/MagneticButton.tsx)
      if (entry.name.endsWith('.meta.ts') || entry.name.endsWith('.test.tsx') || entry.name.endsWith('.stories.tsx')) {
        continue;
      }

      componentName = path.basename(entry.name, '.tsx');
      primaryFilePath = path.join(UI_DIR, entry.name);

      // Find corresponding .meta.ts
      const expectedMeta = path.join(UI_DIR, `${componentName}.meta.ts`);
      if (!fs.existsSync(expectedMeta)) {
        throw new Error(
          `Component "${componentName}" (${entry.name}) is missing its metadata file:\nExpected: ${expectedMeta}`
        );
      }
      metaFilePath = expectedMeta;

      // Check for same-named companion files (e.g., DotField.css)
      const siblingFiles = fs.readdirSync(UI_DIR);
      for (const sib of siblingFiles) {
        if (sib !== entry.name && sib !== `${componentName}.meta.ts` && sib.startsWith(componentName)) {
          additionalFiles.push(path.join(UI_DIR, sib));
        }
      }
    } else {
      continue;
    }

    // Load metadata file dynamically
    const metaUrl = pathToFileURL(metaFilePath).href + `?t=${Date.now()}`;
    const importedMetaModule = await import(metaUrl);
    const meta: EasyUIComponentMeta = importedMetaModule.default || importedMetaModule;

    if (!meta.title || !meta.description) {
      throw new Error(`Component "${componentName}" metadata must define at least "title" and "description".`);
    }

    const slug = toKebabCase(componentName);
    const primarySource = fs.readFileSync(primaryFilePath, 'utf-8').replace(/\r\n/g, '\n');

    // Analyze imports
    const { npmDeps, internalFiles } = analyzeSourceImports(primarySource, primaryFilePath, validPackageDeps);

    // Also analyze any additional files
    for (const addFile of additionalFiles) {
      if (fs.existsSync(addFile) && (addFile.endsWith('.ts') || addFile.endsWith('.tsx'))) {
        const addSource = fs.readFileSync(addFile, 'utf-8').replace(/\r\n/g, '\n');
        const addAnalysis = analyzeSourceImports(addSource, addFile, validPackageDeps);
        addAnalysis.npmDeps.forEach((d) => npmDeps.add(d));
        addAnalysis.internalFiles.forEach((f) => internalFiles.add(f));
      }
    }

    // Build registry file list
    const primaryRel = normalizeRelativePath(path.relative(ROOT_DIR, primaryFilePath));
    const registryFiles: DiscoveredComponent['registryFiles'] = [
      {
        path: primaryRel,
        type: 'registry:ui',
        target: `components/ui/${slug}.tsx`,
      },
    ];

    // Include additional files
    for (const addFile of additionalFiles) {
      const addRel = normalizeRelativePath(path.relative(ROOT_DIR, addFile));
      const ext = path.extname(addFile);
      registryFiles.push({
        path: addRel,
        type: 'registry:ui',
        target: `components/ui/${slug}${ext}`,
      });
    }

    // Include shared internal files that the component explicitly imports
    for (const internalRel of internalFiles) {
      const normInternalRel = normalizeRelativePath(internalRel);
      const isAlreadyInFiles = registryFiles.some((f) => f.path === normInternalRel);
      if (!isAlreadyInFiles) {
        if (normInternalRel.startsWith('src/lib/')) {
          const target = normInternalRel.replace(/^src\//, '');
          registryFiles.push({
            path: normInternalRel,
            type: 'registry:lib',
            target,
          });
        } else if (normInternalRel.startsWith('src/components/icons/')) {
          const base = path.basename(normInternalRel);
          const iconSlug = toKebabCase(base.replace(/\.tsx?$/, ''));
          registryFiles.push({
            path: normInternalRel,
            type: 'registry:ui',
            target: `components/icons/${iconSlug}.tsx`,
          });
        } else if (normInternalRel.startsWith('src/components/ui/')) {
          // If it's a companion CSS or helper in UI directory
          if (normInternalRel.endsWith('.css')) {
            const ext = path.extname(normInternalRel);
            registryFiles.push({
              path: normInternalRel,
              type: 'registry:ui',
              target: `components/ui/${slug}${ext}`,
            });
          }
        }
      }
    }

    discovered.push({
      componentName,
      slug,
      primaryFilePath,
      metaFilePath,
      additionalFiles,
      meta,
      dependencies: Array.from(npmDeps).sort(),
      registryDependencies: [],
      registryFiles,
      sourceCode: primarySource,
    });
  }

  return discovered.sort((a, b) => a.slug.localeCompare(b.slug));
}

function generateRegistryJson(components: DiscoveredComponent[]): void {
  const items = components.map((comp) => {
    const item: Record<string, any> = {
      name: comp.slug,
      type: 'registry:ui',
      title: comp.meta.title,
      description: comp.meta.description,
    };

    if (comp.dependencies.length > 0) {
      item.dependencies = comp.dependencies;
    }

    if (comp.registryDependencies.length > 0) {
      item.registryDependencies = comp.registryDependencies;
    }

    item.files = comp.registryFiles;

    return item;
  });

  const registry = {
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    name: 'easyui',
    homepage: `https://github.com/${REPO_SLUG}`,
    items,
  };

  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + '\n', 'utf-8');
  console.log(`✓ Generated ${normalizeRelativePath(path.relative(ROOT_DIR, REGISTRY_PATH))} (${items.length} items)`);
}

function generateComponentsData(components: DiscoveredComponent[]): void {
  // Ensure public/source directory exists
  if (!fs.existsSync(SOURCE_DIR)) {
    fs.mkdirSync(SOURCE_DIR, { recursive: true });
  }

  // Write separate source code JSON files for on-demand lazy loading
  for (const comp of components) {
    const sourceFilePath = path.join(SOURCE_DIR, `${comp.slug}.json`);
    const payload = {
      id: comp.slug,
      name: comp.meta.title,
      sourceCode: comp.sourceCode,
    };
    fs.writeFileSync(sourceFilePath, JSON.stringify(payload, null, 2) + '\n', 'utf-8');
  }
  console.log(`✓ Generated ${normalizeRelativePath(path.relative(ROOT_DIR, SOURCE_DIR))}/ (${components.length} source files)`);

  const componentCatalogEntries = components.map((comp) => {
    const cliCommand = `npx shadcn@latest add ${REPO_SLUG}/${comp.slug}`;
    const category = comp.meta.category || 'Motion';
    const badges = comp.meta.badges || [category];
    const tagline = comp.meta.tagline || comp.meta.description;
    const features = comp.meta.features || [];
    const props = comp.meta.props || [];
    const accessibility = comp.meta.accessibility || [];
    const createdAt = comp.meta.createdAt || '2026-08-01';
    const usageCode = comp.meta.usageCode || `import { ${comp.componentName} } from "@/components/ui/${comp.slug}";\n\nexport function Demo() {\n  return <${comp.componentName} />;\n}`;

    return {
      id: comp.slug,
      name: comp.meta.title,
      tagline,
      description: comp.meta.description,
      category,
      badges,
      cliCommand,
      features,
      props,
      accessibility,
      createdAt,
      usageCode,
      dependencies: comp.dependencies,
      files: comp.registryFiles,
    };
  });

  const content = `// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../types/component';

export const EASY_COMPONENTS: EasyComponentMeta[] = ${JSON.stringify(componentCatalogEntries, null, 2)};
`;

  fs.writeFileSync(COMPONENTS_DATA_PATH, content, 'utf-8');
  console.log(`✓ Generated ${normalizeRelativePath(path.relative(ROOT_DIR, COMPONENTS_DATA_PATH))} (${components.length} components)`);
}

async function main() {
  console.log('🚀 EasyUI Registry & Catalog Generator');
  console.log('----------------------------------------');
  try {
    const components = await discoverComponents();
    console.log(`Found ${components.length} components in src/components/ui:`);
    for (const c of components) {
      console.log(`  - ${c.componentName} -> "${c.slug}" (deps: [${c.dependencies.join(', ')}])`);
    }
    console.log('');

    generateRegistryJson(components);
    generateComponentsData(components);

    // Automatically synchronize sitemap.xml with newly discovered components
    generateSitemap();

    console.log('----------------------------------------');
    console.log('✨ Generation complete successfully!');
  } catch (err: any) {
    console.error(`\n❌ Generation failed:\n${err.message || err}`);
    process.exit(1);
  }
}

main();
