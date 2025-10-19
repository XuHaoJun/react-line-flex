import * as React from 'react';
import { cn } from '../lib/utils';
import {
  getSizeClass,
  getSizeStyle,
  getMarginClass,
  getMarginStyle,
  getOffsetStyles,
  getFlexClass,
  getFlexStyle,
  handleAction,
} from '../helpers';
import {
  positionVariants,
  weightVariants,
  styleVariants,
  decorationVariants,
  alignVariants,
  gravityVariants,
} from '../variants';
import { Span } from './span';
import type { FlexText, FlexSpan, FlexAction } from '../types';

export type TextProps = FlexText & {
  className?: string;
  onAction?: (action: FlexAction) => void;
};

const Text = React.forwardRef<HTMLDivElement, TextProps>(
  (
    {
      text,
      contents,
      flex,
      margin,
      position,
      offsetTop,
      offsetBottom,
      offsetStart,
      offsetEnd,
      size = 'md',
      align,
      gravity,
      wrap = false,
      maxLines,
      weight,
      color,
      style,
      decoration,
      lineSpacing,
      action,
      onAction,
      className,
    },
    ref
  ) => {
    const sizeClass = getSizeClass(size);
    const sizeStyle = getSizeStyle(size);
    const marginClass = getMarginClass(margin);
    const marginStyle = getMarginStyle(margin);
    const offsetStyles = getOffsetStyles(offsetTop, offsetBottom, offsetStart, offsetEnd);
    const flexClass = getFlexClass(flex);
    const flexStyle = getFlexStyle(flex);

    const containerStyle: React.CSSProperties = {
      ...sizeStyle,
      ...marginStyle,
      ...offsetStyles,
      ...flexStyle,
    };

    const textStyle: React.CSSProperties = {
      ...(color && { color }),
      ...(lineSpacing && {
        lineHeight: `${parseInt(lineSpacing.replace('px', '')) + 15}px`,
      }),
      ...(maxLines && {
        display: '-webkit-box',
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }),
    };

    const clickHandler = handleAction(action, onAction);

    // Convert newlines to <br> tags
    const textContent = text.replace(/\n/g, '<br>');

    const content = (
      <>
        {contents && contents.length > 0 ? (
          <>
            <span dangerouslySetInnerHTML={{ __html: textContent }} />
            {contents.map((span: FlexSpan, index: number) => (
              <Span key={index} {...span} />
            ))}
          </>
        ) : (
          <span dangerouslySetInnerHTML={{ __html: textContent }} />
        )}
      </>
    );

    const textElement = action?.type === 'uri' ? (
      <a
        href={action.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="text-inherit no-underline hover:underline"
        style={textStyle}
        onClick={clickHandler}
      >
        {content}
      </a>
    ) : (
      <p
        className={cn(
          !wrap && 'overflow-hidden text-ellipsis whitespace-nowrap',
          wrap && 'break-words whitespace-normal'
        )}
        style={textStyle}
        onClick={clickHandler}
      >
        {content}
      </p>
    );

    return (
      <div
        ref={ref}
        className={cn(
          'relative min-w-0',
          flexClass,
          sizeClass,
          marginClass,
          position && positionVariants({ position }),
          weight && weightVariants({ weight }),
          style && styleVariants({ style }),
          decoration && decorationVariants({ decoration }),
          align && alignVariants({ align }),
          gravity && gravityVariants({ gravity }),
          action && 'cursor-pointer',
          className
        )}
        style={containerStyle}
      >
        {textElement}
      </div>
    );
  }
);

Text.displayName = 'Text';

export { Text };

