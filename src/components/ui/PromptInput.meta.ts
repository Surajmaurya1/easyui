import type { EasyUIComponentMeta } from '../../types/component';

const meta: EasyUIComponentMeta = {
  title: 'Prompt Input',
  description:
    'A production-ready AI chat composer with an auto-growing textarea, streaming stop control, attachment chips with drag-and-drop and paste, an accessible model picker, prompt history, and keyboard-first send behavior.',
  category: 'Forms',
  tagline: 'Chat composer with streaming stop, attachments, model picker, and prompt history',
  badges: ['AI', 'Composer', 'Attachments', 'Accessible'],
  createdAt: '2026-11-11',
  features: [
    'Auto-growing textarea measured by a hidden mirror so it glides open and closed',
    'Send button morphs into a Stop button with an orbital progress ring while streaming',
    'Attachment button, drag-and-drop zone, and paste handling with chips, previews, and size/type limits',
    'Accessible model picker listbox with typeahead, keyboard navigation, and automatic drop-up/down placement',
    'Enter to send, Shift+Enter for a new line, Cmd/Ctrl+Enter always sends, and Escape stops a reply',
    'Arrow-up prompt history recall with draft restoration when moving back down',
    'IME-safe key handling, iOS zoom-safe 16px input text, safe-area padding, and light/dark styling',
    'Imperative handle for focus, clear, setValue, and attaching files from outside the composer',
  ],
  props: [
    { name: 'onSend', type: '(payload: PromptSubmit) => void | Promise<void>', default: 'undefined', description: 'Called when the user sends. Throw or reject to put the message back in the box' },
    { name: 'streaming', type: 'boolean', default: 'false', description: 'While true the send button becomes a Stop button and Escape stops the reply' },
    { name: 'onStop', type: '() => void', default: 'undefined', description: 'Callback fired when the user stops a streaming response' },
    { name: 'models', type: 'PromptModel[]', default: 'DEFAULT_MODELS', description: 'Models rendered in the accessible model picker listbox' },
    { name: 'model', type: 'string', default: 'undefined', description: 'Controlled model id' },
    { name: 'defaultModel', type: 'string', default: 'undefined', description: 'Initial model id when uncontrolled (defaults to the first model)' },
    { name: 'onModelChange', type: '(id: string) => void', default: 'undefined', description: 'Callback fired when the selected model changes' },
    { name: 'placeholder', type: 'string', default: "'Message the assistant…'", description: 'Placeholder text for the textarea' },
    { name: 'maxLength', type: 'number', default: '8000', description: 'Maximum character count before the message is flagged as over the limit' },
    { name: 'maxHeight', type: 'number', default: '224', description: 'Tallest the textarea grows in pixels before it starts scrolling' },
    { name: 'allowAttachments', type: 'boolean', default: 'true', description: 'Enables the attach button, drag-and-drop, and paste file handling' },
    { name: 'maxFiles', type: 'number', default: '5', description: 'Maximum number of attachments allowed at once' },
    { name: 'maxFileSizeMB', type: 'number', default: '10', description: 'Maximum size per attachment in megabytes' },
    { name: 'accept', type: 'string', default: 'undefined', description: 'Accepted file types using the same format as an input accept attribute' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the composer and all of its controls' },
    { name: 'autoFocus', type: 'boolean', default: 'false', description: 'Focuses the textarea when the component mounts' },
    { name: 'enterToSend', type: 'boolean', default: 'desktop only', description: 'Enter sends and Shift+Enter adds a line. Defaults to true on fine pointers and false on touch devices. Cmd/Ctrl+Enter always sends' },
    { name: 'actions', type: 'ReactNode', default: 'undefined', description: 'Extra buttons rendered next to the model picker' },
    { name: 'hint', type: 'ReactNode | false', default: 'keyboard hint', description: 'Footer line under the box. Pass false to hide it' },
    { name: 'safeArea', type: 'boolean', default: 'false', description: 'Pads the bottom for the iPhone home indicator when pinned to the screen bottom' },
    { name: 'className', type: 'string', default: 'undefined', description: 'Custom Tailwind class names for the outer wrapper' },
  ],
  accessibility: [
    'The textarea exposes an aria-label plus an aria-describedby hint and reports errors through role="alert" and aria-live',
    'The model picker is a focusable listbox with aria-activedescendant, Home/End, arrow, typeahead, and Escape handling',
    'Send and Stop share one labelled button and report the character count through aria-live near the limit',
    'Attachment removal buttons include the file name in their aria-label, and drag-and-drop has a visible drop overlay',
    'All motion respects prefers-reduced-motion, including the textarea growth, chips, and streaming glow',
  ],
  usageCode: `import { PromptInput, type PromptSubmit } from "@/components/ui/prompt-input";

export function Demo() {
  const models = [
    { id: "fast", name: "Fast", description: "Quick answers", badge: "Fast" },
    { id: "reasoning", name: "Reasoning", description: "Thinks longer", badge: "Deep" },
  ];

  const handleSend = async ({ text, files, model }: PromptSubmit) => {
    await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ text, files: files.map((f) => f.name), model: model?.id }),
    });
  };

  return (
    <PromptInput
      onSend={handleSend}
      models={models}
      streaming={false}
      onStop={() => {}}
      placeholder="Message the assistant…"
      safeArea
    />
  );
}`,
};

export default meta;
