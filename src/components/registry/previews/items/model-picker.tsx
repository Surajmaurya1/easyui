import { DEMO_MODELS, ModelPicker } from '../../../ui/ModelPicker';
import type { ComponentPreviewProps } from '../types';

export default function ModelPickerPreview(_props: ComponentPreviewProps) {
  return (
    <div className="flex h-52 items-center justify-center p-4">
      <div className="pointer-events-auto" onClick={(event) => event.stopPropagation()}>
        <ModelPicker models={DEMO_MODELS} defaultValue="gpt" />
      </div>
    </div>
  );
}
