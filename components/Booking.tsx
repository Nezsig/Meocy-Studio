'use client';
import React, { useState } from 'react';
import { ArrowRightIcon, CheckCircle2Icon, Loader2Icon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { studioContact } from '../data/site';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function Booking() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>('idle');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [brief, setBrief] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || name.trim().length < 2) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    window.setTimeout(() => setStatus('sent'), 900);
  };

  const fieldClass =
  'mt-1.5 w-full rounded-xl bg-paper px-4 py-3 text-[15px] ring-1 ring-ink/10 outline-none transition-shadow duration-150 ease-smooth focus:ring-2 focus:ring-ink';

  return (
    <section id="booking" className="scroll-mt-24 bg-ink py-24 text-chalk sm:py-32">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center">
        <div>
          <h2 className="font-display text-[clamp(2.4rem,5.6vw,4rem)] leading-[0.98] tracking-tighter-display">
            {t.booking.titleA}
            <br />
            <span className="italic">{t.booking.titleB}</span>
          </h2>
          <p className="mt-6 max-w-md text-[16.5px] leading-relaxed text-chalk/60">
            {t.booking.lead}
          </p>
          <dl className="mt-10 grid max-w-md grid-cols-2 gap-6 text-[14px]">
            <div>
              <dt className="text-chalk/45">{t.booking.studioLabel}</dt>
              <dd className="mt-1">{studioContact.address}</dd>
            </div>
            <div>
              <dt className="text-chalk/45">{t.booking.languagesLabel}</dt>
              <dd className="mt-1">{t.booking.languagesValue}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl2 bg-chalk p-6 text-ink sm:p-8">
          {status === 'sent' ?
          <div className="flex min-h-[340px] flex-col items-start justify-center">
              <CheckCircle2Icon size={30} className="text-ink" />
              <h3 className="mt-4 font-display text-[2rem] leading-tight tracking-tighter-display">
                {t.booking.sentTitle}
              </h3>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-slate2">
                {t.booking.sentBody(name.split(' ')[0], email)}
              </p>
              <button
              type="button"
              onClick={() => {
                setStatus('idle');
                setName('');
                setEmail('');
                setBrief('');
              }}
              className="mt-6 text-[14px] font-medium text-ink underline decoration-accent decoration-2 underline-offset-4">
              
                {t.booking.again}
              </button>
            </div> :

          <form onSubmit={onSubmit} noValidate>
              <h3 className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-slate2">
                {t.booking.formTitle}
              </h3>

              <div className="mt-5 space-y-4">
                <div>
                  <label htmlFor="bk-name" className="block text-[13.5px] font-medium text-ink">
                    {t.booking.name}
                  </label>
                  <input
                  id="bk-name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  className={fieldClass}
                  placeholder={t.booking.namePlaceholder} />
                
                </div>

                <div>
                  <label htmlFor="bk-email" className="block text-[13.5px] font-medium text-ink">
                    {t.booking.email}
                  </label>
                  <input
                  id="bk-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  className={fieldClass}
                  placeholder={t.booking.emailPlaceholder} />
                
                </div>

                <div>
                  <label htmlFor="bk-brief" className="block text-[13.5px] font-medium text-ink">
                    {t.booking.brief}
                  </label>
                  <textarea
                  id="bk-brief"
                  rows={3}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  className={`${fieldClass} resize-none`}
                  placeholder={t.booking.briefPlaceholder} />
                
                </div>
              </div>

              {status === 'error' &&
            <p role="alert" className="mt-4 text-[13.5px] text-red-600">
                  {t.booking.error}
                </p>
            }

              <button
              type="submit"
              disabled={status === 'sending'}
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15px] font-medium text-chalk transition-transform duration-150 ease-smooth hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70">
              
                {status === 'sending' ?
              <>
                    <Loader2Icon size={16} className="animate-spin" />
                    {t.booking.sending}
                  </> :

              <>
                    {t.booking.submit}
                    <ArrowRightIcon
                  size={16}
                  className="transition-transform duration-200 ease-smooth group-hover:translate-x-1" />
                
                  </>
              }
              </button>
              <p className="mt-3 text-center text-[12.5px] text-slate2">{t.booking.disclaimer}</p>
            </form>
          }
        </div>
      </div>
    </section>);

}