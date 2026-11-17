import { createHash } from 'node:crypto';
import type { EasyUIComponentMeta } from '../src/types/component';

export const PROMPT_GENERATOR_VERSION = 1;
export const PROMPT_LIMIT = 12_000;

export interface PromptData {
  name: string;
  slug: string;
  description: string;
  category: string;
  install: string;
  dependencies: string[];
  registryUrl: string;
  usageCode?: string;
  props?: EasyUIComponentMeta['props'];
  sourceCode: string;
  meta: EasyUIComponentMeta;
}

const section = (title: string, body: string | undefined | null) => body?.trim() ? `## ${title}\n\n${body.trim()}` : null;

export function generatePrompt(data: PromptData): string {
  const name = data.name.trim();
  const sections = [
    section('Task', `Install and integrate the EasyUI ${name} component into my project.\n\n${data.description}${data.category ? `\n\nCategory: ${data.category}.` : ''}`),
    section('Before you change anything', 'Inspect the framework and version, package manager, TypeScript configuration, styling setup and Tailwind version, UI conventions, animation libraries, path aliases, and existing providers. Reuse what exists. Do not assume a fresh project or overwrite configuration.'),
    section('Compatibility check', 'Compare the project with requirements declared by the component. The available metadata does not declare framework, React, Tailwind, or animation-library version requirements; inspect the source and docs. If incompatible, stop and explain before risky changes. Never silently make major upgrades.'),
    section('Install', `${data.install}\n\n${data.dependencies.length ? `Dependencies (install only those missing): ${data.dependencies.slice().sort((a, b) => a.localeCompare(b)).join(', ')}.` : 'No additional package dependencies were detected by the registry sync.'}`),
    section('Usage', data.usageCode ? `Import path and example from component metadata:\n\n\`\`\`tsx\n${data.usageCode.trim()}\n\`\`\`${data.props?.length ? `\n\nDeclared props:\n${data.props.map((prop) => `- \`${prop.name}\` (${prop.type})${prop.default ? `; default: ${prop.default}` : ''} — ${prop.description}`).join('\n')}` : ''}` : 'No usage example is recorded in metadata. Read the component source and docs to determine the import path and usage.'),
    section('Unverified items', `Required setup, peer/optional dependencies, registry dependencies, customization hooks, variants, theme tokens, and limitations are not fully declared in the available metadata. Read the component source and docs to resolve only what applies. Source: ${data.registryUrl}`),
    section('Rules for you (the agent)', 'Keep the diff minimal, follow the project code style, avoid unrelated refactors, and do not claim success without running checks.'),
    section('Verify', 'Run the project typecheck, lint, and build commands. Confirm imports resolve, the component renders, and key interactions work. Fix errors.'),
    section('Report', 'Report files created or modified, dependencies installed, configuration changes, commands run and results, and remaining manual steps.'),
  ].filter((value): value is string => Boolean(value));
  const prompt = sections.join('\n\n').replace(/\r\n?/g, '\n') + '\n';
  if (Buffer.byteLength(prompt, 'utf8') <= PROMPT_LIMIT) return prompt;
  return [
    section('Task', `Install and integrate the EasyUI ${name} component into my project.\n\n${data.description}`),
    section('Before you change anything', 'Inspect the framework, package manager, TypeScript and styling setup, conventions, aliases, and providers. Reuse existing setup and do not overwrite configuration.'),
    section('Install', data.install),
    section('Source', `This component exceeds the inline prompt size limit. Fetch and inspect its source and docs before integration: ${data.registryUrl}`),
    section('Rules for you (the agent)', 'Keep the diff minimal, avoid unrelated refactors, and do not claim success without running checks.'),
    section('Verify', 'Run the project typecheck, lint, and build commands. Confirm the component renders and key interactions work.'),
    section('Report', 'Report changed files, dependencies, configuration changes, commands and results, and remaining manual steps.'),
  ].filter((value): value is string => Boolean(value)).join('\n\n') + '\n';
}

export function promptInputHash(data: PromptData): string {
  return createHash('sha256').update(JSON.stringify({ version: PROMPT_GENERATOR_VERSION, ...data })).digest('hex');
}
