import * as React from 'react';

import { getFlexClass, getFlexStyle } from '@/lib/lf-helpers';
import type { FlexFiller } from '@/lib/lf-types';
import { cn } from '@/lib/utils';

export interface LfFillerProps extends FlexFiller {
  className?: string;
}

const LfFiller = React.forwardRef<HTMLDivElement, LfFillerProps>(({ flex, className }, ref) => {
  const flexClass = getFlexClass(flex);
  const flexStyle = getFlexStyle(flex);

  return <div ref={ref} className={cn('min-h-0', flexClass, className)} style={flexStyle} />;
});

LfFiller.displayName = 'LfFiller';

export { LfFiller };
