// AUTO-GENERATED — DO NOT EDIT MANUALLY.
// Run "npm run component:sync" to regenerate this file.

import type { EasyComponentMeta } from '../../../types/component';

const component: EasyComponentMeta = {
  "id": "chat",
  "name": "Chat",
  "tagline": "Production-ready conversation interface with history sidebar and composer",
  "description": "A production-grade conversational chat component with thread history sidebar, rich message rendering, status indicators, file attachments, and auto-expanding composer.",
  "category": "Feedback",
  "badges": [
    "Chat",
    "AI",
    "Messaging",
    "Interactive"
  ],
  "cliCommand": "npx shadcn@latest add Surajmaurya1/easyui/chat",
  "installPromptHash": "0c430d2c535e9c6a9ac34deefce2dc14a40626f918dbd1b79433557935ae38e6",
  "features": [
    "Complete conversational layout with optional historical threads sidebar and responsive mobile drawer",
    "Rich message components supporting user, assistant, and system roles with timestamps and avatars",
    "Built-in file and image attachment upload system with chips, sizes, and removal actions",
    "Auto-expanding multiline composer with Enter-to-send and Shift+Enter for newline shortcuts",
    "Message delivery states: sending, sent, delivered, failed (with retry), and streaming",
    "Accessible action triggers for copying message content and managing conversation state"
  ],
  "props": [
    {
      "name": "messages",
      "type": "ChatMessageItem[]",
      "default": "[]",
      "description": "Array of chat message records including role, content, author, and attachments"
    },
    {
      "name": "onSendMessage",
      "type": "(content: string, attachments?: ChatAttachment[]) => void",
      "default": "undefined",
      "description": "Callback fired when the user submits a message via composer"
    },
    {
      "name": "isGenerating",
      "type": "boolean",
      "default": "false",
      "description": "Disables composer and shows loading status while the assistant is synthesizing an answer"
    },
    {
      "name": "threads",
      "type": "ChatConversationThread[]",
      "default": "undefined",
      "description": "Optional list of historical conversations displayed in the sidebar"
    },
    {
      "name": "activeThreadId",
      "type": "string",
      "default": "undefined",
      "description": "ID of the currently selected conversation thread"
    },
    {
      "name": "onSelectThread",
      "type": "(threadId: string) => void",
      "default": "undefined",
      "description": "Callback fired when a user selects a thread from the history sidebar"
    },
    {
      "name": "onNewChat",
      "type": "() => void",
      "default": "undefined",
      "description": "Callback fired when the user clicks the New Conversation button"
    },
    {
      "name": "onClearChat",
      "type": "() => void",
      "default": "undefined",
      "description": "Callback fired when the user clicks the clear chat history button"
    },
    {
      "name": "className",
      "type": "string",
      "default": "undefined",
      "description": "Custom Tailwind class names for styling overrides"
    }
  ],
  "accessibility": [
    "Keyboard navigable message history and composer with standard Enter and Shift+Enter keybindings",
    "Composer textarea provides clear accessible placeholders, labels, and aria-describedby hints",
    "Mobile sidebar features focus isolation, escape key dismissal, and backdrop overlay click handlers",
    "Action buttons include aria-label descriptors for screen reader compatibility"
  ],
  "createdAt": "2026-09-21",
  "usageCode": "import { Chat, type ChatMessageItem } from \"@/components/ui/chat\";\n\nexport function Demo() {\n  const messages: ChatMessageItem[] = [\n    { id: '1', role: 'user', content: 'Can you show me how to style EasyUI tables?', timestamp: '10:40 AM' },\n    { id: '2', role: 'assistant', content: 'Certainly! EasyUI tables use the semantic --border and --surface tokens.', timestamp: '10:41 AM' },\n  ];\n\n  return (\n    <Chat\n      messages={messages}\n      onSendMessage={(text) => console.log('Send:', text)}\n    />\n  );\n}",
  "dependencies": [
    "framer-motion",
    "lucide-react"
  ],
  "files": [
    {
      "path": "src/components/ui/Chat.tsx",
      "type": "registry:ui",
      "target": "components/ui/chat.tsx"
    },
    {
      "path": "src/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
};

export default component;
