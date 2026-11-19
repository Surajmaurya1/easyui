import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { Login } = DEMO_COMPONENTS;

export const meta = { id: 'login', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([Login.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-4 flex justify-center w-full">
          <Login
            key={demoKey}
            onSubmit={(data: Record<string, unknown>) => alert(`Login Attempt: ${JSON.stringify(data)}`)}
            onForgotPassword={() => alert('Forgot password action')}
            onSignUpClick={() => alert('Switch to sign up')}
            onSocialLogin={(prov: string) => alert(`SSO provider: ${prov}`)}
          />
        </div>
      );
}
