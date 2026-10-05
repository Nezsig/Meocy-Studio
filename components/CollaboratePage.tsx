'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Check, CheckCircle2Icon, Loader2Icon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { locales } from '../data/locales';
import {
  COLLAB_FIELDS,
  COLLAB_TRACKS,
  EMAIL_RE,
  LIMITS,
  englishOptions,
  greetingField,
  type CollabField,
  type CollabOptionsKey,
  type CollabTrack,
} from '../lib/collab';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type Values = Record<string, string | boolean>;
type Errors = Record<string, string | undefined>;

const TAB_LABEL = { models: 'tabModels', agencies: 'tabAgencies' } as const;
const INFO = {
  models: { intro: 'mIntro', offer: 'mOffer', need: 'mNeed' },
  agencies: { intro: 'aIntro', offer: 'aOffer', need: 'aNeed' },
} as const;
// Phrases linked to /privacy inside the consent label.
const PRIVACY_PHRASES = ['Privacy Policy', 'Informativa sulla privacy', 'Politique de confidentialité'];

const emptyValues = (track: CollabTrack): Values => ({
  ...Object.fromEntries(COLLAB_FIELDS[track].map((f) => [f.key, f.kind === 'check' ? false : ''])),
  company_website: '',
});
const initial = <T,>(make: (t: CollabTrack) => T) =>
  Object.fromEntries(COLLAB_TRACKS.map((t) => [t, make(t)])) as Record<CollabTrack, T>;
const trackFromHash = (): CollabTrack | null => {
  const h = window.location.hash.replace('#', '') as CollabTrack;
  return COLLAB_TRACKS.includes(h) ? h : null;
};

const fieldClass =
  'mt-1.5 block min-h-[48px] w-full min-w-0 rounded-xl bg-paper px-4 py-3 text-[16px] ring-1 ring-ink/10 outline-none transition-shadow duration-150 ease-smooth focus:ring-2 focus:ring-ink aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-500';
const selectClass = `${fieldClass} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='12'%20height='8'%20fill='none'%3E%3Cpath%20d='M1%201.5l5%205%205-5'%20stroke='%230b0b0c'%20stroke-width='1.6'/%3E%3C/svg%3E")] bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat pr-10`;
const labelClass = 'block text-[13.5px] font-medium text-ink';

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-[15px] leading-snug">
          <span className="mt-[2px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent text-ink">
            <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function CollaboratePage() {
  const { t, lang } = useLanguage();
  // Fall back to English for any missing translation.
  const en = locales.en.collabPage;
  const c = { ...en, ...(t?.collabPage ?? {}) };
  const list = (key: 'mOffer' | 'mNeed' | 'aOffer' | 'aNeed') => (c[key]?.length ? c[key] : en[key]);
  const opts = (key: CollabOptionsKey) => (c[key]?.length === en[key].length ? c[key] : en[key]);

  const [active, setActive] = useState<CollabTrack>('models');
  const [values, setValues] = useState(() => initial(emptyValues));
  const [errors, setErrors] = useState(() => initial<Errors>(() => ({})));
  const [status, setStatus] = useState(() => initial<Status>(() => 'idle'));
  const [sentName, setSentName] = useState(() => initial(() => ''));
  const tabRefs = useRef<Partial<Record<CollabTrack, HTMLButtonElement | null>>>({});
  const formRef = useRef<HTMLFormElement>(null);

  // Deep links: #models, #agencies, #creatives select a tab on load and on hash change.
  useEffect(() => {
    const sync = () => {
      const fromHash = trackFromHash();
      if (fromHash) setActive(fromHash);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const selectTrack = useCallback((track: CollabTrack, focus = false) => {
    setActive(track);
    window.history.replaceState(null, '', `#${track}`);
    if (focus) tabRefs.current[track]?.focus();
  }, []);

  const onTabKeyDown = (e: React.KeyboardEvent) => {
    const i = COLLAB_TRACKS.indexOf(active);
    const next =
      e.key === 'ArrowRight' ? COLLAB_TRACKS[(i + 1) % COLLAB_TRACKS.length]
      : e.key === 'ArrowLeft' ? COLLAB_TRACKS[(i - 1 + COLLAB_TRACKS.length) % COLLAB_TRACKS.length]
      : e.key === 'Home' ? COLLAB_TRACKS[0]
      : e.key === 'End' ? COLLAB_TRACKS[COLLAB_TRACKS.length - 1]
      : null;
    if (next) {
      e.preventDefault();
      selectTrack(next, true);
    }
  };

  const v = values[active];
  const errs = errors[active];
  const st = status[active];
  const visible = (f: CollabField) => !f.showIf || v[f.showIf.field] === f.showIf.equals;

  const setField = (key: string, value: string | boolean) => {
    setValues((all) => ({ ...all, [active]: { ...all[active], [key]: value } }));
    if (errs[key]) setErrors((all) => ({ ...all, [active]: { ...all[active], [key]: undefined } }));
    if (st === 'error') setStatus((all) => ({ ...all, [active]: 'idle' }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    for (const f of COLLAB_FIELDS[active]) {
      if (!visible(f)) continue;
      const raw = v[f.key];
      if (f.kind === 'check') {
        if (f.required && raw !== true) e[f.key] = f.key === 'over18' ? c.errOver18 : c.errConsent;
        continue;
      }
      const value = String(raw ?? '').trim();
      if (!value) {
        if (f.required) e[f.key] = c.errRequired;
        continue;
      }
      if (f.kind === 'name' && (value.length < LIMITS.nameMin || value.length > LIMITS.nameMax)) e[f.key] = c.errRequired;
      if (f.kind === 'email' && !EMAIL_RE.test(value)) e[f.key] = c.errEmail;
    }
    return e;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors((all) => ({ ...all, [active]: e }));
    const firstInvalid = COLLAB_FIELDS[active].find((f) => e[f.key]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#cf-${active}-${firstInvalid.key}`)?.focus();
      return;
    }

    const track = active;
    setStatus((all) => ({ ...all, [track]: 'sending' }));
    const fields: Record<string, string | boolean> = {};
    for (const f of COLLAB_FIELDS[track]) {
      if (!visible(f)) continue;
      fields[f.key] = f.kind === 'check' ? v[f.key] === true : String(v[f.key] ?? '').trim();
    }
    try {
      const res = await fetch('/api/collaborate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ track, locale: lang, fields, company_website: v.company_website }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const greeting = String(v[greetingField(track)] ?? '').trim().split(/\s+/)[0] || '';
      setSentName((all) => ({ ...all, [track]: greeting }));
      setStatus((all) => ({ ...all, [track]: 'sent' }));
    } catch (err) {
      console.error('Collaboration form error:', err);
      setStatus((all) => ({ ...all, [track]: 'error' }));
    }
  };

  const reset = () => {
    setValues((all) => ({ ...all, [active]: emptyValues(active) }));
    setErrors((all) => ({ ...all, [active]: {} }));
    setSentName((all) => ({ ...all, [active]: '' }));
    setStatus((all) => ({ ...all, [active]: 'idle' }));
  };

  const consentLabel = (text: string) => {
    const phrase = PRIVACY_PHRASES.find((p) => text.includes(p));
    const link = (label: string) => (
      <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="underline decoration-accent decoration-2 underline-offset-2">
        {label}
      </Link>
    );
    if (!phrase) return <>{text} ({link('Privacy Policy')})</>;
    const [before, after] = text.split(phrase);
    return <>{before}{link(phrase)}{after}</>;
  };

  const fieldId = (key: string) => `cf-${active}-${key}`;
  const errorId = (key: string) => `${fieldId(key)}-error`;
  // Always-mounted live region so screen readers announce errors as they appear.
  const fieldError = (key: string) => (
    <p id={errorId(key)} aria-live="polite" className="mt-1.5 text-[13px] text-red-600 empty:hidden">
      {errs[key] ?? ''}
    </p>
  );
  const invalidProps = (key: string) => ({
    'aria-required': COLLAB_FIELDS[active].find((f) => f.key === key)?.required || undefined,
    'aria-invalid': !!errs[key],
    'aria-describedby': errs[key] ? errorId(key) : undefined,
  });
  const required = <span aria-hidden className="text-slate2"> *</span>;

  const renderField = (f: CollabField) => {
    if (!visible(f)) return null;
    const id = fieldId(f.key);
    const label = c[f.label];

    if (f.kind === 'check') {
      return (
        <div key={f.key}>
          <label htmlFor={id} className="flex min-h-[44px] cursor-pointer items-start gap-3 py-1 text-[14px] leading-snug text-ink">
            <input
              id={id}
              type="checkbox"
              checked={v[f.key] === true}
              onChange={(e) => setField(f.key, e.target.checked)}
              {...invalidProps(f.key)}
              className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded accent-ink"
            />
            <span>{f.key === 'consent' ? consentLabel(label) : label}{required}</span>
          </label>
          {fieldError(f.key)}
        </div>
      );
    }

    if (f.kind === 'select') {
      const values = englishOptions(f.options!);
      const labels = opts(f.options!);
      const current = String(v[f.key] ?? '');
      return (
        <div key={f.key}>
          <label htmlFor={id} className={labelClass}>
            {label}
            {f.required && required}
          </label>
          <select id={id} value={current} onChange={(e) => setField(f.key, e.target.value)} {...invalidProps(f.key)} className={selectClass}>
            <option value="">{c.select}</option>
            {values.map((value, i) => (
              <option key={value} value={value}>
                {labels[i]}
              </option>
            ))}
          </select>
          {fieldError(f.key)}
        </div>
      );
    }

    const common = {
      id,
      value: String(v[f.key] ?? ''),
      autoComplete: f.autoComplete,
      ...invalidProps(f.key),
    };
    return (
      <div key={f.key}>
        <label htmlFor={id} className={labelClass}>
          {label}
          {f.required && required}
        </label>
        {f.kind === 'message' ? (
          <textarea
            {...common}
            rows={4}
            maxLength={LIMITS.message}
            onChange={(e) => setField(f.key, e.target.value)}
            className={`${fieldClass} resize-y`}
          />
        ) : (
          <input
            {...common}
            type={f.kind === 'email' ? 'email' : f.kind === 'url' ? 'url' : f.kind === 'number' ? 'number' : 'text'}
            inputMode={f.kind === 'email' ? 'email' : f.kind === 'number' ? 'numeric' : undefined}
            maxLength={f.kind === 'name' ? LIMITS.nameMax : f.kind === 'email' ? LIMITS.email : f.kind === 'url' ? LIMITS.url : LIMITS.text}
            onChange={(e) => setField(f.key, e.target.value)}
            className={fieldClass}
          />
        )}
        {f.key === 'portfolio' && c.portfolioHelper && <p className="mt-1.5 text-[13px] text-slate2">{c.portfolioHelper}</p>}
        {fieldError(f.key)}
      </div>
    );
  };

  const info = INFO[active];

  return (
    <main id="main-content" className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-slate2">
          <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
          PHOTOGRAPHY &amp; VIDEO STUDIO — MILAN
        </p>
        <h1 className="mt-5 font-display text-[clamp(2.6rem,7vw,5rem)] leading-[1.02] tracking-tighter-display">{c.title}</h1>
        <div className="mt-5 max-w-2xl space-y-3 text-[17px] leading-relaxed text-slate2">
          <p className="text-ink">{c.intro1}</p>
          <p>{c.intro2}</p>
        </div>

        <div
          role="tablist"
          aria-label={c.title}
          onKeyDown={onTabKeyDown}
          className="mt-12 grid grid-cols-2 gap-1 rounded-[20px] bg-chalk p-1 ring-1 ring-mist sm:inline-grid sm:rounded-full">
          {COLLAB_TRACKS.map((track) => {
            const selected = track === active;
            return (
              <button
                key={track}
                ref={(el) => {
                  tabRefs.current[track] = el;
                }}
                id={`tab-${track}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${track}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => selectTrack(track)}
                className={`min-h-[44px] rounded-2xl px-2 py-2 text-[13px] font-medium leading-tight transition-colors sm:rounded-full sm:px-5 sm:text-[14.5px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                  selected ? 'bg-accent text-ink' : 'text-slate2 hover:text-ink'
                }`}>
                {c[TAB_LABEL[track]]}
              </button>
            );
          })}
        </div>

        <div
          id={`panel-${active}`}
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
          <div className="rounded-[20px] border border-[#ecebe6] bg-chalk p-6 sm:p-8">
            <p className="text-[17px] leading-relaxed text-ink">{c[info.intro]}</p>
            <h2 className="mt-7 text-[12px] font-semibold uppercase tracking-[0.14em] text-slate2">{c.offerTitle}</h2>
            <CheckList items={list(info.offer)} />
            {active === 'models' && (
              <p className="mt-5 rounded-xl bg-paper px-4 py-3 text-[14px] text-slate2">
                {c.mPaidNote}{' '}
                <Link href="/packages" className="font-medium text-ink underline decoration-accent decoration-2 underline-offset-2">
                  {c.mPaidLink}
                </Link>
              </p>
            )}
            <h2 className="mt-7 text-[12px] font-semibold uppercase tracking-[0.14em] text-slate2">{c.needTitle}</h2>
            <CheckList items={list(info.need)} />
          </div>

          <div id="collab-form" className="scroll-mt-24 rounded-[20px] border border-[#ecebe6] bg-chalk p-6 sm:p-8">
            {st === 'sent' ? (
              <div className="flex min-h-[320px] flex-col items-start justify-center" role="status">
                <CheckCircle2Icon size={30} className="text-ink" aria-hidden />
                <h2 className="mt-4 font-display text-[2.2rem] leading-tight tracking-tighter-display">
                  {active === 'agencies' ? c.successTitleAgency : c.successTitle}
                </h2>
                <p className="mt-3 max-w-md text-[15.5px] leading-relaxed text-slate2">
                  {active === 'agencies' ? c.successBodyAgency : (c.successBody || '').replace('{name}', sentName[active])}
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-7 inline-flex min-h-[48px] items-center justify-center rounded-full bg-ink px-6 text-[15px] font-medium text-chalk transition-transform duration-150 ease-smooth hover:-translate-y-0.5">
                  {c.another}
                </button>
              </div>
            ) : (
              <form key={active} ref={formRef} onSubmit={onSubmit} noValidate className="relative space-y-5">
                {COLLAB_FIELDS[active].map(renderField)}

                {/* Honeypot: hidden from people, assistive tech, and autofill; bots that fill it are silently ignored. */}
                <div aria-hidden="true" style={{ display: 'none' }}>
                  <label htmlFor={`cf-${active}-website-hp`}>Website field</label>
                  <input
                    id={`cf-${active}-website-hp`}
                    name="company_website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={String(v.company_website ?? '')}
                    onChange={(e) => setField('company_website', e.target.value)}
                  />
                </div>

                <div aria-live="polite" className="empty:hidden">
                  {st === 'error' && (
                    <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[14px] text-red-700">
                      {c.errGeneric}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={st === 'sending'}
                  className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-accent px-7 text-[15px] font-semibold text-ink transition-transform duration-150 ease-smooth hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70 sm:w-auto">
                  {st === 'sending' ? (
                    <>
                      <Loader2Icon size={16} className="animate-spin" aria-hidden />
                      {c.sending}
                    </>
                  ) : (
                    active === 'models' ? c.submitModels : c.submitAgencies
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
