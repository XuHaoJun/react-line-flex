import * as React from 'react';

import { cn } from '@/lib/utils';

// Import component renderers
import { LfButton } from './lf-button';
import { LfFiller } from './lf-filler';
import { LfIcon } from './lf-icon';
import { LfImage } from './lf-image';
import { LfSeparator } from './lf-separator';
import { LfSpacer } from './lf-spacer';
import { LfText } from './lf-text';
import { LfVideo } from './lf-video';
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
} from './utils/lf-helpers';
import type { FlexBox, FlexComponent, FlexAction } from './utils/lf-types';
import { layoutVariants, positionVariants, justifyContentVariants, alignItemsVariants } from './utils/lf-variants';

export type LfBoxProps = FlexBox & {
  className?: string;
  onAction?: (action: FlexAction) => void;
};

// Component renderer function
export function renderLfFlexComponent(
  component: FlexComponent,
  index: number,
  layout?: 'horizontal' | 'vertical' | 'baseline',
  onAction?: (action: FlexAction) => void,
): React.ReactNode {
  const key = `${component.type}-${index}`;

  switch (component.type) {
    case 'box':
      return <LfBox key={key} {...component} onAction={onAction} />;
    case 'button':
      return <LfButton key={key} {...component} onAction={onAction} />;
    case 'filler':
      return <LfFiller key={key} {...component} />;
    case 'icon':
      return <LfIcon key={key} {...component} />;
    case 'image':
      return <LfImage key={key} {...component} onAction={onAction} />;
    case 'separator':
      return <LfSeparator key={key} {...component} layout={layout} />;
    case 'spacer':
      return <LfSpacer key={key} {...component} />;
    case 'text':
      return <LfText key={key} {...component} layout={layout} onAction={onAction} />;
    case 'video':
      return <LfVideo key={key} {...component} />;
    default:
      return null;
  }
}

const LfBox = React.forwardRef<HTMLDivElement, LfBoxProps>(
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
    ref,
  ) => {
    const marginClass = getMarginClass(margin);
    const marginStyle = getMarginStyle(margin);
    const spacingClass = getSpacingClass(spacing);
    const spacingStyle = getSpacingStyle(spacing);
    const offsetStyles = getOffsetStyles(offsetTop, offsetBottom, offsetStart, offsetEnd);
    const paddingStyles = getPaddingStyles(paddingAll, paddingTop, paddingBottom, paddingStart, paddingEnd);
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
          'lf-box relative max-w-full min-w-0 overflow-hidden',
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
          className,
        )}
        style={containerStyle}
        onClick={clickHandler}
      >
        {contents.map((component: FlexComponent, index: number) =>
          renderLfFlexComponent(component, index, layout, onAction),
        )}
      </div>
    );
  },
);

LfBox.displayName = 'LfBox';

export { LfBox };
