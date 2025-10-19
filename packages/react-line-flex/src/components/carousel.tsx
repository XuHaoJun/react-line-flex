import * as React from 'react';
import { cn } from '../lib/utils';
import { Bubble } from './bubble';
import type { FlexCarousel, FlexAction } from '../types';

export interface CarouselProps extends FlexCarousel {
  className?: string;
  onAction?: (action: FlexAction) => void;
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ contents, onAction, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'overflow-x-auto overflow-y-hidden scrollbar-hide',
          '-webkit-overflow-scrolling-touch',
          className
        )}
      >
        <div className="flex w-full gap-[9px] pl-[7px] after:content-[''] after:flex-none after:block after:w-[7px] after:h-px">
          {contents.map((bubble, index) => (
            <Bubble
              key={index}
              {...bubble}
              onAction={onAction}
              className="flex-none w-[80%]"
            />
          ))}
        </div>
      </div>
    );
  }
);

Carousel.displayName = 'Carousel';

export { Carousel };

