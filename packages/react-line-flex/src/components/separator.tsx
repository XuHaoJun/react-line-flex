import * as React from 'react';
import { cn } from '../lib/utils';
import { getMarginClass, getMarginStyle } from '../helpers';
import type { FlexSeparator } from '../types';

export interface SeparatorProps extends FlexSeparator {
  className?: string;
  layout?: 'horizontal' | 'vertical' | 'baseline';
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
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
          !isHorizontal ? 'w-full h-px border-t border-[#d4d6da]' : 'h-full w-px border-l border-[#d4d6da]',
          marginClass,
          className
        )}
        style={style}
      />
    );
  }
);

Separator.displayName = 'Separator';

export { Separator };

