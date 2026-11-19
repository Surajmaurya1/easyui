import React, { useState } from 'react';
import type { Sponsor } from '../../lib/sponsors';
import { cn } from '../../lib/utils';

export interface SponsorLogoProps {
  sponsor: Sponsor;
  className?: string;
  imgClassName?: string;
}

/**
 * Renders the light logo, swapping to `logoDark` when the `.dark` theme class
 * is active. The dark variant is decorative because the light image already
 * carries the accessible name.
 */
export const SponsorLogo: React.FC<SponsorLogoProps> = ({
  sponsor,
  className,
  imgClassName,
}) => {
  const [failed, setFailed] = useState(false);
  const imageClass = cn('h-4 w-auto max-w-[120px] object-contain', imgClassName);

  return (
    <span className={cn('inline-flex h-6 items-center', className)}>
      {failed ? (
        <span className="max-w-[140px] truncate text-[12px] font-medium text-text-secondary">{sponsor.name}</span>
      ) : (
        <>
          <img src={sponsor.logo} alt={`${sponsor.name} logo`} className={cn(imageClass, sponsor.logoDark && 'dark:hidden')} decoding="async" onError={() => setFailed(true)} />
          {sponsor.logoDark && <img src={sponsor.logoDark} alt="" aria-hidden="true" className={cn(imageClass, 'hidden dark:block')} decoding="async" onError={() => setFailed(true)} />}
        </>
      )}
    </span>
  );
};
