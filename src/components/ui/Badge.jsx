import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-brand text-white',
        secondary: 'border-transparent bg-surface text-text',
        outline: 'border-border text-text',
        success: 'border-transparent bg-green-100 text-green-700',
        warning: 'border-transparent bg-amber-50 text-amber-800',
        danger: 'border-transparent bg-red-100 text-red-600',
        ghost: 'border-transparent text-text-muted',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export function Badge({ className = '', variant = 'default', children, ...props }) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
}

export { badgeVariants };
