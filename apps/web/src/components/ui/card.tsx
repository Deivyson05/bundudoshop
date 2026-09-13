import * as React from 'react';
import { cn } from '@/lib/utils';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'border border-ink-200 bg-ink-50 dark:border-ink-800 dark:bg-ink-900',
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = 'Card';

export { Card };
