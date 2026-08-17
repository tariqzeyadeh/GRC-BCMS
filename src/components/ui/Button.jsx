import { forwardRef } from 'react';

const Button = forwardRef(
  ({ children, variant = 'default', size = 'default', disabled = false, loading = false, className = '', ...props }, ref) => {
    const baseClasses = 'btn cursor-pointer whitespace-nowrap';

    const variants = {
      default: 'btn-ghost',
      primary: 'btn-primary',
      destructive: 'bg-[var(--color-destructive)] text-white border-transparent',
      ghost: 'btn-ghost',
    };

    const sizes = {
      xs: 'h-8 px-2 text-xs',
      sm: 'h-9 px-3 text-sm',
      default: 'h-11 px-4',
      lg: 'h-12 px-6 text-lg',
    };

    const classes = `
    ${baseClasses}
    ${variants[variant] ?? variants.default}
    ${sizes[size] ?? sizes.default}
    ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `
      .trim()
      .replace(/\s+/g, ' ');

    return (
      <button ref={ref} className={classes} disabled={disabled || loading} {...props}>
        {loading && <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
