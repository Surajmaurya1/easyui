import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';


const { SmartComparison } = DEMO_COMPONENTS;

export const meta = { id: 'smart-comparison', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([SmartComparison.preload()]);
}

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
return (
        <div className="w-full">
          <SmartComparison
            key={demoKey}
            plans={[
              {
                id: 'hobby',
                name: 'Hobby',
                tagline: 'Ideal for prototyping & indie hackers',
                price: '$0',
                billingPeriod: 'mo',
                ctaText: 'Deploy Free',
              },
              {
                id: 'pro',
                name: 'Pro Team',
                tagline: 'High concurrency & edge bandwidth',
                price: '$29',
                billingPeriod: 'mo',
                featured: true,
                badge: 'Popular',
                ctaText: 'Start 14-Day Trial',
              },
              {
                id: 'enterprise',
                name: 'Enterprise',
                tagline: 'Dedicated compliance & custom SLAs',
                price: '$249',
                billingPeriod: 'mo',
                ctaText: 'Contact Sales',
              },
            ]}
            categories={[
              {
                id: 'compute',
                title: 'Compute & Edge Performance',
                features: [
                  {
                    id: 'concurrency',
                    name: 'Serverless Concurrency',
                    description: 'Simultaneous function invocations across regions',
                    values: { hobby: '10 nodes', pro: '250 nodes', enterprise: 'Unlimited' },
                  },
                  {
                    id: 'edge_routes',
                    name: 'Global Edge Routing',
                    description: 'Low-latency routing from 300+ PoPs worldwide',
                    values: { hobby: false, pro: true, enterprise: true },
                  },
                  {
                    id: 'warm_standby',
                    name: '0ms Cold Start Standby',
                    description: 'Keeps microVMs warm in background',
                    values: { hobby: false, pro: false, enterprise: true },
                  },
                ],
              },
              {
                id: 'security',
                title: 'Security & Governance',
                features: [
                  {
                    id: 'sso',
                    name: 'SAML / Okta SSO',
                    description: 'Enterprise identity provider federation',
                    values: { hobby: false, pro: true, enterprise: true },
                  },
                  {
                    id: 'audit_logs',
                    name: 'Immutable Audit Logs',
                    description: 'Cryptographically verified audit trail retention',
                    values: { hobby: '7 days', pro: '90 days', enterprise: '7 years' },
                  },
                ],
              },
            ]}
          />
        </div>
      );
}
