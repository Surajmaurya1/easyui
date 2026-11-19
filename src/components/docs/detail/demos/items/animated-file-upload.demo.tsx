import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { AnimatedFileUpload } = DEMO_COMPONENTS;

export const meta = { id: 'animated-file-upload', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([AnimatedFileUpload.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-4 w-full max-w-lg mx-auto">
          <AnimatedFileUpload
            key={demoKey}
            multiple
            accept="image/*,application/pdf"
            maxSize={15 * 1024 * 1024}
            onFilesSelected={(files: File[]) => console.log('Selected:', files)}
            onUploadComplete={(file: File) => console.log('Uploaded:', file.name)}
          />
        </div>
      );
}
