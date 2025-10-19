import * as React from 'react';

import { getSizeClass, getSizeStyle, getMarginClass, getMarginStyle, getOffsetStyles } from '@/lib/lf-helpers';
import type { FlexIcon } from '@/lib/lf-types';
import { positionVariants } from '@/lib/lf-variants';
import { cn } from '@/lib/utils';

export type LfIconProps = FlexIcon & {
  className?: string;
};

const LfIcon = React.forwardRef<HTMLDivElement, LfIconProps>(
  (
    { url, size = 'md', aspectRatio, margin, position, offsetTop, offsetBottom, offsetStart, offsetEnd, className },
    ref,
  ) => {
    const sizeClass = getSizeClass(size);
    const sizeStyle = getSizeStyle(size);
    const marginClass = getMarginClass(margin);
    const marginStyle = getMarginStyle(margin);
    const offsetStyles = getOffsetStyles(offsetTop, offsetBottom, offsetStart, offsetEnd);

    // Calculate aspect ratio width
    let width = '1em';
    if (aspectRatio) {
      const parts = aspectRatio.split(':').map(Number);
      const [w, h] = parts;
      if (w && h) {
        width = `${w / h}em`;
      }
    }

    const style: React.CSSProperties = {
      ...sizeStyle,
      ...marginStyle,
      ...offsetStyles,
    };

    const iconStyle: React.CSSProperties = {
      backgroundImage: `url('${url}')`,
      width,
      height: '1em',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex-none',
          sizeClass,
          marginClass,
          position && positionVariants({ position }),
          className,
        )}
        style={style}
      >
        <span
          className="inline-block overflow-hidden bg-contain bg-center bg-no-repeat align-baseline"
          style={iconStyle}
        />
      </div>
    );
  },
);

LfIcon.displayName = 'LfIcon';

export { LfIcon };
