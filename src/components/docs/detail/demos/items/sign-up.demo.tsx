import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { SignUp } = DEMO_COMPONENTS;

export const meta = { id: 'sign-up', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([SignUp.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="py-4 flex justify-center w-full">
          <SignUp
            key={demoKey}
            onSubmit={(data: { name: string; email: string }) => alert(`Registration: ${data.name} (${data.email})`)}
            onSignInClick={() => alert('Switch to sign in')}
            onSocialSignUp={(prov: string) => alert(`Social sign up: ${prov}`)}
          />
        </div>
      );
}
