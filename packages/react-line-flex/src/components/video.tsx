import * as React from 'react';
import { cn } from '../lib/utils';
import { aspectRatioVariants } from '../variants';
import type { FlexVideo } from '../types';

export interface VideoProps extends FlexVideo {
  className?: string;
}

const Video = React.forwardRef<HTMLDivElement, VideoProps>(
  ({ url, previewUrl, aspectRatio = '16:9', className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full overflow-hidden',
          aspectRatio && aspectRatioVariants({ aspectRatio }),
          className
        )}
      >
        <video
          className="w-full h-full object-cover"
          poster={previewUrl}
          controls
        >
          <source src={url} type="video/mp4" />
          <source src={url} type="video/ogg" />
          <source src={url} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
);

Video.displayName = 'Video';

export { Video };

