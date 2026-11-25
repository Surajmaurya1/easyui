// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "animated-file-upload",
  "name": "Animated File Upload",
  "tagline": "Physical drag-and-drop file uploader with per-file progress morphing",
  "description": "A minimal, physical drag-and-drop file uploader with smooth drop reaction, independent file upload tracking, progressive state morphing, and accessible retry flows.",
  "category": "Forms",
  "badges": [
    "Drag & Drop",
    "Forms",
    "Spring Physics"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/animated-file-upload",
  "installPromptHash": "72dac80c7563e6553e6392895d604656b728bcff9f99c22832958b5d38bb6258",
  "features": [
    "Subtle physical dropzone scaling and border reaction without exaggerated AI glow",
    "Automatic mime-type detection and contextual file icon attribution",
    "Multi-file queue management with independent Uploading → Processing → Complete stages",
    "Self-morphing progress bar into checkmark state with non-aggressive error recovery",
    "Customizable file constraints (maxSize, maxFiles, accept) with accessible screen reader labels"
  ],
  "props": [
    {
      "name": "multiple",
      "type": "boolean",
      "default": "true",
      "description": "Allow multiple files selection and upload"
    },
    {
      "name": "accept",
      "type": "string | string[]",
      "default": "undefined",
      "description": "Accepted MIME types or file extensions (e.g. image/*, .pdf)"
    },
    {
      "name": "maxSize",
      "type": "number",
      "default": "26214400 (25MB)",
      "description": "Maximum file size in bytes"
    },
    {
      "name": "maxFiles",
      "type": "number",
      "default": "10",
      "description": "Maximum number of concurrent files in list"
    },
    {
      "name": "dropTitle",
      "type": "string",
      "default": "'Drop files here'",
      "description": "Primary drop target heading"
    },
    {
      "name": "dropSubtitle",
      "type": "string",
      "default": "'or browse from your device'",
      "description": "Secondary call-to-action text"
    },
    {
      "name": "variant",
      "type": "'standard' | 'compact'",
      "default": "'standard'",
      "description": "Display density mode"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "description": "Disables all interactions and file picking"
    },
    {
      "name": "onFilesSelected",
      "type": "(files: File[]) => void",
      "default": "undefined",
      "description": "Callback triggered when files are chosen"
    },
    {
      "name": "onUploadComplete",
      "type": "(file: UploadFileItem) => void",
      "default": "undefined",
      "description": "Callback fired on successful upload completion"
    },
    {
      "name": "uploadHandler",
      "type": "(file, onProgress) => Promise<void>",
      "default": "undefined",
      "description": "Custom async upload handler returning a promise"
    }
  ],
  "accessibility": [
    "Keyboard accessible dropzone triggerable via Enter or Space key",
    "Hidden semantic file input accessible to assistive technologies",
    "Aria-live announcements for file upload progression, completion, and error states",
    "Respects prefers-reduced-motion with instant state changes"
  ],
  "createdAt": "2026-08-21",
  "usageCode": "import { AnimatedFileUpload } from \"@/components/ui/animated-file-upload\";\n\nexport function Demo() {\n  return (\n    <div className=\"max-w-md mx-auto p-4\">\n      <AnimatedFileUpload\n        multiple\n        maxSize={10 * 1024 * 1024}\n        accept=\"image/*,application/pdf\"\n        onFilesSelected={(files) => console.log('Selected:', files)}\n        onUploadComplete={(file) => console.log('Uploaded:', file.name)}\n      />\n    </div>\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/AnimatedFileUpload.tsx",
      "type": "registry:ui",
      "target": "components/ui/animated-file-upload.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    },
    {
      "path": "src/lib/motion-tokens.ts",
      "type": "registry:lib",
      "target": "lib/motion-tokens.ts"
    }
  ]
};

export default component;
