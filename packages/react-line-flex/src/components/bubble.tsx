import * as React from 'react';
import { cn } from '../lib/utils';
import { handleAction } from '../helpers';
import { bubbleSizeVariants } from '../variants';
import { Box, renderFlexComponent } from './box';
import type { FlexBubble, FlexAction } from '../types';

export interface BubbleProps extends FlexBubble {
  className?: string;
  onAction?: (action: FlexAction) => void;
}

const Bubble = React.forwardRef<HTMLDivElement, BubbleProps>(
  (
    {
      size = 'mega',
      direction = 'ltr',
      header,
      hero,
      body,
      footer,
      styles,
      action,
      onAction,
      className,
    },
    ref
  ) => {
    const clickHandler = handleAction(action, onAction);

    const directionClass = direction === 'rtl' ? 'dir-rtl' : 'dir-ltr';

    // Padding classes based on bubble size
    const getPadding = (section: 'header' | 'body' | 'footer') => {
      const sizeMap: Record<string, Record<string, string>> = {
        nano: {
          header: 'p-[10px]',
          body: 'p-[10px] pt-[10px]',
          footer: 'p-[10px]',
        },
        micro: {
          header: 'p-[10px]',
          body: 'p-[10px] pt-[10px]',
          footer: 'p-[10px]',
        },
        deca: {
          header: 'p-[11px_14px_13px]',
          body: 'p-[11px_14px_13px]',
          footer: 'p-[10px]',
        },
        hecto: {
          header: 'p-[11px_14px_13px]',
          body: 'p-[11px_14px_13px]',
          footer: 'p-[10px]',
        },
        kilo: {
          header: 'p-[13px]',
          body: 'p-[13px]',
          footer: 'p-[10px]',
        },
        mega: {
          header: 'p-5',
          body: 'p-5 pt-[19px]',
          footer: 'p-[10px]',
        },
        giga: {
          header: 'p-5',
          body: 'p-5 pt-[19px]',
          footer: 'p-[10px]',
        },
      };

      return sizeMap[size]?.[section] || sizeMap.mega[section];
    };

    return (
      <div
        ref={ref}
        className={cn(
          bubbleSizeVariants({ size }),
          directionClass,
          action && 'cursor-pointer',
          className
        )}
        onClick={action && !onAction ? clickHandler : undefined}
        dir={direction}
      >
        {/* Header */}
        {header && (
          <div
            className={cn('flex-none', getPadding('header'))}
            style={styles?.header?.backgroundColor ? { backgroundColor: styles.header.backgroundColor } : undefined}
          >
            <Box {...header} onAction={onAction} />
          </div>
        )}

        {/* Hero */}
        {hero && (
          <div
            className="flex-none"
            style={styles?.hero?.backgroundColor ? { backgroundColor: styles.hero.backgroundColor } : undefined}
          >
            {hero.type === 'box' ? (
              <Box {...hero} onAction={onAction} />
            ) : (
              renderFlexComponent(hero, 0, undefined, onAction)
            )}
          </div>
        )}

        {/* Body */}
        {body && (
          <div
            className={cn(
              'flex-1 flex-col',
              getPadding('body'),
              footer && 'pb-[10px]'
            )}
            style={styles?.body?.backgroundColor ? { backgroundColor: styles.body.backgroundColor } : undefined}
          >
            <Box {...body} onAction={onAction} />
          </div>
        )}

        {/* Footer */}
        {footer && (
          <div
            className={cn('flex-none', getPadding('footer'))}
            style={styles?.footer?.backgroundColor ? { backgroundColor: styles.footer.backgroundColor } : undefined}
          >
            <Box {...footer} onAction={onAction} />
          </div>
        )}
      </div>
    );
  }
);

Bubble.displayName = 'Bubble';

export { Bubble };

