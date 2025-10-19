import * as React from 'react';
import { cn } from '../lib/utils';
import type { FlexSpacer } from '../types';

export type SpacerProps = FlexSpacer & {
  className?: string;
};

const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ size = 'md', className }, ref) => {
    const sizeMap: Record<string, string> = {
      xxs: 'h-[2px]',
      xs: 'h-[2px]',
      sm: 'h-[4px]',
      md: 'h-[8px]',
      lg: 'h-[12px]',
      xl: 'h-[16px]',
      xxl: 'h-[20px]',
      '3xl': 'h-[20px]',
      '4xl': 'h-[20px]',
      '5xl': 'h-[20px]',
    };

    const sizeClass = typeof size === 'string' && !size.includes('px')
      ? sizeMap[size] || 'h-[8px]'
      : '';

    const style: React.CSSProperties = typeof size === 'string' && size.includes('px')
      ? { height: size }
      : {};

    return (
      <div
        ref={ref}
        className={cn('flex-none w-px', sizeClass, className)}
        style={style}
      />
    );
  }
);

Spacer.displayName = 'Spacer';

export { Spacer };

