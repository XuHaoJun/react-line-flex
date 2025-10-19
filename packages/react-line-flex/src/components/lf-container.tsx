import * as React from 'react';

import { LfBubble } from '@/components/lf-bubble';
import { LfCarousel } from '@/components/lf-carousel';
import type { FlexMessage, FlexBubble, FlexCarousel, FlexAction } from '@/lib/lf-types';
import { cn } from '@/lib/utils';

export interface LfContainerProps {
  /** The Flex Message content (Bubble or Carousel) */
  content: FlexBubble | FlexCarousel;
  /** Optional callback for handling actions */
  onAction?: (action: FlexAction) => void;
  /** Additional class names */
  className?: string;
}

/**
 * LfContainer component for rendering LINE Flex Messages
 *
 * @example
 * ```tsx
 * <LfContainer
 *   content={flexMessage.contents}
 *   onAction={(action) => console.log(action)}
 * />
 * ```
 */
const LfContainer = React.forwardRef<HTMLDivElement, LfContainerProps>(({ content, onAction, className }, ref) => {
  return (
    <div ref={ref} className={cn('w-full', className)}>
      {content.type === 'bubble' ? (
        <LfBubble {...content} onAction={onAction} />
      ) : (
        <LfCarousel {...content} onAction={onAction} />
      )}
    </div>
  );
});

LfContainer.displayName = 'LfContainer';

export { LfContainer };
