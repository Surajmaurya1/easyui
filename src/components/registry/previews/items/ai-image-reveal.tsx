import { AIImageReveal } from '../../../ui/AIImageReveal';
import type { ComponentPreviewProps } from '../types';

const IMAGE_URL = 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85';

export default function AIImageRevealPreview(_props: ComponentPreviewProps) {
  return (
    <div className="h-52 w-full flex items-center justify-center overflow-hidden px-8 py-4 pointer-events-none">
      <div className="w-full max-w-40">
        <AIImageReveal src={IMAGE_URL} alt="Mountain lake at sunset" aspectRatio={4 / 3} duration={2.4} />
      </div>
    </div>
  );
}
