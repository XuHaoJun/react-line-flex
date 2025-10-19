import * as React from 'react';

import { cn } from '@workspace/ui/lib/utils';

import {
  getMarginClass,
  getMarginStyle,
  getOffsetStyles,
  getFlexClass,
  getFlexStyle,
  handleAction,
} from './utils/lf-helpers';
import type { FlexImage, FlexAction } from './utils/lf-types';
import { positionVariants, gravityVariants } from './utils/lf-variants';

export type LfImageProps = FlexImage & {
  className?: string;
  onAction?: (action: FlexAction) => void;
};

const LfImage = React.forwardRef<HTMLDivElement, LfImageProps>(
  (
    {
      url,
      flex,
      margin,
      position,
      offsetTop,
      offsetBottom,
      offsetStart,
      offsetEnd,
      align,
      gravity,
      size = 'md',
      aspectRatio,
      aspectMode = 'fit',
      backgroundColor,
      action,
      onAction,
      className,
    },
    ref,
  ) => {
    const marginClass = getMarginClass(margin);
    const marginStyle = getMarginStyle(margin);
    const offsetStyles = getOffsetStyles(offsetTop, offsetBottom, offsetStart, offsetEnd);
    const flexClass = getFlexClass(flex);
    const flexStyle = getFlexStyle(flex);

    const imageSizeMap: Record<string, string> = {
      xxs: 'w-[40px]',
      xs: 'w-[60px]',
      sm: 'w-[80px]',
      md: 'w-[100px]',
      lg: 'w-[120px]',
      xl: 'w-[140px]',
      xxl: 'w-[160px]',
      '3xl': 'w-[180px]',
      '4xl': 'w-[200px]',
      '5xl': 'w-[220px]',
      full: 'w-full',
    };

    // Calculate padding-bottom percentage for aspect ratio (like flex2html.js)
    const aspectRatioMap: Record<string, number> = {
      '1:1': 100,
      '1.51:1': 66.22517,
      '1.91:1': 52.35602,
      '20:13': 65,
      '4:3': 75,
      '16:9': 56.25,
      '2:1': 50,
      '3:1': 33.33333,
      '3:4': 133.33333,
      '9:16': 177.77778,
      '1:2': 200,
      '1:3': 300,
    };

    const paddingBottom = aspectRatio ? aspectRatioMap[aspectRatio] || 100 : 100;

    const sizeClass =
      typeof size === 'string' && !size.includes('px') && !size.includes('%') ? imageSizeMap[size] || 'w-[100px]' : '';

    const containerStyle: React.CSSProperties = {
      ...marginStyle,
      ...offsetStyles,
      ...flexStyle,
      ...(typeof size === 'string' && (size.includes('px') || size.includes('%')) && { width: size }),
    };

    const linkStyle: React.CSSProperties = {
      paddingBottom: `${paddingBottom}%`,
    };

    const imageStyle: React.CSSProperties = {
      backgroundImage: `url('${url}')`,
      backgroundSize: aspectMode === 'cover' ? 'cover' : 'contain',
      ...(backgroundColor && { backgroundColor }),
    };

    const clickHandler = handleAction(action, onAction);

    const alignClass = align === 'start' ? 'items-start' : align === 'end' ? 'items-end' : 'items-center';
    const gravityClass = gravity && gravityVariants({ gravity });

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex min-w-0 items-center overflow-hidden',
          flexClass,
          marginClass,
          position && positionVariants({ position }),
          alignClass,
          gravityClass,
          className,
        )}
        style={containerStyle}
      >
        <div className={cn('max-w-full', sizeClass)}>
          {action?.type === 'uri' ? (
            <a
              href={action.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block w-full"
              style={linkStyle}
              onClick={clickHandler}
            >
              <span
                className="absolute inset-0 top-0 right-0 bottom-0 left-0 block overflow-hidden bg-center bg-no-repeat"
                style={imageStyle}
              />
            </a>
          ) : (
            <div
              className={cn('relative block w-full', action && 'cursor-pointer')}
              style={linkStyle}
              onClick={clickHandler}
            >
              <span
                className="absolute inset-0 top-0 right-0 bottom-0 left-0 block overflow-hidden bg-center bg-no-repeat"
                style={imageStyle}
              />
            </div>
          )}
        </div>
      </div>
    );
  },
);

LfImage.displayName = 'LfImage';

export { LfImage };
