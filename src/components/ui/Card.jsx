import { cn } from '../../lib/utils';

export function Card({ className = '', children, ...props }) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 overflow-hidden rounded-xl bg-card text-text border border-border shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children, ...props }) {
  return (
    <div className={cn('flex flex-col gap-1 px-5 pt-5', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className = '', children, ...props }) {
  return (
    <div className={cn('text-base font-semibold text-text leading-snug', className)} {...props}>
      {children}
    </div>
  );
}

export function CardDescription({ className = '', children, ...props }) {
  return (
    <div className={cn('text-sm text-text-muted', className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ className = '', children, ...props }) {
  return (
    <div className={cn('px-5 pb-5', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className = '', children, ...props }) {
  return (
    <div className={cn('flex items-center border-t border-border bg-surface px-5 py-3', className)} {...props}>
      {children}
    </div>
  );
}
