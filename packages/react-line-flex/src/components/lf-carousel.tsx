import * as React from 'react';

import { LfBubble } from '@/components/lf-bubble';
import type { FlexCarousel, FlexAction } from '@/lib/lf-types';
import { cn } from '@/lib/utils';

export interface LfCarouselProps extends FlexCarousel {
  className?: string;
  onAction?: (action: FlexAction) => void;
}

const LfCarousel = React.forwardRef<HTMLDivElement, LfCarouselProps>(({ contents, onAction, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('scrollbar-hide overflow-x-auto overflow-y-hidden', '-webkit-overflow-scrolling-touch', className)}
    >
      <div className="flex w-full gap-[9px] pl-[7px] after:block after:h-px after:w-[7px] after:flex-none after:content-['']">
        {contents.map((bubble, index) => (
          <LfBubble key={index} {...bubble} onAction={onAction} className="w-[80%] flex-none" />
        ))}
      </div>
    </div>
  );
});

LfCarousel.displayName = 'LfCarousel';

export { LfCarousel };
