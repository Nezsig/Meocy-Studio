'use client';
import React, { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import { Check, CheckCircle2Icon, Loader2Icon } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { locales } from '../../../data/locales';
import { CREW_FIELDS, CREW_ROLES, crewRoleLabels, experienceOptions, EMAIL_RE, LIMITS } from '../../../lib/crew';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type Values = Record<string, string | boolean>;
type Errors = Record<string, string | undefined>;

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

export default function WorkWithMeocyPage() {
  const { t, lang } = useLanguage();
  const en = locales.en.crewPage;
  const c = { ...en, ...(t?.crewPage ?? {}) };

  const [values, setValues] = useState<Values>(Object.fromEntries(CREW_FIELDS.map((f) => [f.key, f.kind === 'check' ? false : ''])));
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [sentName, setSentName] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const submissionLockRef = useRef(false);

  const validate = (): Errors => {
    const e: Errors = {};
    for (const f of CREW_FIELDS) {
      const raw = values[f.key];
      if (f.kind === 'check') {
        if (f.required && raw !== true) e[f.key] = c.errConsent;
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
    if (submissionLockRef.current) return;

    const e = validate();
    setErrors(e);
    const firstInvalid = CREW_FIELDS.find((f) => e[f.key]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#crew-${firstInvalid.key}`)?.focus();
      return;
    }

    submissionLockRef.current = true;
    setStatus('sending');

    const fields: Record<string, string | boolean> = {};
    for (const f of CREW_FIELDS) {
      fields[f.key] = f.kind === 'check' ? values[f.key] === true : String(values[f.key] ?? '').trim();
    }

    try {
      const res = await fetch('/api/crew', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale: lang, fields }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSentName(String(values.name ?? '').trim().split(/\s+/)[0] || '');
      setStatus('sent');
    } catch (err) {
      console.error('Crew form error:', err);
      setStatus('error');
    } finally {
      submissionLockRef.current = false;
    }
  };

  const reset = () => {
    setValues(Object.fromEntries(CREW_FIELDS.map((f) => [f.key, f.kind === 'check' ? false : ''])));
    setErrors({});
    setSentName('');
    setStatus('idle');
  };

  const consentLabel = (text: string) => {
    const phrases = ['Privacy Policy', 'Politica sulla privacy', 'Politique de confidentialité'];
    const phrase = phrases.find((p) => text.includes(p));
    const link = (label: string) => (
      <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="underline decoration-accent decoration-2 underline-offset-2">
        {label}
      </Link>
    );
    if (!phrase) return <>{text} ({link('Privacy Policy')})</>;
    const [before, after] = text.split(phrase);
    return <>{before}{link(phrase)}{after}</>;
  };

  const fieldId = (key: string) => `crew-${key}`;
  const errorId = (key: string) => `${fieldId(key)}-error`;
  const fieldError = (key: string) => (
    <p id={errorId(key)} aria-live="polite" className="mt-1.5 text-[13px] text-red-600 empty:hidden">
      {errors[key] ?? ''}
    </p>
  );
  const invalidProps = (key: string) => ({
    'aria-required': CREW_FIELDS.find((f) => f.key === key)?.required || undefined,
    'aria-invalid': !!errors[key],
    'aria-describedby': errors[key] ? errorId(key) : undefined,
  });
  const required = <span aria-hidden className="text-slate2"> *</span>;

  const renderField = (f: typeof CREW_FIELDS[0]) => {
    const id = fieldId(f.key);
    const label = c[f.label as keyof typeof c] || f.label;

    if (f.kind === 'check') {
      return (
        <div key={f.key}>
          <label htmlFor={id} className="flex min-h-[44px] cursor-pointer items-start gap-3 py-1 text-[14px] leading-snug text-ink">
            <input
              id={id}
              type="checkbox"
              checked={values[f.key] === true}
              onChange={(e) => { setValues({...values, [f.key]: e.target.checked}); if (errors[f.key]) setErrors({...errors, [f.key]: undefined}); }}
              {...invalidProps(f.key)}
              className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded accent-ink"
            />
            <span>{consentLabel(String(label))}{required}</span>
          </label>
          {fieldError(f.key)}
        </div>
      );
    }

    if (f.kind === 'select') {
      const roleOpts = f.key === 'role' ? CREW_ROLES : experienceOptions;
      const labels = f.key === 'role' ? c.roleOptions : c.experienceOptions;
      return (
        <div key={f.key}>
          <label htmlFor={id} className={labelClass}>
            {label}
            {f.required && required}
          </label>
          <select
            id={id}
            value={String(values[f.key] ?? '')}
            onChange={(e) => { setValues({...values, [f.key]: e.target.value}); if (errors[f.key]) setErrors({...errors, [f.key]: undefined}); }}
            {...invalidProps(f.key)}
            className={selectClass}
          >
            <option value="">{c.select}</option>
            {roleOpts.map((value, i) => (
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
      value: String(values[f.key] ?? ''),
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
            onChange={(e) => { setValues({...values, [f.key]: e.target.value}); if (errors[f.key]) setErrors({...errors, [f.key]: undefined}); }}
            className={`${fieldClass} resize-y`}
          />
        ) : (
          <>
            <input
              {...common}
              type={f.kind === 'email' ? 'email' : 'text'}
              inputMode={f.kind === 'email' ? 'email' : undefined}
              maxLength={f.kind === 'name' ? LIMITS.nameMax : f.kind === 'email' ? LIMITS.email : LIMITS.text}
              onChange={(e) => { setValues({...values, [f.key]: e.target.value}); if (errors[f.key]) setErrors({...errors, [f.key]: undefined}); }}
              className={fieldClass}
            />
            {f.key === 'equipment' && <p className="mt-1.5 text-[13px] text-slate2">{c.equipmentHelper}</p>}
            {f.key === 'availability' && <p className="mt-1.5 text-[13px] text-slate2">{c.availabilityHelper}</p>}
          </>
        )}
        {fieldError(f.key)}
      </div>
    );
  };

  return (
    <main id="main-content" className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-slate2">
          <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
          PHOTOGRAPHY &amp; VIDEO STUDIO — MILAN
        </p>
        <h1 className="mt-5 font-display text-[clamp(2.6rem,7vw,5rem)] leading-[1.02] tracking-tighter-display">{c.title}</h1>
        <div className="mt-5 max-w-2xl space-y-3 text-[17px] leading-relaxed text-slate2">
          <p className="text-ink">{c.intro}</p>
          <p>{c.expectation}</p>
          <p className="rounded-xl bg-paper px-4 py-3">{c.projectNote}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
          <div className="space-y-8">
            <div className="rounded-[20px] border border-[#ecebe6] bg-chalk p-6 sm:p-8">
              <h2 className="font-display text-[1.8rem] leading-tight tracking-tighter-display">{c.rolesTitle}</h2>
              <div className="mt-6 space-y-4">
                {[
                  { key: 'photographer', name: c.photographer, desc: c.photographerDesc },
                  { key: 'videographer', name: c.videographer, desc: c.videographerDesc },
                  { key: 'lightingAssistant', name: c.lightingAssistant, desc: c.lightingAssistantDesc },
                  { key: 'productionAssistant', name: c.productionAssistant, desc: c.productionAssistantDesc },
                  { key: 'otherCreative', name: c.otherCreative, desc: c.otherCreativeDesc },
                ].map((role) => (
                  <div key={role.key}>
                    <h3 className="font-medium text-ink">{role.name}</h3>
                    <p className="mt-1 text-[14px] text-slate2">{role.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[20px] border border-[#ecebe6] bg-chalk p-6 sm:p-8">
              <h2 className="font-display text-[1.8rem] leading-tight tracking-tighter-display">{c.workflowTitle}</h2>
              <div className="mt-6 space-y-4">
                {[
                  { title: c.workflowStep1, desc: c.workflowStep1Desc },
                  { title: c.workflowStep2, desc: c.workflowStep2Desc },
                  { title: c.workflowStep3, desc: c.workflowStep3Desc },
                  { title: c.workflowStep4, desc: c.workflowStep4Desc },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-ink">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-medium text-ink">{step.title}</h3>
                      <p className="mt-1 text-[14px] text-slate2">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="scroll-mt-24 rounded-[20px] border border-[#ecebe6] bg-chalk p-6 sm:p-8">
            {status === 'sent' ? (
              <div className="flex min-h-[320px] flex-col items-start justify-center" role="status">
                <CheckCircle2Icon size={30} className="text-ink" aria-hidden />
                <h2 className="mt-4 font-display text-[2.2rem] leading-tight tracking-tighter-display">{c.successTitle}</h2>
                <p className="mt-3 max-w-md text-[15.5px] leading-relaxed text-slate2">
                  {(c.successBody || '').replace('{name}', sentName)}
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-7 inline-flex min-h-[48px] items-center justify-center rounded-full bg-ink px-6 text-[15px] font-medium text-chalk transition-transform duration-150 ease-smooth hover:-translate-y-0.5"
                >
                  {c.another}
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
                {CREW_FIELDS.map(renderField)}

                <div aria-live="polite" className="empty:hidden">
                  {status === 'error' && (
                    <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[14px] text-red-700">
                      {c.errGeneric}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-accent px-7 text-[15px] font-semibold text-ink transition-transform duration-150 ease-smooth hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70 sm:w-auto"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2Icon size={16} className="animate-spin" aria-hidden />
                      {c.sending}
                    </>
                  ) : (
                    c.submit
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
