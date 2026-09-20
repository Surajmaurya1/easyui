import { WalletCard } from '../../../ui/WalletCard';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 w-full flex items-center justify-center p-3 pointer-events-none overflow-hidden">
            {/* Outer container holds the slot; the inner wallet card is
                rendered at its natural 458×285 size and visually scaled
                to fit so the text and fixed-positioned content all
                scale together and never overlap. */}
            <div className="w-[290px] h-[180px] overflow-hidden flex items-center justify-center">
              <div
                className="origin-center shrink-0"
                style={{ width: 458, height: 285, transform: 'scale(0.6)' }}
              >
                <WalletCard
                  balance={hovered ? '$5,128.40' : '$4,566.00'}
                  buttonLabel="Use Wallet"
                  cardType="Mastercard"
                  cardLastFour="3040"
                />
              </div>
            </div>
          </div>
        );
}
