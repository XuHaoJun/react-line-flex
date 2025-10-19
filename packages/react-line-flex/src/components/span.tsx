import * as React from 'react';
import { cn } from '../lib/utils';
import { getSizeClass, getSizeStyle } from '../helpers';
import { weightVariants, styleVariants, decorationVariants } from '../variants';
import type { FlexSpan } from '../types';

export interface SpanProps extends FlexSpan {
  className?: string;
}

const Span = React.forwardRef<HTMLSpanElement, SpanProps>(
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
          className
        )}
        style={inlineStyle}
      >
        {text}
      </span>
    );
  }
);

Span.displayName = 'Span';

export { Span };

