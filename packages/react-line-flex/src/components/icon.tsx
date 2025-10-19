import * as React from 'react';
import { cn } from '../lib/utils';
import {
  getSizeClass,
  getSizeStyle,
  getMarginClass,
  getMarginStyle,
  getOffsetStyles,
} from '../helpers';
import { positionVariants } from '../variants';
import type { FlexIcon } from '../types';

export type IconProps = FlexIcon & {
  className?: string;
};

const Icon = React.forwardRef<HTMLDivElement, IconProps>(
  (
    {
      url,
      size = 'md',
      aspectRatio,
      margin,
      position,
      offsetTop,
      offsetBottom,
      offsetStart,
      offsetEnd,
      className,
    },
    ref
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
          'flex-none relative',
          sizeClass,
          marginClass,
          position && positionVariants({ position }),
          className
        )}
        style={style}
      >
        <span
          className="inline-block overflow-hidden bg-center bg-no-repeat bg-contain align-baseline"
          style={iconStyle}
        />
      </div>
    );
  }
);

Icon.displayName = 'Icon';

export { Icon };

