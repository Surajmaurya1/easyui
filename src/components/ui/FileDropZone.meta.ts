import type { EasyUIComponentMeta } from "../../types/component";

const meta: EasyUIComponentMeta = {
  title: "File Drop Zone",
  description:
    "An illustrated file upload card built around an animated folder. The folder opens when you drag a file over it, the paper sinks in as the upload progresses, and a green check pops on when it finishes. Includes a built-in simulated upload and a simple hook for real uploads. Built with React, Tailwind CSS and Framer Motion.",
  category: "Motion",
  tagline: "A folder that opens, fills up and confirms your upload",
  badges: ["Motion", "Tailwind", "Interactive", "SVG"],
  createdAt: "2026-11-03T09:20:38.546Z",
  features: [
    "Five clear states: idle, dragging, uploading, done and error, each with its own folder animation and copy",
    "Folder flap lowers and the paper rises out when a file is dragged over the card",
    "Upload progress traces the card border while the paper sinks into the folder",
    "Success check badge that springs in and draws itself",
    "Drag and drop, click to browse, and keyboard activation all supported",
    "Works out of the box with a simulated upload, or pass onUpload to connect a real one",
    "Vector SVG folder that stays sharp at any size, with light and dark mode styles",
  ],
  props: [
    {
      name: "onUpload",
      type: "(files: File[], onProgress: (loadedBytes: number) => void, signal: AbortSignal) => Promise<void>",
      default: "undefined",
      description:
        "Performs the real upload. Call onProgress with bytes sent as it proceeds, resolve when done, or reject to show the error state. When omitted, a simulated upload runs instead",
    },
    {
      name: "accept",
      type: "string",
      default: "undefined",
      description:
        'Passed to the native file input to filter the browse dialog, for example "image/*,.pdf"',
    },
    {
      name: "multiple",
      type: "boolean",
      default: "true",
      description:
        "Allow more than one file per drop or selection. When false, only the first file is used",
    },
    {
      name: "showSamples",
      type: "boolean",
      default: "true",
      description:
        'Shows the "or try sample files" link under the card, which runs a demo upload',
    },
    {
      name: "resetAfter",
      type: "number",
      default: "2500",
      description:
        "Milliseconds to stay on the success state before returning to idle. Use 0 to keep it",
    },
    {
      name: "className",
      type: "string",
      default: '""',
      description: "Optional Tailwind classes applied to the outer wrapper",
    },
  ],
  accessibility: [
    "Respects prefers-reduced-motion: transitions and the check animation become instant",
    'The card is a focusable role="button" that opens the file browser with Enter or Space',
    "Visible focus-visible ring on the card and on the sample files link",
    "Status text is announced politely to screen readers through aria-live",
    "aria-disabled is set while an upload is in progress, and drops are ignored",
    "Decorative folder and progress graphics are marked aria-hidden",
  ],
  usageCode: `import { useState } from "react";
import { FileDropZone } from "@/components/ui/file-drop-zone";

export function Demo() {
  const [log, setLog] = useState<string[]>([]);

  return (
    <FileDropZone
      accept="image/*,.pdf"
      onUpload={async (files, onProgress, signal) => {
        const total = files.reduce((sum, f) => sum + f.size, 0);
        // Replace with your real upload (fetch, XHR, S3, etc.)
        for (let sent = 0; sent < total; sent += total / 20) {
          if (signal.aborted) return;
          await new Promise((r) => setTimeout(r, 100));
          onProgress(Math.min(total, Math.round(sent)));
        }
        setLog((prev) => [...prev, ...files.map((f) => f.name)]);
      }}
    />
  );
}`,
};

export default meta;
