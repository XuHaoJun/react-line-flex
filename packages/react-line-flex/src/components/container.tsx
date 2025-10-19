import * as React from 'react';
import { cn } from '../lib/utils';
import { Bubble } from './bubble';
import { Carousel } from './carousel';
import type { FlexMessage, FlexBubble, FlexCarousel, FlexAction } from '../types';

export interface ContainerProps {
  /** The Flex Message content (Bubble or Carousel) */
  content: FlexBubble | FlexCarousel;
  /** Optional callback for handling actions */
  onAction?: (action: FlexAction) => void;
  /** Additional class names */
  className?: string;
}

/**
 * Container component for rendering LINE Flex Messages
 * 
 * @example
 * ```tsx
 * <Container
 *   content={flexMessage.contents}
 *   onAction={(action) => console.log(action)}
 * />
 * ```
 */
const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ content, onAction, className }, ref) => {
    return (
      <div ref={ref} className={cn('w-full', className)}>
        {content.type === 'bubble' ? (
          <Bubble {...content} onAction={onAction} />
        ) : (
          <Carousel {...content} onAction={onAction} />
        )}
      </div>
    );
  }
);

Container.displayName = 'Container';

export { Container };

