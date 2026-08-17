import { ArrowDown, ArrowRight, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import { callTreeChains } from '../../data/mockBcp';

const tierStyles = {
  Primary: 'border-brand/30 bg-brand/5',
  'Backup 1': 'border-border bg-card',
  'Backup 2': 'border-border bg-card',
};

const tierLabelStyles = {
  Primary: 'bg-brand text-white',
  'Backup 1': 'bg-surface text-muted-foreground border border-border',
  'Backup 2': 'bg-surface text-muted-foreground border border-border',
};

function ContactCard({ contact }) {
  const { t } = useTranslation('bcms');
  const [tip, setTip] = useState(null);

  return (
    <div className={cn('flex flex-1 flex-col gap-3 rounded-xl border p-4 transition-colors', tierStyles[contact.tier])}>
      <span className={cn('w-fit rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide', tierLabelStyles[contact.tier])}>
        {t(contact.tier)}
      </span>

      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-brand/10 font-mono text-xs font-semibold text-brand">
          {contact.initials}
        </span>
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-semibold text-foreground">{contact.name}</span>
          <span className="truncate text-xs text-muted-foreground">{t(contact.role)}</span>
        </div>
      </div>

      <div className="relative flex items-center gap-2 border-t border-border pt-3">
        <a
          href={`tel:${contact.phone}`}
          className="btn btn-ghost h-8 w-8 p-0 border border-border"
          aria-label={`${t('Call')} ${contact.name}`}
          onMouseEnter={() => setTip(contact.phone)}
          onMouseLeave={() => setTip(null)}
        >
          <Phone size={14} />
        </a>
        <a
          href={`mailto:${contact.email}`}
          className="btn btn-ghost h-8 w-8 p-0 border border-border"
          aria-label={`${t('Email')} ${contact.name}`}
          onMouseEnter={() => setTip(contact.email)}
          onMouseLeave={() => setTip(null)}
        >
          <Mail size={14} />
        </a>
        <span className="truncate text-xs text-muted-foreground">{contact.phone}</span>
        {tip && (
          <span className="absolute -top-8 start-0 rounded-md border border-border bg-card px-2 py-1 text-[11px] shadow-sm">
            {tip}
          </span>
        )}
      </div>
    </div>
  );
}

function CallTreeChainCard({ chain }) {
  const { t } = useTranslation('bcms');
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:p-5">
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-foreground m-0">{t(chain.label)}</h3>
        <p className="text-xs text-muted-foreground m-0">{t(chain.description)}</p>
      </div>

      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-stretch">
        {chain.contacts.map((contact, index) => (
          <div key={contact.tier} className="flex flex-1 flex-col items-stretch gap-3 sm:flex-row">
            <ContactCard contact={contact} />
            {index < chain.contacts.length - 1 && (
              <div className="flex items-center justify-center py-0.5 sm:py-0">
                <ArrowDown className="size-4 text-muted-foreground/60 sm:hidden" size={16} aria-hidden="true" />
                <ArrowRight className="hidden size-4 shrink-0 text-muted-foreground/60 sm:block" size={16} aria-hidden="true" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CallTree() {
  const { t } = useTranslation('bcms');
  return (
    <div className="flex flex-col gap-4">
      <span className="sr-only">{t('Emergency Call Tree')}</span>
      {callTreeChains.map(chain => (
        <CallTreeChainCard key={chain.id} chain={chain} />
      ))}
    </div>
  );
}
