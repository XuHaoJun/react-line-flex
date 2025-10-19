import * as React from 'react';

import { getSizeClass, getSizeStyle } from '@/lib/lf-helpers';
import type { FlexSpan } from '@/lib/lf-types';
import { weightVariants, styleVariants, decorationVariants } from '@/lib/lf-variants';
import { cn } from '@/lib/utils';

export interface LfSpanProps extends FlexSpan {
  className?: string;
}

const LfSpan = React.forwardRef<HTMLSpanElement, LfSpanProps>(
  ({ text, size, color, weight, style, decoration, className }, ref) => {
    const sizeClass = getSizeClass(size);
    const sizeStyle = getSizeStyle(size);

    const inlineStyle: React.CSSProperties = {
      ...sizeStyle,
      ...(color && { color }),
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inherit',
          sizeClass,
          weight && weightVariants({ weight }),
          style && styleVariants({ style }),
          decoration && decorationVariants({ decoration }),
          className,
        )}
        style={inlineStyle}
      >
        {text}
      </span>
    );
  },
);

LfSpan.displayName = 'LfSpan';

export { LfSpan };
