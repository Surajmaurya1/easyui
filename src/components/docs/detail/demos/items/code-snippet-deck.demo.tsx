import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { CodeSnippetDeck } = DEMO_COMPONENTS;

export const meta = { id: 'code-snippet-deck', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([CodeSnippetDeck.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="w-full">
          <CodeSnippetDeck
            key={demoKey}
            snippets={[
              {
                language: 'typescript',
                label: 'TypeScript',
                filename: 'client.ts',
                highlightLines: [4, 5],
                code: (p: { apiKey?: string; env?: string; stream?: boolean }) => `import { EasyClient } from "@easyui/sdk";

// Initialize resilient client
const client = new EasyClient({
  apiKey: "${p.apiKey || 'sk_live_9981'}",
  environment: "${p.env || 'production'}",
  streaming: ${p.stream ? 'true' : 'false'},
});

// Stream AI generation with zero layout shift
const completion = await client.completions.create({
  model: "easy-4o",
  prompt: "Synthesize dark UI telemetry dashboard",
});`,
              },
              {
                language: 'curl',
                label: 'cURL',
                filename: 'stream.sh',
                highlightLines: [2],
                code: (p: { apiKey?: string; env?: string; stream?: boolean }) => `curl -X POST https://api.easyui.dev/v1/completions \\
  -H "Authorization: Bearer ${p.apiKey || 'sk_live_9981'}" \\
  -H "Content-Type: application/json" \\
  -d '{
  "model": "easy-4o",
  "environment": "${p.env || 'production'}",
  "stream": ${p.stream ? 'true' : 'false'}
  }'`,
              },
            ]}
            parameters={[
              { id: 'stream', label: 'Stream response', type: 'boolean', defaultValue: true },
              {
                id: 'env',
                label: 'Environment',
                type: 'select',
                defaultValue: 'production',
                options: ['production', 'staging', 'development'],
              },
            ]}
            defaultLanguage="typescript"
          />
        </div>
      );
}
