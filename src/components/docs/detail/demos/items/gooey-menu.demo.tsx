import { ChevronDown, UserRound } from 'lucide-react';
import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { GooeyMenu } = DEMO_COMPONENTS;

export const meta = { id: 'gooey-menu', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([GooeyMenu.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
  const profileOptions = ['Profile', 'Settings', 'Privacy and Security', 'Notifications', 'Log out'];
  const optionClassName = (option: string) => option === 'Log out' ? 'text-red-400 hover:text-red-300' : undefined;

  return (
    <div className="flex flex-wrap items-start justify-center gap-x-12 gap-y-8 px-6 py-10">
      <section className="w-[306px]" data-testid="gooey-menu-default-demo">
        <GooeyMenu key={`default-${demoKey}`} />
      </section>

      <section className="w-[232px]" data-testid="gooey-menu-profile-demo">
        <div className="min-h-[320px]">
          <GooeyMenu
            key={`profile-${demoKey}`}
            width={232}
            options={profileOptions}
            optionClassName={optionClassName}
            triggerLabel="Open profile menu"
            triggerClassName="justify-center text-white"
            triggerStyle={{ width: 44, height: 44, padding: 0, borderRadius: '50%' }}
            trigger={
              <span aria-hidden="true" className="flex h-full w-full items-center justify-center rounded-full bg-black dark:bg-[#0E0E0E]">
                <UserRound size={24} />
              </span>
            }
          />
        </div>
      </section>

      <section className="w-[232px]" data-testid="gooey-menu-compact-demo">
        <div className="flex min-h-[320px] justify-end">
          <GooeyMenu
            key={`compact-${demoKey}`}
            width={232}
            align="end"
            options={profileOptions}
            optionClassName={optionClassName}
            triggerLabel="Open account menu"
            triggerStyle={{ width: 156, height: 44, borderRadius: 12, padding: '0 12px' }}
            trigger={
              <span className="flex w-full items-center justify-between gap-2 text-sm text-white">
                <UserRound size={18} aria-hidden="true" />
                My account
                <ChevronDown size={16} aria-hidden="true" />
              </span>
            }
          />
        </div>
      </section>
    </div>
  );
}
