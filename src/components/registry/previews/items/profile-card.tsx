import { ProfileCard } from '../../../ui/ProfileCard';
import type { ComponentPreviewProps } from '../types';

export default function Preview(_props: ComponentPreviewProps) {
  return (
          <div className="h-52 w-full flex items-center justify-center p-2 pointer-events-none overflow-hidden">
            {/* Card is rendered at its natural 586×~540 size and
                visually scaled to fit the card slot — so all text
                and absolute-positioned content scale together.
                Scale 0.36 → 211px wide × 194px tall, fills the
                slot without overflow. */}
            <div className="w-[230px] h-[200px] overflow-hidden flex items-center justify-center">
              <div
                className="origin-center shrink-0"
                style={{ width: 586, transform: 'scale(0.36)' }}
              >
                <ProfileCard
                  name="Suraj"
                  username="@surajmaurya_m"
                  description="Building EasyUI. Engineer."
                  followers="200K"
                  posts="72"
                  website="easyui.site"
                />
              </div>
            </div>
          </div>
        );
}
