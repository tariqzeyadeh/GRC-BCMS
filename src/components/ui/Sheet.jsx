import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

/**
 * Slide-over panel (Sheet). Supports custom header/footer for rich drawers.
 */
export function Sheet({
  open,
  onOpenChange,
  side = 'right',
  title,
  description,
  header,
  footer,
  children,
  className = '',
}) {
  const { t } = useTranslation('grc');

  useEffect(() => {
    if (!open) return undefined;
    const onKey = e => {
      if (e.key === 'Escape') onOpenChange?.(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  const sideClass = side === 'left' ? 'left-0 border-e' : 'right-0 border-s';

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        type="button"
        className="absolute inset-0 bg-black/40 border-0 cursor-pointer"
        aria-label={t('Close')}
        onClick={() => onOpenChange?.(false)}
      />
      <div
        className={cn(
          'absolute top-0 h-full w-full max-w-lg bg-card border-border shadow-lg flex flex-col',
          sideClass,
          className
        )}
        role="dialog"
        aria-modal="true"
      >
        {header !== undefined ? (
          <div className="relative border-b border-border">
            {header}
            <button
              type="button"
              className="btn btn-ghost h-8 w-8 p-0 absolute top-4 end-4"
              onClick={() => onOpenChange?.(false)}
              aria-label={t('Close')}
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
            <div>
              {title && <h2 className="text-base font-semibold text-text m-0">{title}</h2>}
              {description && <p className="text-sm text-text-muted m-0 mt-1">{description}</p>}
            </div>
            <button
              type="button"
              className="btn btn-ghost h-8 w-8 p-0"
              onClick={() => onOpenChange?.(false)}
              aria-label={t('Close')}
            >
              <X size={16} />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto">{children}</div>
        {footer}
      </div>
    </div>
  );
}
