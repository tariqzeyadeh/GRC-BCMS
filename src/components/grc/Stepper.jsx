import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';

/**
 * @param {object} props
 * @param {string[]} props.steps English keys passed to t()
 * @param {number} props.currentStep 0-based
 * @param {'horizontal' | 'vertical'} [props.orientation]
 */
const Stepper = ({ steps = [], currentStep = 0, orientation = 'horizontal' }) => {
  const { t } = useTranslation('grc');
  const isVertical = orientation === 'vertical';

  return (
    <ol
      className={
        isVertical
          ? 'flex flex-col gap-0'
          : 'flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'
      }
    >
      {steps.map((step, index) => {
        const done = index < currentStep;
        const active = index === currentStep;
        const upcoming = index > currentStep;

        return (
          <li
            key={step}
            className={`flex ${isVertical ? 'gap-3' : 'flex-1 flex-col items-center text-center gap-2'} relative`}
          >
            {isVertical && index < steps.length - 1 && (
              <span
                className={`absolute start-3.5 top-8 w-px h-[calc(100%-0.5rem)] ${
                  done ? 'bg-brand' : 'bg-border'
                }`}
                aria-hidden
              />
            )}

            <div className={`flex ${isVertical ? 'items-start gap-3' : 'flex-col items-center gap-2'} relative z-10`}>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                  done
                    ? 'bg-brand border-brand text-white'
                    : active
                      ? 'bg-brand/15 border-brand text-brand'
                      : 'bg-surface-elevated border-border text-text-muted'
                }`}
              >
                {done ? <Check className="h-4 w-4" /> : index + 1}
              </span>
              <span
                className={`text-sm font-medium ${
                  upcoming ? 'text-text-muted' : 'text-text'
                } ${isVertical ? 'pt-1' : ''}`}
              >
                {t(step)}
              </span>
            </div>

            {!isVertical && index < steps.length - 1 && (
              <span
                className={`hidden sm:block absolute top-3.5 start-[calc(50%+1.25rem)] w-[calc(100%-2.5rem)] h-px ${
                  done ? 'bg-brand' : 'bg-border'
                }`}
                aria-hidden
              />
            )}
          </li>
        );
      })}
    </ol>
  );
};

export default Stepper;
