'use client';
import { FormPrivacyNotice } from '../FormPrivacyNotice';
import React, { useEffect, useRef, useMemo, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Loader2Icon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  computePricing,
  depositAmount,
  depositPaymentUrl,
  isDateSelectable,
  maxLocationsFor,
  maxPeople,
  milanContact,
  milanLocations,
  milanPackages,
  selectableSlots,
  standardPeople,
  todayInMilan,
  type MilanLocationId,
  type MilanPackageId,
  type MilanPricing,
  fillRefund,
} from '../../lib/milan-shoot-config';
import { fmt, formatPrice } from './parts';

type Screen = 'package' | 'date' | 'time' | 'locations' | 'details' | 'summary' | 'deposit' | 'done';
const SCREENS: Screen[] = ['package', 'date', 'time', 'locations', 'details', 'summary', 'deposit', 'done'];
// Screen → position in the 6-step progress indicator (Package, Date & Time, Locations, Details, Payment, Confirmation).
const PROGRESS: Record<Screen, number> = { package: 0, date: 1, time: 1, locations: 2, details: 3, summary: 4, deposit: 4, done: 5 };

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
const emptyDetails: Details = { name: '', email: '', phone: '', people: standardPeople, country: '', notes: '', company_website: '' };

interface Props {
  packageId: MilanPackageId | null;
  onPackageChange: (id: MilanPackageId) => void;
  locations: MilanLocationId[];
  onLocationsChange: (ids: MilanLocationId[]) => void;
}

const fieldClass =
  'mt-1.5 block min-h-[48px] w-full min-w-0 rounded-xl bg-chalk px-4 py-3 text-[16px] text-ink ring-1 ring-ink/10 outline-none transition-shadow focus:ring-2 focus:ring-ink aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-500';
const btnPrimary =
  'inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-accent px-7 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink transition-transform duration-150 ease-smooth hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60';
const btnGhost =
  'inline-flex min-h-[52px] items-center justify-center gap-1.5 rounded-full px-6 text-[13px] font-semibold uppercase tracking-[0.1em] text-chalk ring-1 ring-chalk/30 transition-colors hover:bg-chalk/10';

/** Payment-ready deposit block: shows a pay link only when a provider URL is configured. Never reports a payment. */
function DepositPayment({ url, amount, labels }: { url: string; amount: string; labels: { title: string; currency: string; pending: string; button: string; policy: string; policyLink: string } }) {
  return (
    <div className="rounded-2xl bg-chalk/[0.06] p-6 ring-1 ring-chalk/15 sm:p-7">
      <p className="font-display text-[2.4rem] leading-none tracking-tighter-display text-accent">{amount}</p>
      <h4 className="mt-3 text-[16px] font-semibold">{labels.title}</h4>
      <p className="mt-1 text-[13.5px] text-chalk/60">{labels.currency}</p>
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} mt-5`}>
          {labels.button}
        </a>
      ) : (
        <p className="mt-5 rounded-xl bg-chalk/10 px-4 py-3 text-[14.5px]">{labels.pending}</p>
      )}
      <p className="mt-5 text-[13.5px] leading-relaxed text-chalk/65">{labels.policy}</p>
      <a href="/booking-policy" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-[44px] items-center text-[13.5px] font-medium text-chalk underline decoration-accent decoration-2 underline-offset-4">
        {labels.policyLink}
      </a>
    </div>
  );
}

function Calendar({ value, onChange, lang, labels }: { value: string; onChange: (d: string) => void; lang: keyof typeof INTL_LOCALE; labels: { prev: string; next: string } }) {
  const today = todayInMilan();
  const [view, setView] = useState(() => {
    const base = value || today;
    return { y: Number(base.slice(0, 4)), m: Number(base.slice(5, 7)) - 1 };
  });
  const loc = INTL_LOCALE[lang];
  const monthLabel = new Intl.DateTimeFormat(loc, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(Date.UTC(view.y, view.m, 1));
  // Monday-first weekday labels (1 Jan 2024 was a Monday).
  const weekdays = Array.from({ length: 7 }, (_, i) => new Intl.DateTimeFormat(loc, { weekday: 'short', timeZone: 'UTC' }).format(Date.UTC(2024, 0, 1 + i)));
  const first = new Date(Date.UTC(view.y, view.m, 1));
  const offset = (first.getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(view.y, view.m + 1, 0)).getUTCDate();
  const iso = (d: number) => `${view.y}-${String(view.m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  const atCurrentMonth = `${view.y}-${String(view.m + 1).padStart(2, '0')}` <= today.slice(0, 7);
  const shift = (delta: number) => setView((v) => {
    const d = new Date(Date.UTC(v.y, v.m + delta, 1));
    return { y: d.getUTCFullYear(), m: d.getUTCMonth() };
  });
  const fullLabel = (d: string) => new Intl.DateTimeFormat(loc, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${d}T00:00:00Z`));

  return (
    <div className="max-w-md rounded-2xl bg-chalk p-4 text-ink sm:p-5">
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => shift(-1)} disabled={atCurrentMonth} aria-label={labels.prev} className="grid h-11 w-11 place-items-center rounded-full hover:bg-paper disabled:opacity-30">
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <p className="text-[15px] font-semibold capitalize" aria-live="polite">{monthLabel}</p>
        <button type="button" onClick={() => shift(1)} aria-label={labels.next} className="grid h-11 w-11 place-items-center rounded-full hover:bg-paper">
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[11.5px] font-medium uppercase text-slate2">
        {weekdays.map((w) => <span key={w}>{w}</span>)}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {Array.from({ length: offset }, (_, i) => <span key={`x${i}`} />)}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const d = iso(i + 1);
          const ok = isDateSelectable(d);
          const selected = d === value;
          return (
            <button
              key={d}
              type="button"
              disabled={!ok}
              aria-pressed={selected}
              aria-label={fullLabel(d)}
              onClick={() => onChange(d)}
              className={`grid aspect-square min-h-[40px] place-items-center rounded-full text-[14px] tabular-nums transition-colors ${
                selected ? 'bg-ink font-semibold text-chalk' : ok ? 'hover:bg-paper' : 'cursor-not-allowed text-ink/25 line-through'
              }`}>
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function BookingFlow({ packageId, onPackageChange, locations, onLocationsChange }: Props) {
  const { t, lang } = useLanguage();
  const m = t.milanShoot;
  const b = m.booking;

  const [screen, setScreen] = useState<Screen>('package');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [details, setDetails] = useState<Details>(emptyDetails);
  const [errors, setErrors] = useState<Partial<Record<keyof Details | 'package' | 'date' | 'time' | 'locations', string>>>({});
  const [pendingExtra, setPendingExtra] = useState<MilanLocationId | null>(null);
  const [limitHit, setLimitHit] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [result, setResult] = useState<{ reference: string; pricing: MilanPricing } | null>(null);

  // Immediate synchronous lock to prevent duplicate submission even with rapid clicks.
  // Race: Two renders can execute submit before state setter completes.
  // Solution: Use ref to block at function entry before any async operations.
  const submissionLockRef = useRef(false);
  const submissionIdRef = useRef<string>('');

  const pkg = milanPackages.find((p) => p.id === packageId) ?? null;
  const pricing = pkg ? computePricing(pkg.id, locations.length) : null;
  const slots = useMemo(() => (date && pkg ? selectableSlots(date, pkg.id) : []), [date, pkg]);

  // When package changes (including via external props), validate that current time is valid.
  // Clear time if it's no longer valid for the new package's duration.
  // Also trim locations to fit the new package's maximum.
  useEffect(() => {
    if (pkg) {
      // Trim locations if they exceed the new package's maximum.
      const max = maxLocationsFor(pkg.id);
      if (locations.length > max) {
        onLocationsChange(locations.slice(0, max));
      }
      // Clear time if it's not valid for the new package's duration.
      if (date && time) {
        const validSlots = selectableSlots(date, pkg.id);
        if (!validSlots.includes(time)) {
          setTime('');
          setErrors((e) => ({ ...e, time: undefined }));
        }
      }
    }
  }, [pkg, date, locations, onLocationsChange]);
  const money = (n: number) => formatPrice(n, lang);
  const longDate = (d: string) =>
    d ? new Intl.DateTimeFormat(INTL_LOCALE[lang], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${d}T00:00:00Z`)) : '';
  const locationNames = locations.map((l) => m.locations[l].name);

  const go = (s: Screen) => {
    setScreen(s);
    setSubmitError('');
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Move focus to the new step's heading so keyboard and screen-reader users land on the new step.
    window.requestAnimationFrame(() => document.querySelector<HTMLElement>('#booking h3[tabindex="-1"]')?.focus({ preventScroll: true }));
  };

  const choosePackage = (id: MilanPackageId) => {
    const max = maxLocationsFor(id);
    if (locations.length > max) onLocationsChange(locations.slice(0, max));
    // Clear time if it's not valid for the new package's duration
    if (date && time) {
      const validSlots = selectableSlots(date, id);
      if (!validSlots.includes(time)) {
        setTime('');
        setErrors((e) => ({ ...e, time: undefined }));
      }
    }
    setPendingExtra(null);
    setLimitHit(false);
    setErrors((e) => ({ ...e, package: undefined }));
    onPackageChange(id);
  };

  const toggleLocation = (id: MilanLocationId) => {
    if (!pkg) return;
    setLimitHit(false);
    setErrors((e) => ({ ...e, locations: undefined }));
    if (locations.includes(id)) {
      onLocationsChange(locations.filter((l) => l !== id));
      setPendingExtra(null);
    } else if (locations.length < pkg.includedLocations) {
      onLocationsChange([...locations, id]);
      setPendingExtra(null);
    } else if (pkg.extraLocationPrice !== null) {
      setPendingExtra(id);
    } else {
      setPendingExtra(null);
      setLimitHit(true);
    }
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
    if (screen === 'date' && !(date && isDateSelectable(date))) e.date = b.errDate;
    if (screen === 'time' && !(time && slots.includes(time))) e.time = b.errTime;
    if (screen === 'locations' && locations.length === 0) e.locations = b.errLocations;
    if (screen === 'locations' && pkg && locations.length > maxLocationsFor(pkg.id)) e.locations = b.errLocations;
    if (screen === 'details') Object.assign(e, validateDetails());
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      document.getElementById(`mb-${first}`)?.focus();
      return;
    }
    go(SCREENS[SCREENS.indexOf(screen) + 1]);
  };
  const back = () => go(SCREENS[Math.max(0, SCREENS.indexOf(screen) - 1)]);

  const submit = async () => {
    // Immediate guard: prevent submission if already in progress or completed.
    if (submissionLockRef.current || result) return;
    if (!pkg) return go('package');

    // Lock immediately (synchronously) before any async operations.
    // This prevents two rapid clicks from both reaching the API.
    submissionLockRef.current = true;
    setSending(true);
    setSubmitError('');

    // Generate submission ID on first attempt; reuse for retries (if any).
    if (!submissionIdRef.current) {
      submissionIdRef.current = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    try {
      const res = await fetch('/api/milan/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: submissionIdRef.current,
          packageId: pkg.id,
          date,
          time,
          locations,
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
        setResult({ reference: json.reference, pricing: json.pricing });
        go('done');
        // On success, keep lock active (don't reset submissionLockRef).
        // User stays on 'done' screen; they cannot re-submit from there.
      } else if (res.ok) {
        setSubmitError(b.errGeneric);
        // Success response but no reference: treat as error and release lock for retry.
        submissionLockRef.current = false;
        setSending(false);
      } else if (res.status === 409) {
        setSubmitError(b.errUnavailable);
        submissionLockRef.current = false;
        setSending(false);
      } else if (res.status === 429) {
        setSubmitError(b.errRate);
        submissionLockRef.current = false;
        setSending(false);
      } else {
        setSubmitError(b.errGeneric);
        submissionLockRef.current = false;
        setSending(false);
      }
    } catch {
      setSubmitError(b.errGeneric);
      submissionLockRef.current = false;
      setSending(false);
    }
  };

  const restart = () => {
    setResult(null);
    setDate('');
    setTime('');
    setDetails(emptyDetails);
    setErrors({});
    onLocationsChange([]);
    // Reset submission lock for new booking attempt.
    submissionLockRef.current = false;
    submissionIdRef.current = '';
    go('package');
  };

  const err = (k: keyof typeof errors) => (
    <p id={`mb-${k}-error`} aria-live="polite" className="mt-2 text-[13.5px] text-red-300 empty:hidden">
      {errors[k] ?? ''}
    </p>
  );
  const inv = (k: keyof typeof errors) => ({ 'aria-required': true, 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `mb-${k}-error` : undefined });
  const setField = <K extends keyof Details>(k: K, v: Details[K]) => {
    setDetails((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const rowsFor = (pr: MilanPricing | null): [string, string][] => {
    if (!pkg || !pr) return [];
    const rows: [string, string][] = [
      [b.sumPackage, m.packages[pkg.id].name],
      [b.sumDate, longDate(date)],
      [b.sumTime, time],
      [b.sumLocations, locationNames.join(', ')],
      [b.sumPeople, String(details.people)],
      [b.sumPackagePrice, money(pr.packagePrice)],
    ];
    if (pr.extraLocations > 0) {
      rows.push([b.sumExtra, `${pr.extraLocations} × ${money(pr.extraLocationPrice)} = ${money(pr.extraLocationsTotal)}`]);
    }
    rows.push([b.sumDeposit, money(pr.deposit)], [b.sumRemaining, money(pr.remaining)]);
    return rows;
  };
  const summaryRows = rowsFor(pricing);

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

  const waToMeocy = result && pkg
    ? `https://wa.me/${milanContact.whatsappNumber}?text=${encodeURIComponent(
        [b.waIntro, `${b.waRef} ${result.reference}`, `${b.waPackage} ${m.packages[pkg.id].name}`, `${b.waDate} ${longDate(date)}`, `${b.waTime} ${time}`].join('\n'),
      )}`
    : '';

  const step = PROGRESS[screen];
  const heading: Record<Screen, string> = {
    package: b.pkgTitle, date: b.dateTitle, time: b.timeTitle, locations: b.locTitle, details: b.detailsTitle,
    summary: b.summaryTitle, deposit: b.payTitle, done: b.doneTitle,
  };

  return (
    <div>
      {/* Progress indicator */}
      <ol className="grid grid-cols-6 gap-1.5" aria-label={fmt(b.stepOf, { n: step + 1, total: b.progress.length })}>
        {b.progress.map((label, i) => (
          <li key={label} aria-current={i === step ? 'step' : undefined} className="min-w-0">
            <span className={`block h-1 rounded-full ${i <= step ? 'bg-accent' : 'bg-chalk/15'}`} />
            <span className={`mt-2 hidden truncate text-[11.5px] font-semibold uppercase tracking-[0.12em] lg:block ${i === step ? 'text-chalk' : 'text-chalk/45'}`}>
              {i + 1} {label}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-chalk/55 sm:hidden">
        {fmt(b.stepOf, { n: step + 1, total: b.progress.length })} · {b.progress[step]}
      </p>

      <h3 className="mt-8 font-display text-[clamp(1.9rem,4vw,2.6rem)] leading-[1.05] tracking-tighter-display" tabIndex={-1}>
        {heading[screen]}
      </h3>

      <div className="mt-6">
        {screen === 'package' && (
          <div role="radiogroup" aria-label={b.pkgTitle} className="grid gap-3 lg:grid-cols-3">
            {milanPackages.map((p) => {
              const on = p.id === packageId;
              return (
                <button
                  key={p.id}
                  id={p === milanPackages[0] ? 'mb-package' : undefined}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => choosePackage(p.id)}
                  className={`flex min-h-[44px] flex-col rounded-2xl p-5 text-left ring-1 transition-colors ${on ? 'bg-chalk text-ink ring-chalk' : 'bg-chalk/[0.04] ring-chalk/20 hover:ring-chalk/50'}`}>
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-[14px] font-semibold uppercase tracking-[0.08em]">
                      {m.packages[p.id].name} — {money(p.price)}
                    </span>
                    {on && <Check className="h-4 w-4 shrink-0" strokeWidth={3} aria-hidden />}
                  </span>
                  <span className={`mt-2 text-[13.5px] ${on ? 'text-slate2' : 'text-chalk/60'}`}>
                    {fmt(b.pkgLine, { hours: p.durationHours, photos: p.photos, locations: p.includedLocations })}
                  </span>
                </button>
              );
            })}
            {err('package')}
          </div>
        )}

        {screen === 'date' && (
          <div id="mb-date" tabIndex={-1}>
            <Calendar value={date} onChange={(d) => { setDate(d); if (time && !selectableSlots(d).includes(time)) setTime(''); setErrors((e) => ({ ...e, date: undefined })); }} lang={lang} labels={{ prev: b.prevMonth, next: b.nextMonth }} />
            {date && <p className="mt-4 text-[14.5px]"><span className="text-chalk/60">{b.selectedDate}</span> <strong>{longDate(date)}</strong></p>}
            {err('date')}
          </div>
        )}

        {screen === 'time' && (
          <div id="mb-time" tabIndex={-1}>
            <p className="text-[14.5px] text-chalk/70">{longDate(date)}</p>
            {slots.length ? (
              <div role="radiogroup" aria-label={b.timeTitle} className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
                {slots.map((s) => (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    aria-checked={s === time}
                    onClick={() => { setTime(s); setErrors((e) => ({ ...e, time: undefined })); }}
                    className={`min-h-[48px] rounded-xl text-[15px] font-semibold tabular-nums ring-1 transition-colors ${s === time ? 'bg-accent text-ink ring-accent' : 'ring-chalk/25 hover:ring-chalk/60'}`}>
                    {s}
                  </button>
                ))}
              </div>
            ) : (
              <p className="mt-4 rounded-xl bg-chalk/10 px-4 py-3 text-[14.5px]">{b.noTimes}</p>
            )}
            <p className="mt-4 text-[13.5px] text-chalk/60">{b.timeNote}</p>
            {err('time')}
          </div>
        )}

        {screen === 'locations' && pkg && (
          <div id="mb-locations" tabIndex={-1}>
            <p className="text-[14.5px] text-chalk/70">
              {pkg.extraLocationPrice !== null ? fmt(b.locSignature, { n: pkg.includedLocations }) : fmt(b.locUpTo, { n: pkg.includedLocations })}
              {pricing && pricing.extraLocations > 0 && (
                <span className="ml-2 font-semibold text-accent">{fmt(m.selector.extraCount, { n: pricing.extraLocations, total: pricing.extraLocationsTotal })}</span>
              )}
            </p>
            {pkg.id === 'memory' && <p className="mt-2 text-[13.5px] text-chalk/55">{m.selector.duomoNote}</p>}
            <div aria-live="polite" className="empty:hidden">
              {(pendingExtra || limitHit) && (
                <div className="mt-4 flex flex-col gap-3 rounded-2xl bg-chalk px-5 py-4 text-ink sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[14.5px]">
                    {fmt(m.selector.limitIncluded, { n: pkg.includedLocations })}
                    {pendingExtra && <> {m.selector.limitAdd}</>}
                  </p>
                  {pendingExtra && (
                    <div className="grid shrink-0 gap-2 min-[480px]:flex">
                      <button type="button" onClick={() => { onLocationsChange([...locations, pendingExtra]); setPendingExtra(null); }} className="min-h-[44px] whitespace-nowrap rounded-full bg-accent px-5 text-[13px] font-semibold">
                        {m.selector.addConfirm}
                      </button>
                      <button type="button" onClick={() => setPendingExtra(null)} className="min-h-[44px] whitespace-nowrap rounded-full px-4 text-[13px] font-medium ring-1 ring-ink/20">
                        {m.selector.dismiss}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {milanLocations.map((l) => {
                const on = locations.includes(l.id);
                return (
                  <li key={l.id}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleLocation(l.id)}
                      className={`flex min-h-[56px] w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left ring-1 transition-colors ${on ? 'bg-chalk text-ink ring-chalk' : 'ring-chalk/20 hover:ring-chalk/50'}`}>
                      <span className="min-w-0">
                        <span className="block text-[13px] font-semibold uppercase tracking-[0.1em]">{m.locations[l.id].name}</span>
                        <span className={`block text-[13px] ${on ? 'text-slate2' : 'text-chalk/55'}`}>{m.locations[l.id].desc}</span>
                      </span>
                      <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${on ? 'bg-accent' : 'ring-1 ring-chalk/30'}`}>
                        {on && <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            {err('locations')}
          </div>
        )}

        {screen === 'details' && (
          <div className="grid max-w-2xl gap-5 sm:grid-cols-2">
            {([['name', b.name, 'name', 'text'], ['email', b.email, 'email', 'email'], ['phone', b.phone, 'tel', 'tel'], ['country', b.country, 'country-name', 'text']] as const).map(([k, label, ac, type]) => (
              <div key={k}>
                <label htmlFor={`mb-${k}`} className="block text-[13.5px] font-medium">{label} <span aria-hidden className="text-chalk/50">*</span></label>
                <input
                  id={`mb-${k}`}
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
              <label htmlFor="mb-people" className="block text-[13.5px] font-medium">{b.people}</label>
              <select id="mb-people" value={details.people} onChange={(e) => setField('people', Number(e.target.value))} className={fieldClass}>
                {Array.from({ length: maxPeople }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            {details.people > standardPeople && (
              <p className="self-end rounded-xl bg-chalk/10 px-4 py-3 text-[13.5px] leading-snug sm:col-span-2" role="status">{b.groupNote}</p>
            )}
            <div className="sm:col-span-2">
              <label htmlFor="mb-notes" className="block text-[13.5px] font-medium">{b.notes}</label>
              <textarea id="mb-notes" rows={4} maxLength={1000} value={details.notes} onChange={(e) => setField('notes', e.target.value)} className={`${fieldClass} resize-y`} />
            </div>
            <FormPrivacyNotice className="text-[13px] leading-snug text-chalk/60 sm:col-span-2" linkClassName="hover:text-chalk" />
            {/* Honeypot: hidden from people and assistive tech. */}
            <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-px w-px overflow-hidden">
              <label htmlFor="mb-company-website">Company website</label>
              <input id="mb-company-website" type="text" tabIndex={-1} autoComplete="off" value={details.company_website} onChange={(e) => setField('company_website', e.target.value)} />
            </div>
          </div>
        )}

        {screen === 'summary' && pricing && (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start">
            <SummaryTable rows={summaryRows} />
            <div className="rounded-2xl bg-accent p-6 text-ink">
              <p className="text-[18px] font-semibold">{b.depositHeadline}</p>
              <p className="mt-1 text-[15px]">{fmt(b.remainingLine, { amount: money(pricing.remaining) })}</p>
              <p className="mt-3 text-[13.5px] leading-snug">{fillRefund(b.payPolicy)}</p>
              {details.people > standardPeople && <p className="mt-3 text-[13.5px] leading-snug">{b.groupNote}</p>}
            </div>
          </div>
        )}

        {screen === 'deposit' && pricing && (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start">
            <DepositPayment
              url={depositPaymentUrl}
              amount={money(depositAmount)}
              labels={{ title: b.payTitle, currency: b.payCurrency, pending: b.payPending, button: b.payButton, policy: fillRefund(b.payPolicy), policyLink: b.policyLink }}
            />
            <div className="rounded-2xl bg-chalk/[0.06] p-6 text-[14.5px] ring-1 ring-chalk/15">
              <p className="font-semibold">{m.packages[pkg!.id].name} · {money(pricing.total)}</p>
              <p className="mt-1 text-chalk/65">{longDate(date)} · {time}</p>
              <p className="mt-1 text-chalk/65">{locationNames.join(', ')}</p>
              <p className="mt-3">{b.depositHeadline}</p>
              <p className="text-chalk/65">{fmt(b.remainingLine, { amount: money(pricing.remaining) })}</p>
            </div>
          </div>
        )}

        {screen === 'done' && result && pkg && (
          <div role="status">
            <p className="text-[16px] text-chalk/75">{b.doneText}</p>
            <div className="mt-6 inline-flex flex-col rounded-2xl bg-accent px-6 py-4 text-ink">
              <span className="text-[11.5px] font-semibold uppercase tracking-[0.16em]">{b.reference}</span>
              <span className="mt-1 whitespace-nowrap font-display text-[clamp(1.5rem,7vw,2rem)] leading-none tracking-tight" data-testid="booking-reference">{result.reference}</span>
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <SummaryTable rows={rowsFor(result.pricing).filter(([k]) => k !== b.sumPackagePrice && k !== b.sumExtra)} />
              <div>
                <h4 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-chalk/55">{b.customerTitle}</h4>
                <SummaryTable rows={[[b.name, details.name], [b.email, details.email], [b.phone, details.phone], [b.country, details.country], [b.people, String(details.people)], ...(details.notes ? [[b.notes, details.notes] as [string, string]] : [])]} />
              </div>
            </div>
            <p className="mt-6 max-w-3xl text-[14px] leading-relaxed text-chalk/65">{fillRefund(b.payPolicy)}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={waToMeocy} target="_blank" rel="noopener noreferrer" className={btnPrimary}>{b.waCta}</a>
              {depositPaymentUrl && <a href={depositPaymentUrl} target="_blank" rel="noopener noreferrer" className={btnGhost}>{b.payButton}</a>}
              <button type="button" onClick={restart} className={btnGhost}>{b.another}</button>
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
          ) : <span />}
          {screen === 'deposit' ? (
            <button type="button" onClick={submit} disabled={sending} className={btnPrimary}>
              {sending ? <><Loader2Icon className="h-4 w-4 animate-spin" aria-hidden /> {b.sending}</> : b.submit}
            </button>
          ) : (
            <button type="button" onClick={next} className={btnPrimary}>
              {b.next} <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          )}
        </div>
      )}
      <div aria-live="assertive" className="empty:hidden">
        {submitError && <p role="alert" className="mt-4 rounded-xl bg-red-500/15 px-4 py-3 text-[14.5px] text-red-200">{submitError}</p>}
      </div>
    </div>
  );
}
