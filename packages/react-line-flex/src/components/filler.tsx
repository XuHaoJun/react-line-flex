import * as React from 'react';
import { cn } from '../lib/utils';
import { getFlexClass, getFlexStyle } from '../helpers';
import type { FlexFiller } from '../types';

export interface FillerProps extends FlexFiller {
  className?: string;
}

const Filler = React.forwardRef<HTMLDivElement, FillerProps>(
  ({ flex, className }, ref) => {
    const flexClass = getFlexClass(flex);
    const flexStyle = getFlexStyle(flex);

    return (
      <div
        ref={ref}
        className={cn('min-h-0', flexClass, className)}
        style={flexStyle}
      />
    );
  }
);

Filler.displayName = 'Filler';

export { Filler };

