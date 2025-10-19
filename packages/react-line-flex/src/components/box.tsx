import * as React from 'react';
import { cn } from '../lib/utils';
import {
  getMarginClass,
  getMarginStyle,
  getSpacingClass,
  getSpacingStyle,
  getOffsetStyles,
  getPaddingStyles,
  getFlexClass,
  getFlexStyle,
  getCornerRadiusClass,
  getCornerRadiusStyle,
  getBorderWidthClass,
  getBorderWidthStyle,
  getBackgroundGradientStyle,
  handleAction,
} from '../helpers';
import {
  layoutVariants,
  positionVariants,
  justifyContentVariants,
  alignItemsVariants,
} from '../variants';
import type { FlexBox, FlexComponent, FlexAction } from '../types';

// Import component renderers
import { Button } from './button';
import { Filler } from './filler';
import { Icon } from './icon';
import { Image } from './image';
import { Separator } from './separator';
import { Spacer } from './spacer';
import { Text } from './text';
import { Video } from './video';

export type BoxProps = FlexBox & {
  className?: string;
  onAction?: (action: FlexAction) => void;
};

// Component renderer function
export function renderFlexComponent(
  component: FlexComponent,
  index: number,
  layout?: 'horizontal' | 'vertical' | 'baseline',
  onAction?: (action: FlexAction) => void
): React.ReactNode {
  const key = `${component.type}-${index}`;

  switch (component.type) {
    case 'box':
      return <Box key={key} {...component} onAction={onAction} />;
    case 'button':
      return <Button key={key} {...component} onAction={onAction} />;
    case 'filler':
      return <Filler key={key} {...component} />;
    case 'icon':
      return <Icon key={key} {...component} />;
    case 'image':
      return <Image key={key} {...component} onAction={onAction} />;
    case 'separator':
      return <Separator key={key} {...component} layout={layout} />;
    case 'spacer':
      return <Spacer key={key} {...component} />;
    case 'text':
      return <Text key={key} {...component} onAction={onAction} />;
    case 'video':
      return <Video key={key} {...component} />;
    default:
      return null;
  }
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      layout = 'vertical',
      contents,
      flex,
      spacing,
      margin,
      paddingAll,
      paddingTop,
      paddingBottom,
      paddingStart,
      paddingEnd,
      position,
      offsetTop,
      offsetBottom,
      offsetStart,
      offsetEnd,
      backgroundColor,
      borderColor,
      borderWidth,
      cornerRadius,
      width,
      maxWidth,
      height,
      maxHeight,
      justifyContent,
      alignItems,
      background,
      action,
      onAction,
      className,
    },
    ref
  ) => {
    const marginClass = getMarginClass(margin);
    const marginStyle = getMarginStyle(margin);
    const spacingClass = getSpacingClass(spacing);
    const spacingStyle = getSpacingStyle(spacing);
    const offsetStyles = getOffsetStyles(offsetTop, offsetBottom, offsetStart, offsetEnd);
    const paddingStyles = getPaddingStyles(
      paddingAll,
      paddingTop,
      paddingBottom,
      paddingStart,
      paddingEnd
    );
    const flexClass = getFlexClass(flex);
    const flexStyle = getFlexStyle(flex);
    const cornerRadiusClass = getCornerRadiusClass(cornerRadius);
    const cornerRadiusStyle = getCornerRadiusStyle(cornerRadius);
    const borderWidthClass = getBorderWidthClass(borderWidth);
    const borderWidthStyle = getBorderWidthStyle(borderWidth);
    const backgroundGradientStyle = getBackgroundGradientStyle(background);

    const containerStyle: React.CSSProperties = {
      ...marginStyle,
      ...spacingStyle,
      ...offsetStyles,
      ...paddingStyles,
      ...flexStyle,
      ...cornerRadiusStyle,
      ...borderWidthStyle,
      ...backgroundGradientStyle,
      ...(backgroundColor && { backgroundColor }),
      ...(borderColor && { borderColor }),
      ...(width && { width, maxWidth: width }),
      ...(maxWidth && { maxWidth }),
      ...(height && { height }),
      ...(maxHeight && { maxHeight }),
    };

    const clickHandler = handleAction(action, onAction);

    return (
      <div
        ref={ref}
        className={cn(
          'overflow-hidden relative min-w-0 max-w-full',
          layoutVariants({ layout }),
          flexClass,
          spacingClass,
          marginClass,
          cornerRadiusClass,
          borderWidthClass,
          borderWidth && 'border-solid',
          position && positionVariants({ position }),
          justifyContent && justifyContentVariants({ justifyContent }),
          alignItems && alignItemsVariants({ alignItems }),
          action && 'cursor-pointer',
          className
        )}
        style={containerStyle}
        onClick={clickHandler}
      >
        {contents.map((component: FlexComponent, index: number) =>
          renderFlexComponent(component, index, layout, onAction)
        )}
      </div>
    );
  }
);

Box.displayName = 'Box';

export { Box };

