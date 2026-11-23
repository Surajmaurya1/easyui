// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "prompt-input",
  "name": "Prompt Input",
  "tagline": "Chat composer with streaming stop, attachments, model picker, and prompt history",
  "description": "A production-ready AI chat composer with an auto-growing textarea, streaming stop control, attachment chips with drag-and-drop and paste, an accessible model picker, prompt history, and keyboard-first send behavior.",
  "category": "Forms",
  "badges": [
    "AI",
    "Composer",
    "Attachments",
    "Accessible"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/prompt-input",
  "installPromptHash": "10d98564e4378f4889915aef052c33d6f51afd745ea6ccd7b80f64aebcf5dc29",
  "features": [
    "Auto-growing textarea measured by a hidden mirror so it glides open and closed",
    "Send button morphs into a Stop button with an orbital progress ring while streaming",
    "Attachment button, drag-and-drop zone, and paste handling with chips, previews, and size/type limits",
    "Accessible model picker listbox with typeahead, keyboard navigation, and automatic drop-up/down placement",
    "Enter to send, Shift+Enter for a new line, Cmd/Ctrl+Enter always sends, and Escape stops a reply",
    "Arrow-up prompt history recall with draft restoration when moving back down",
    "IME-safe key handling, iOS zoom-safe 16px input text, safe-area padding, and light/dark styling",
    "Imperative handle for focus, clear, setValue, and attaching files from outside the composer"
  ],
  "props": [
    {
      "name": "onSend",
      "type": "(payload: PromptSubmit) => void | Promise<void>",
      "default": "undefined",
      "description": "Called when the user sends. Throw or reject to put the message back in the box"
    },
    {
      "name": "streaming",
      "type": "boolean",
      "default": "false",
      "description": "While true the send button becomes a Stop button and Escape stops the reply"
    },
    {
      "name": "onStop",
      "type": "() => void",
      "default": "undefined",
      "description": "Callback fired when the user stops a streaming response"
    },
    {
      "name": "models",
      "type": "PromptModel[]",
      "default": "DEFAULT_MODELS",
      "description": "Models rendered in the accessible model picker listbox"
    },
    {
      "name": "model",
      "type": "string",
      "default": "undefined",
      "description": "Controlled model id"
    },
    {
      "name": "defaultModel",
      "type": "string",
      "default": "undefined",
      "description": "Initial model id when uncontrolled (defaults to the first model)"
    },
    {
      "name": "onModelChange",
      "type": "(id: string) => void",
      "default": "undefined",
      "description": "Callback fired when the selected model changes"
    },
    {
      "name": "placeholder",
      "type": "string",
      "default": "'Message the assistant…'",
      "description": "Placeholder text for the textarea"
    },
    {
      "name": "maxLength",
      "type": "number",
      "default": "8000",
      "description": "Maximum character count before the message is flagged as over the limit"
    },
    {
      "name": "maxHeight",
      "type": "number",
      "default": "224",
      "description": "Tallest the textarea grows in pixels before it starts scrolling"
    },
    {
      "name": "allowAttachments",
      "type": "boolean",
      "default": "true",
      "description": "Enables the attach button, drag-and-drop, and paste file handling"
    },
    {
      "name": "maxFiles",
      "type": "number",
      "default": "5",
      "description": "Maximum number of attachments allowed at once"
    },
    {
      "name": "maxFileSizeMB",
      "type": "number",
      "default": "10",
      "description": "Maximum size per attachment in megabytes"
    },
    {
      "name": "accept",
      "type": "string",
      "default": "undefined",
      "description": "Accepted file types using the same format as an input accept attribute"
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "description": "Disables the composer and all of its controls"
    },
    {
      "name": "autoFocus",
      "type": "boolean",
      "default": "false",
      "description": "Focuses the textarea when the component mounts"
    },
    {
      "name": "enterToSend",
      "type": "boolean",
      "default": "desktop only",
      "description": "Enter sends and Shift+Enter adds a line. Defaults to true on fine pointers and false on touch devices. Cmd/Ctrl+Enter always sends"
    },
    {
      "name": "actions",
      "type": "ReactNode",
      "default": "undefined",
      "description": "Extra buttons rendered next to the model picker"
    },
    {
      "name": "hint",
      "type": "ReactNode | false",
      "default": "keyboard hint",
      "description": "Footer line under the box. Pass false to hide it"
    },
    {
      "name": "safeArea",
      "type": "boolean",
      "default": "false",
      "description": "Pads the bottom for the iPhone home indicator when pinned to the screen bottom"
    },
    {
      "name": "className",
      "type": "string",
      "default": "undefined",
      "description": "Custom Tailwind class names for the outer wrapper"
    }
  ],
  "accessibility": [
    "The textarea exposes an aria-label plus an aria-describedby hint and reports errors through role=\"alert\" and aria-live",
    "The model picker is a focusable listbox with aria-activedescendant, Home/End, arrow, typeahead, and Escape handling",
    "Send and Stop share one labelled button and report the character count through aria-live near the limit",
    "Attachment removal buttons include the file name in their aria-label, and drag-and-drop has a visible drop overlay",
    "All motion respects prefers-reduced-motion, including the textarea growth, chips, and streaming glow"
  ],
  "createdAt": "2026-11-11",
  "usageCode": "import { PromptInput, type PromptSubmit } from \"@/components/ui/prompt-input\";\n\nexport function Demo() {\n  const models = [\n    { id: \"fast\", name: \"Fast\", description: \"Quick answers\", badge: \"Fast\" },\n    { id: \"reasoning\", name: \"Reasoning\", description: \"Thinks longer\", badge: \"Deep\" },\n  ];\n\n  const handleSend = async ({ text, files, model }: PromptSubmit) => {\n    await fetch(\"/api/chat\", {\n      method: \"POST\",\n      body: JSON.stringify({ text, files: files.map((f) => f.name), model: model?.id }),\n    });\n  };\n\n  return (\n    <PromptInput\n      onSend={handleSend}\n      models={models}\n      streaming={false}\n      onStop={() => {}}\n      placeholder=\"Message the assistant…\"\n      safeArea\n    />\n  );\n}",
  "dependencies": [
    "framer-motion"
  ],
  "files": [
    {
      "path": "src/components/ui/PromptInput.tsx",
      "type": "registry:ui",
      "target": "components/ui/prompt-input.tsx"
    }
  ]
};

export default component;
