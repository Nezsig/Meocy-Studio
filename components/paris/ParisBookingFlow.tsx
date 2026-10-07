'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Loader2Icon, MapPin } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { FormPrivacyNotice } from '../FormPrivacyNotice';
import { fmt, formatPrice } from '../milan/parts';
import { parisCopy } from '../../data/paris';
import { trackParisBookingEvent } from '../../lib/ga-paris';
import {
  computeParisPricing,
  parisContact,
  parisMaxPeople,
  parisPackages,
  parisSlotsFor,
  parisStandardPeople,
  upcomingParisShootDays,
  type ParisPackageId,
  type ParisPricing,
} from '../../lib/paris-shoot-config';

// Paris request flow: Package → Date & Time → Details → Review → Request received. No location step, no payment.
type Screen = 'package' | 'datetime' | 'details' | 'summary' | 'done';
const SCREENS: Screen[] = ['package', 'datetime', 'details', 'summary', 'done'];
const PROGRESS: Record<Screen, number> = { package: 0, datetime: 1, details: 2, summary: 3, done: 4 };
const STEP_NAMES: Record<Screen, string> = {
  package: 'Package Selection',
  datetime: 'Date & Time Selection',
  details: 'Personal Details',
  summary: 'Review',
  done: 'Booking Confirmation',
};

// Paris-only sessionStorage key (Milan uses its own key).
const CONFIRMATION_KEY = 'meocy_paris_booking_confirmation';
const CONFIRMATION_TTL_MS = 30 * 60 * 1000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s().-]+$/;
const INTL_LOCALE = { en: 'en-GB', it: 'it-IT', fr: 'fr-FR' } as const;

interface Details {
  name: string;
  email: string;
  phone: string;
  people: number;
  country: string;
  notes: string;
  company_website: string;
}
const emptyDetails: Details = { name: '', email: '', phone: '', people: parisStandardPeople, country: '', notes: '', company_website: '' };

interface Saved {
  reference: string;
  pricing: ParisPricing;
  packageId: ParisPackageId;
  date: string;
  time: string;
  details: Details;
  timestamp: number;
}

const fieldClass =
  'mt-1.5 block min-h-[48px] w-full min-w-0 rounded-xl bg-chalk px-4 py-3 text-[16px] text-ink ring-1 ring-ink/10 outline-none transition-shadow focus:ring-2 focus:ring-ink aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-500';
const btnPrimary =
  'inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-accent px-7 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink transition-transform duration-150 ease-smooth hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60';
const btnGhost =
  'inline-flex min-h-[52px] items-center justify-center gap-1.5 rounded-full px-6 text-[13px] font-semibold uppercase tracking-[0.1em] text-chalk ring-1 ring-chalk/30 transition-colors hover:bg-chalk/10';

const readSaved = (): Saved | null => {
  try {
    const raw = sessionStorage.getItem(CONFIRMATION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as Saved;
    if (!s.reference || Date.now() - s.timestamp > CONFIRMATION_TTL_MS) {
      sessionStorage.removeItem(CONFIRMATION_KEY);
      return null;
    }
    return s;
  } catch {
    return null;
  }
};
const writeSaved = (s: Saved) => {
  try {
    sessionStorage.setItem(CONFIRMATION_KEY, JSON.stringify(s));
  } catch {
    // ignore
  }
};
const clearSaved = () => {
  try {
    sessionStorage.removeItem(CONFIRMATION_KEY);
  } catch {
    // ignore
  }
};

interface Props {
  packageId: ParisPackageId | null;
  onPackageChange: (id: ParisPackageId) => void;
}

export function ParisBookingFlow({ packageId, onPackageChange }: Props) {
  const { lang } = useLanguage();
  const p = parisCopy[lang];
  const b = p.booking;

  const [screen, setScreen] = useState<Screen>('package');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [details, setDetails] = useState<Details>(emptyDetails);
  const [errors, setErrors] = useState<Partial<Record<keyof Details | 'package' | 'date' | 'time', string>>>({});
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [result, setResult] = useState<{ reference: string; pricing: ParisPricing } | null>(null);

  const lockRef = useRef(false);
  const submissionIdRef = useRef('');
  const formStartRef = useRef(false);

  // Restore a recent confirmation after a refresh (Paris key only).
  useEffect(() => {
    const saved = readSaved();
    if (!saved) return;
    setScreen('done');
    setDate(saved.date);
    setTime(saved.time);
    setDetails(saved.details);
    setResult({ reference: saved.reference, pricing: saved.pricing });
    onPackageChange(saved.packageId);
    lockRef.current = true;
    formStartRef.current = true;
  }, []);

  useEffect(() => {
    if (screen !== 'package' && !formStartRef.current) {
      formStartRef.current = true;
      trackParisBookingEvent('booking_form_start');
    }
  }, [screen]);

  const pkg = parisPackages.find((x) => x.id === packageId) ?? null;
  const pricing = pkg ? computeParisPricing(pkg.id) : null;
  const days = useMemo(() => upcomingParisShootDays(), []);
  const slots = useMemo(() => (date && pkg ? parisSlotsFor(date, pkg.id) : []), [date, pkg]);

  // A single shoot day is pre-selected.
  useEffect(() => {
    if (!date && days.length === 1) setDate(days[0].date);
  }, [date, days]);
  // Clear a start time that no longer fits the chosen package or day.
  useEffect(() => {
    if (time && !slots.includes(time)) setTime('');
  }, [slots, time]);

  const money = (n: number) => formatPrice(n, lang);
  const longDate = (d: string) =>
    d ? new Intl.DateTimeFormat(INTL_LOCALE[lang], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${d}T00:00:00Z`)) : '';

  const go = (s: Screen) => {
    setScreen(s);
    setSubmitError('');
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.requestAnimationFrame(() => document.querySelector<HTMLElement>('#booking h3[tabindex="-1"]')?.focus({ preventScroll: true }));
    trackParisBookingEvent('booking_step_view', { step_number: PROGRESS[s], step_name: STEP_NAMES[s] });
  };

  const validateDetails = () => {
    const e: typeof errors = {};
    if (details.name.trim().length < 2) e.name = b.errRequired;
    if (!EMAIL_RE.test(details.email.trim())) e.email = b.errEmail;
    const phone = details.phone.trim();
    if (!PHONE_RE.test(phone) || phone.replace(/\D/g, '').length < 6 || phone.length > 30) e.phone = b.errPhone;
    if (details.country.trim().length < 2) e.country = b.errRequired;
    return e;
  };

  const next = () => {
    const e: typeof errors = {};
    if (screen === 'package' && !pkg) e.package = b.errRequired;
    if (screen === 'datetime') {
      if (!date || !days.some((d) => d.date === date)) e.date = b.errDate;
      else if (!time || !slots.includes(time)) e.time = b.errTime;
    }
    if (screen === 'details') Object.assign(e, validateDetails());
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      document.getElementById(`pb-${first}`)?.focus();
      trackParisBookingEvent('booking_validation_error', { step_number: PROGRESS[screen], field_name: first });
      return;
    }
    go(SCREENS[SCREENS.indexOf(screen) + 1]);
  };
  const back = () => go(SCREENS[Math.max(0, SCREENS.indexOf(screen) - 1)]);

  const submit = async () => {
    if (lockRef.current || result) return;
    if (!pkg) return go('package');
    lockRef.current = true;
    setSending(true);
    setSubmitError('');
    if (!submissionIdRef.current) submissionIdRef.current = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    trackParisBookingEvent('booking_submit_attempt');
    const fail = (msg: string) => {
      setSubmitError(msg);
      lockRef.current = false;
      setSending(false);
    };
    try {
      const res = await fetch('/api/paris/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: submissionIdRef.current,
          packageId: pkg.id,
          date,
          time,
          name: details.name.trim(),
          email: details.email.trim(),
          phone: details.phone.trim(),
          people: details.people,
          country: details.country.trim(),
          notes: details.notes.trim(),
          locale: lang,
          company_website: details.company_website,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.reference) {
        writeSaved({ reference: json.reference, pricing: json.pricing, packageId: pkg.id, date, time, details, timestamp: Date.now() });
        setResult({ reference: json.reference, pricing: json.pricing });
        trackParisBookingEvent('booking_submit_success');
        go('done');
      } else if (res.status === 409) fail(b.errUnavailable);
      else if (res.status === 429) fail(b.errRate);
      else fail(b.errGeneric);
    } catch {
      fail(b.errGeneric);
    }
  };

  const restart = () => {
    clearSaved();
    setResult(null);
    setTime('');
    setDetails(emptyDetails);
    setErrors({});
    lockRef.current = false;
    submissionIdRef.current = '';
    go('package');
  };

  const err = (k: keyof typeof errors) => (
    <p id={`pb-${k}-error`} aria-live="polite" className="mt-2 text-[13.5px] text-red-300 empty:hidden">
      {errors[k] ?? ''}
    </p>
  );
  const inv = (k: keyof typeof errors) => ({ 'aria-required': true, 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `pb-${k}-error` : undefined });
  const setField = <K extends keyof Details>(k: K, v: Details[K]) => {
    setDetails((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const summaryRows = (pr: ParisPricing | null): [string, string][] =>
    pkg && pr
      ? [
          [b.sumPackage, p.packages[pkg.id].name],
          [b.sumLocation, p.location.name],
          [b.sumDate, longDate(date)],
          [b.sumTime, time],
          [b.sumPeople, String(details.people)],
          [b.sumTotal, money(pr.total)],
          [b.sumDelivery, b.deliveryTime],
        ]
      : [];

  const SummaryTable = ({ rows }: { rows: [string, string][] }) => (
    <dl className="divide-y divide-chalk/10 rounded-2xl bg-chalk/[0.06] px-5 ring-1 ring-chalk/15">
      {rows.map(([k, v]) => (
        <div key={k} className="flex flex-col gap-0.5 py-3.5 sm:flex-row sm:justify-between sm:gap-6">
          <dt className="text-[13.5px] text-chalk/60">{k}</dt>
          <dd className="text-[15px] font-semibold sm:text-right">{v}</dd>
        </div>
      ))}
    </dl>
  );

  const waToMeocy =
    result && pkg
      ? `https://wa.me/${parisContact.whatsappNumber}?text=${encodeURIComponent(
          [b.waIntro, `${b.waRef} ${result.reference}`, `${b.waPackage} ${p.packages[pkg.id].name}`, `${b.waDate} ${longDate(date)}`, `${b.waTime} ${time}`, p.location.name].join('\n'),
        )}`
      : '';

  const step = PROGRESS[screen];
  const heading: Record<Screen, string> = {
    package: b.pkgTitle,
    datetime: b.dateTimeTitle,
    details: b.detailsTitle,
    summary: b.summaryTitle,
    done: b.doneTitle,
  };

  return (
    <div>
      <ol className="grid grid-cols-5 gap-1.5" aria-label={fmt(b.stepOf, { n: step + 1, total: b.progress.length })}>
        {b.progress.map((label, i) => (
          <li key={label} aria-current={i === step ? 'step' : undefined} className="min-w-0">
            <span className={`block h-1 rounded-full ${i <= step ? 'bg-accent' : 'bg-chalk/15'}`} />
            <span className={`mt-2 hidden truncate text-[11.5px] font-semibold uppercase tracking-[0.12em] lg:block ${i === step ? 'text-chalk' : 'text-chalk/45'}`}>
              {i + 1} {label}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-chalk/55 lg:hidden">
        {fmt(b.stepOf, { n: step + 1, total: b.progress.length })} · {b.progress[step]}
      </p>

      <h3 className="mt-8 font-display text-[clamp(1.9rem,4vw,2.6rem)] leading-[1.05] tracking-tighter-display" tabIndex={-1}>
        {heading[screen]}
      </h3>

      <div className="mt-6">
        {screen === 'package' && (
          <div role="radiogroup" aria-label={b.pkgTitle} className="grid gap-3 lg:grid-cols-3">
            {parisPackages.map((x) => {
              const on = x.id === packageId;
              return (
                <button
                  key={x.id}
                  id={x === parisPackages[0] ? 'pb-package' : undefined}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => {
                    setErrors((e) => ({ ...e, package: undefined }));
                    onPackageChange(x.id);
                  }}
                  className={`flex min-h-[44px] flex-col rounded-2xl p-5 text-left ring-1 transition-colors ${on ? 'bg-chalk text-ink ring-chalk' : 'bg-chalk/[0.04] ring-chalk/20 hover:ring-chalk/50'}`}>
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-[14px] font-semibold uppercase tracking-[0.08em]">
                      {p.packages[x.id].name} — {money(x.price)}
                    </span>
                    {on && <Check className="h-4 w-4 shrink-0" strokeWidth={3} aria-hidden />}
                  </span>
                  <span className={`mt-2 text-[13.5px] ${on ? 'text-slate2' : 'text-chalk/60'}`}>{fmt(b.pkgLine, { hours: x.durationHours, photos: x.photos })}</span>
                </button>
              );
            })}
            {err('package')}
          </div>
        )}

        {screen === 'datetime' && (
          <div>
            <p className="flex items-center gap-2 text-[14.5px] text-chalk/75">
              <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden />
              <span>
                <span className="text-chalk/55">{p.location.label}:</span> <strong className="font-semibold text-chalk">{p.location.name}</strong>
              </span>
            </p>

            <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.14em] text-chalk/55">{b.dayLabel}</p>
            {days.length ? (
              <div id="pb-date" tabIndex={-1} role="radiogroup" aria-label={b.dayLabel} className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {days.map((d) => (
                  <button
                    key={d.date}
                    type="button"
                    role="radio"
                    aria-checked={d.date === date}
                    onClick={() => {
                      setDate(d.date);
                      setErrors((e) => ({ ...e, date: undefined }));
                    }}
                    className={`min-h-[52px] rounded-xl px-4 text-left text-[15px] font-semibold ring-1 transition-colors ${d.date === date ? 'bg-chalk text-ink ring-chalk' : 'ring-chalk/25 hover:ring-chalk/60'}`}>
                    {longDate(d.date)}
                  </button>
                ))}
              </div>
            ) : (
              <p id="pb-date" tabIndex={-1} className="mt-3 rounded-xl bg-chalk/10 px-4 py-3 text-[14.5px]">
                {b.noDays}
              </p>
            )}
            {err('date')}

            {date && (
              <>
                <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.14em] text-chalk/55">{b.timeLabel}</p>
                {slots.length ? (
                  <div id="pb-time" tabIndex={-1} role="radiogroup" aria-label={b.timeLabel} className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {slots.map((s) => (
                      <button
                        key={s}
                        type="button"
                        role="radio"
                        aria-checked={s === time}
                        onClick={() => {
                          setTime(s);
                          setErrors((e) => ({ ...e, time: undefined }));
                        }}
                        className={`min-h-[48px] rounded-xl text-[15px] font-semibold tabular-nums ring-1 transition-colors ${s === time ? 'bg-accent text-ink ring-accent' : 'ring-chalk/25 hover:ring-chalk/60'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p id="pb-time" tabIndex={-1} className="mt-3 rounded-xl bg-chalk/10 px-4 py-3 text-[14.5px]">
                    {b.noTimes}
                  </p>
                )}
                {err('time')}
              </>
            )}
            <p className="mt-5 text-[13.5px] text-chalk/60">{b.timeNote}</p>
          </div>
        )}

        {screen === 'details' && (
          <div className="grid max-w-2xl gap-5 sm:grid-cols-2">
            {([['name', b.name, 'name', 'text'], ['email', b.email, 'email', 'email'], ['phone', b.phone, 'tel', 'tel'], ['country', b.country, 'country-name', 'text']] as const).map(([k, label, ac, type]) => (
              <div key={k}>
                <label htmlFor={`pb-${k}`} className="block text-[13.5px] font-medium">
                  {label} <span aria-hidden className="text-chalk/50">*</span>
                </label>
                <input
                  id={`pb-${k}`}
                  type={type}
                  autoComplete={ac}
                  inputMode={type === 'tel' ? 'tel' : type === 'email' ? 'email' : undefined}
                  maxLength={k === 'email' ? 254 : k === 'phone' ? 30 : k === 'name' ? 100 : 80}
                  value={details[k]}
                  onChange={(e) => setField(k, e.target.value)}
                  {...inv(k)}
                  className={fieldClass}
                />
                {err(k)}
              </div>
            ))}
            <div>
              <label htmlFor="pb-people" className="block text-[13.5px] font-medium">{b.people}</label>
              <select id="pb-people" value={details.people} onChange={(e) => setField('people', Number(e.target.value))} className={fieldClass}>
                {Array.from({ length: parisMaxPeople }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            {details.people > parisStandardPeople && (
              <p className="self-end rounded-xl bg-chalk/10 px-4 py-3 text-[13.5px] leading-snug sm:col-span-2" role="status">
                {b.groupNote}
              </p>
            )}
            <div className="sm:col-span-2">
              <label htmlFor="pb-notes" className="block text-[13.5px] font-medium">{b.notes}</label>
              <textarea id="pb-notes" rows={4} maxLength={1000} value={details.notes} onChange={(e) => setField('notes', e.target.value)} className={`${fieldClass} resize-y`} />
            </div>
            <FormPrivacyNotice className="text-[13px] leading-snug text-chalk/60 sm:col-span-2" linkClassName="hover:text-chalk" />
            {/* Honeypot: hidden from people and assistive tech. */}
            <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-px w-px overflow-hidden">
              <label htmlFor="pb-company-website">Company website</label>
              <input id="pb-company-website" type="text" tabIndex={-1} autoComplete="off" value={details.company_website} onChange={(e) => setField('company_website', e.target.value)} />
            </div>
          </div>
        )}

        {screen === 'summary' && pricing && (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start">
            <SummaryTable rows={summaryRows(pricing)} />
            <div className="rounded-2xl bg-accent p-6 text-ink">
              <p className="text-[18px] font-semibold">{b.noPaymentTitle}</p>
              <p className="mt-2 text-[14.5px] leading-snug">{b.noPaymentText}</p>
              {details.people > parisStandardPeople && <p className="mt-3 text-[13.5px] leading-snug">{b.groupNote}</p>}
              <a href="#booking-conditions" className="mt-2 inline-flex min-h-[44px] items-center text-[13.5px] font-medium underline decoration-2 underline-offset-4">
                {p.policy.title}
              </a>
            </div>
          </div>
        )}

        {screen === 'done' && result && pkg && (
          <div role="status">
            <p className="max-w-3xl text-[16px] text-chalk/75">{b.doneText}</p>
            <div className="mt-6 inline-flex flex-col rounded-2xl bg-accent px-6 py-4 text-ink">
              <span className="text-[11.5px] font-semibold uppercase tracking-[0.16em]">{b.reference}</span>
              <span className="mt-1 whitespace-nowrap font-display text-[clamp(1.5rem,7vw,2rem)] leading-none tracking-tight" data-testid="paris-booking-reference">
                {result.reference}
              </span>
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <SummaryTable rows={summaryRows(result.pricing)} />
              <div>
                <h4 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-chalk/55">{b.customerTitle}</h4>
                <div className="mt-3">
                  <SummaryTable
                    rows={[
                      [b.name, details.name],
                      [b.email, details.email],
                      [b.phone, details.phone],
                      [b.country, details.country],
                      ...(details.notes ? [[b.notes, details.notes] as [string, string]] : []),
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={waToMeocy} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                {b.waCta}
              </a>
              <button type="button" onClick={restart} className={btnGhost}>
                {b.another}
              </button>
            </div>
          </div>
        )}
      </div>

      {screen !== 'done' && (
        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-chalk/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          {screen !== 'package' ? (
            <button type="button" onClick={back} className={btnGhost}>
              <ChevronLeft className="h-4 w-4" aria-hidden /> {b.back}
            </button>
          ) : (
            <span />
          )}
          {screen === 'summary' ? (
            <button type="button" onClick={submit} disabled={sending} className={btnPrimary}>
              {sending ? (
                <>
                  <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden /> {b.sending}
                </>
              ) : (
                b.submit
              )}
            </button>
          ) : (
            <button type="button" onClick={next} className={btnPrimary}>
              {b.next} <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          )}
        </div>
      )}
      <div aria-live="assertive" className="empty:hidden">
        {submitError && (
          <p role="alert" className="mt-4 rounded-xl bg-red-500/15 px-4 py-3 text-[14.5px] text-red-200">
            {submitError}
          </p>
        )}
      </div>
    </div>
  );
}
