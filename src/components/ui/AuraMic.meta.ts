import type { EasyUIComponentMeta } from "../../types/component";

const meta: EasyUIComponentMeta = {
  title: "Aura Mic",
  description:
    "A black and white microphone toggle that surrounds itself with a unique animated aura while listening. Six styles are included: halftone, moire, thread, ink, eclipse and ridgeline. Built with React, Tailwind CSS and Framer Motion.",
  category: "Motion",
  tagline: "A mic button with a monochrome, living aura",
  badges: ["Motion", "Tailwind", "Interactive", "SVG"],
  createdAt: "2026-11-03T09:07:41.127Z",
  features: [
    "Six distinct monochrome aura animations: halftone, moire, thread, ink, eclipse and ridgeline",
    "Strictly black and white. Everything is drawn with currentColor, so it flips automatically between light and dark mode",
    "Outlined button when idle, inverted solid button when listening, so the state is clear without colour",
    "Vector SVG auras that stay sharp at any size",
    "Animated icon swap between Mic and MicOff",
    "Fades the aura in and out smoothly when listening starts or stops",
  ],
  props: [
    {
      name: "animation",
      type: '"halftone" | "moire" | "thread" | "ink" | "eclipse" | "ridgeline"',
      default: '"halftone"',
      description: "Which aura animation plays while listening",
    },
    {
      name: "size",
      type: "number",
      default: "76",
      description:
        "Diameter of the mic button in pixels. The aura scales around it inside a 220px stage",
    },
    {
      name: "onListeningChange",
      type: "(listening: boolean) => void",
      default: "undefined",
      description:
        "Called once each time the mic is toggled, with the new listening state",
    },
  ],
  accessibility: [
    "Respects prefers-reduced-motion: the aura is skipped and only the button toggles",
    "Native button element with Enter and Space keyboard support",
    "Visible focus-visible outline in both light and dark mode",
    'aria-pressed and a dynamic aria-label ("Start listening" / "Stop listening") announce the state',
    "Aura graphics are marked aria-hidden so screen readers ignore the decoration",
  ],
  usageCode: `import { useState } from "react";
import { AuraMic } from "@/components/ui/aura-mic";

export function Demo() {
  const [listening, setListening] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <AuraMic
        animation="ink"
        size={76}
        onListeningChange={setListening}
      />
      <p className="text-sm text-zinc-500">
        {listening ? "Listening..." : "Tap to speak"}
      </p>
    </div>
  );
}`,
};

export default meta;
