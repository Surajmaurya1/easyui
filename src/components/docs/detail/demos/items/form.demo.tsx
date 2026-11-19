import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { Button, Form, FormItem, FormLabel, FormControl, FormDescription, Input, Select, Checkbox, Switch } = DEMO_COMPONENTS;

export const meta = { id: 'form', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([Button.preload(), Form.preload(), FormItem.preload(), FormLabel.preload(), FormControl.preload(), FormDescription.preload(), Input.preload(), Select.preload(), Checkbox.preload(), Switch.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-4 max-w-md mx-auto w-full">
          <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-[#1F1F1F] space-y-4">
            <div className="text-sm font-semibold text-[#FAFAFA]">Interactive Form System</div>
            <Form
              key={demoKey}
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                alert('Form submitted successfully!');
              }}
              className="space-y-4"
            >
              <FormItem>
                <FormLabel required>Project Name</FormLabel>
                <FormControl>
                  <Input defaultValue="EasyUI Studio" placeholder="Enter project name" />
                </FormControl>
                <FormDescription>Visible across your team members.</FormDescription>
              </FormItem>

              <FormItem>
                <FormLabel>Deployment Region</FormLabel>
                <FormControl>
                  <Select
                    options={[
                      { value: 'us-east', label: 'US East (N. Virginia)' },
                      { value: 'eu-central', label: 'EU Central (Frankfurt)' },
                      { value: 'ap-southeast', label: 'Asia Pacific (Tokyo)' },
                    ]}
                  />
                </FormControl>
              </FormItem>

              <div className="pt-1 space-y-3 border-t border-[#1F1F1F]">
                <Checkbox label="Enable Edge Caching" defaultChecked />
                <Switch label="Automatic TLS Certificates" defaultChecked />
              </div>

              <Button type="submit" variant="primary" fullWidth className="mt-2">
                Save Configuration
              </Button>
            </Form>
          </div>
        </div>
      );
}
