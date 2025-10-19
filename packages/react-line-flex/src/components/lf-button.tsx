import * as React from 'react';

import {
  getMarginClass,
  getMarginStyle,
  getOffsetStyles,
  getFlexClass,
  getFlexStyle,
  handleAction,
} from '@/lib/lf-helpers';
import type { FlexButton, FlexAction } from '@/lib/lf-types';
import { positionVariants, gravityVariants, buttonStyleVariants } from '@/lib/lf-variants';
import { cn } from '@/lib/utils';

export type LfButtonProps = FlexButton & {
  className?: string;
  onAction?: (action: FlexAction) => void;
};

const LfButton = React.forwardRef<HTMLDivElement, LfButtonProps>(
  (
    {
      action,
      flex,
      margin,
      position,
      offsetTop,
      offsetBottom,
      offsetStart,
      offsetEnd,
      height = 'md',
      style = 'link',
      color,
      gravity,
      adjustMode,
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

    const containerStyle: React.CSSProperties = {
      ...marginStyle,
      ...offsetStyles,
      ...flexStyle,
    };

    const buttonStyle: React.CSSProperties = {
      ...(color && (style === 'link' ? { color } : { backgroundColor: color })),
    };

    const clickHandler = handleAction(action, onAction);

    return (
      <div
        ref={ref}
        className={cn(
          'relative min-w-0',
          flexClass,
          marginClass,
          position && positionVariants({ position }),
          gravity && gravityVariants({ gravity }),
          className,
        )}
        style={containerStyle}
      >
        {action?.type === 'uri' ? (
          <a
            href={action.uri}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonStyleVariants({ buttonStyle: style, height }), 'w-full')}
            style={buttonStyle}
            onClick={clickHandler}
          >
            <div className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">{action.label || 'Button'}</div>
          </a>
        ) : (
          <button
            type="button"
            className={cn(buttonStyleVariants({ buttonStyle: style, height }), 'w-full')}
            style={buttonStyle}
            onClick={clickHandler}
          >
            <div className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">{action.label || 'Button'}</div>
          </button>
        )}
      </div>
    );
  },
);

LfButton.displayName = 'LfButton';

export { LfButton };
