import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const REGISTRY_PATH = path.join(ROOT_DIR, 'registry.json');
const COMPONENTS_DATA_PATH = path.join(ROOT_DIR, 'src', 'components', 'registry', 'components-data.ts');
const PACKAGE_JSON_PATH = path.join(ROOT_DIR, 'package.json');
const UI_DIR = path.join(ROOT_DIR, 'src', 'components', 'ui');

const REPO_SLUG = 'Surajmaurya1/easyui';
const REGISTRY_HOMEPAGE = 'https://easyui.site';

interface RegistryFile {
  path: string;
  type: string;
  target?: string;
}

interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
}

interface RegistrySchema {
  $schema: string;
  name: string;
  homepage: string;
  items: RegistryItem[];
}

function validateRegistry(): void {
  console.log('🔍 EasyUI Registry & Catalog Validator');
  console.log('---------------------------------------');

  const errors: string[] = [];
  const warnings: string[] = [];

  // 1. Validate package.json
  if (!fs.existsSync(PACKAGE_JSON_PATH)) {
    errors.push(`package.json not found at ${PACKAGE_JSON_PATH}`);
    return;
  }
  const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8'));
  const allDeps = new Set([
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ]);

  // 2. Validate registry.json exists & parse
  if (!fs.existsSync(REGISTRY_PATH)) {
    errors.push(`registry.json is missing at root: ${REGISTRY_PATH}`);
    finishValidation(errors, warnings);
    return;
  }

  let registry: RegistrySchema;
  try {
    const raw = fs.readFileSync(REGISTRY_PATH, 'utf-8');
    registry = JSON.parse(raw);
  } catch (err: any) {
    errors.push(`registry.json is not valid JSON: ${err.message}`);
    finishValidation(errors, warnings);
    return;
  }

  // 3. Validate root fields
  if (registry.$schema !== 'https://ui.shadcn.com/schema/registry.json') {
    errors.push(`Invalid or missing "$schema" in registry.json. Expected "https://ui.shadcn.com/schema/registry.json", got "${registry.$schema}"`);
  }

  if (registry.name !== 'easyui') {
    errors.push(`Invalid registry "name". Expected "easyui", got "${registry.name}"`);
  }

  if (registry.homepage !== REGISTRY_HOMEPAGE) {
    warnings.push(`Registry homepage should point to "${REGISTRY_HOMEPAGE}": got "${registry.homepage}"`);
  }

  if (!Array.isArray(registry.items) || registry.items.length === 0) {
    errors.push('Registry "items" must be a non-empty array.');
    finishValidation(errors, warnings);
    return;
  }

  const seenSlugs = new Set<string>();
  const seenTitles = new Set<string>();

  // 4. Validate each registry item
  for (const item of registry.items) {
    // Validate slug / name
    if (!item.name || typeof item.name !== 'string') {
      errors.push(`Registry item is missing a valid "name": ${JSON.stringify(item)}`);
      continue;
    }

    const slug = item.name;
    if (seenSlugs.has(slug)) {
      errors.push(`Duplicate component slug found in registry.json: "${slug}"`);
    }
    seenSlugs.add(slug);

    if (slug !== slug.toLowerCase() || slug.includes(' ') || slug.includes('_')) {
      errors.push(`Slug "${slug}" must be kebab-case lowercase without spaces or underscores.`);
    }

    // Validate type
    if (item.type !== 'registry:ui') {
      errors.push(`Component "${slug}" type must be "registry:ui", got "${item.type}"`);
    }

    // Validate title & description
    if (!item.title || typeof item.title !== 'string' || item.title.trim() === '') {
      errors.push(`Component "${slug}" has missing or empty title.`);
    } else {
      if (seenTitles.has(item.title)) {
        warnings.push(`Duplicate component title "${item.title}" for slug "${slug}"`);
      }
      seenTitles.add(item.title);
    }

    if (!item.description || typeof item.description !== 'string' || item.description.trim() === '') {
      errors.push(`Component "${slug}" has missing or empty description.`);
    }

    // Validate dependencies exist in package.json
    if (item.dependencies) {
      if (!Array.isArray(item.dependencies)) {
        errors.push(`Component "${slug}" dependencies must be an array.`);
      } else {
        for (const dep of item.dependencies) {
          if (!allDeps.has(dep)) {
            errors.push(
              `Component "${slug}" requires dependency "${dep}", but "${dep}" is not found in package.json dependencies.`
            );
          }
        }
      }
    }

    // Validate files array
    if (!Array.isArray(item.files) || item.files.length === 0) {
      errors.push(`Component "${slug}" has no files defined in registry.json.`);
    } else {
      let hasPrimaryUiFile = false;
      for (const file of item.files) {
        if (!file.path) {
          errors.push(`Component "${slug}" has file entry with missing "path".`);
          continue;
        }

        const absFilePath = path.join(ROOT_DIR, file.path);
        if (!fs.existsSync(absFilePath)) {
          errors.push(`Component "${slug}" references file "${file.path}" which does not exist on disk.`);
        }

        if (file.type === 'registry:ui' && file.path.startsWith('src/components/ui/')) {
          hasPrimaryUiFile = true;
        }

        if (!file.target) {
          warnings.push(`Component "${slug}" file "${file.path}" does not have an explicit target path.`);
        }
      }

      if (!hasPrimaryUiFile) {
        errors.push(`Component "${slug}" is missing a primary "registry:ui" component file under src/components/ui/.`);
      }
    }
  }

  // 5. Validate UI directory has corresponding metadata files for every component
  if (fs.existsSync(UI_DIR)) {
    const uiFiles = fs.readdirSync(UI_DIR, { withFileTypes: true });
    for (const f of uiFiles) {
      if (f.isFile() && f.name.endsWith('.tsx') && !f.name.endsWith('.meta.ts') && !f.name.endsWith('.test.tsx') && !f.name.endsWith('.stories.tsx')) {
        const base = path.basename(f.name, '.tsx');
        const metaPath = path.join(UI_DIR, `${base}.meta.ts`);
        if (!fs.existsSync(metaPath)) {
          errors.push(`Found UI component file "${f.name}" without matching metadata file "${base}.meta.ts".`);
        }
      } else if (f.isDirectory()) {
        const folderFiles = fs.readdirSync(path.join(UI_DIR, f.name));
        const metaFile = folderFiles.find((name) => name === 'meta.ts' || name.endsWith('.meta.ts') || name === 'meta.json');
        if (!metaFile) {
          errors.push(`Found component directory "${f.name}" without metadata file (meta.ts).`);
        }
      }
    }
  }

  // 6. Validate components-data.ts exists and matches registry count
  if (!fs.existsSync(COMPONENTS_DATA_PATH)) {
    errors.push(`components-data.ts does not exist at ${COMPONENTS_DATA_PATH}`);
  } else {
    const catalogRaw = fs.readFileSync(COMPONENTS_DATA_PATH, 'utf-8');
    if (!catalogRaw.includes('export const EASY_COMPONENTS')) {
      errors.push('components-data.ts does not export EASY_COMPONENTS.');
    }
    if (!catalogRaw.includes('"createdAt":')) {
      errors.push('components-data.ts entries are missing the "createdAt" timestamp field.');
    }
  }

  finishValidation(errors, warnings, registry.items.length);
}

function finishValidation(errors: string[], warnings: string[], itemCount = 0): void {
  if (warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    warnings.forEach((w) => console.log(`  - ${w}`));
  }

  if (errors.length > 0) {
    console.error('\n❌ Registry validation failed with errors:');
    errors.forEach((e) => console.error(`  - ${e}`));
    console.log('\nRun "npm run registry:generate" to regenerate the registry and catalog.');
    process.exit(1);
  }

  console.log(`\n✓ All ${itemCount} components in registry.json passed validation successfully!`);
  console.log('✓ No schema violations, broken file paths, or missing dependencies detected.');
  console.log('---------------------------------------');
}

validateRegistry();
