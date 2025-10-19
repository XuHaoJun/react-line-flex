import * as React from 'react';

import { cn } from '@/lib/utils';

import { getMarginClass, getMarginStyle } from './utils/lf-helpers';
import type { FlexSeparator } from './utils/lf-types';

export interface LfSeparatorProps extends FlexSeparator {
  className?: string;
  layout?: 'horizontal' | 'vertical' | 'baseline';
}

const LfSeparator = React.forwardRef<HTMLDivElement, LfSeparatorProps>(
  ({ margin, color, className, layout = 'vertical' }, ref) => {
    const marginClass = getMarginClass(margin);
    const marginStyle = getMarginStyle(margin);

    const style: React.CSSProperties = {
      ...marginStyle,
      ...(color && { borderColor: color }),
    };

    const isHorizontal = layout === 'horizontal' || layout === 'baseline';

    return (
      <div
        ref={ref}
        className={cn(
          'flex-none',
          !isHorizontal ? 'h-px w-full border-t border-[#d4d6da]' : 'h-full w-px border-l border-[#d4d6da]',
          marginClass,
          className,
        )}
        style={style}
      />
    );
  },
);

LfSeparator.displayName = 'LfSeparator';

export { LfSeparator };
