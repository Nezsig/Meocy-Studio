'use client';
import React, { useRef, useState } from 'react';
import { CheckCircle2Icon, Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';
import { locales } from '../data/locales';
import { studioContact } from '../data/site';
import { FormPrivacyNotice } from './FormPrivacyNotice';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type FieldErrors = Partial<Record<'name' | 'email' | 'phone' | 'projectType' | 'message', string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s+\-()]+$/;

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  projectIndex: '',
  where: 'milan' as 'milan' | 'your-location',
  extras: [] as string[],
  message: '',
  company_website: '',
};

const labelClass = 'block text-[12px] font-semibold uppercase tracking-[0.12em] text-slate2 mb-4';
const fieldClass = 'mt-1 block min-h-[48px] w-full rounded-xl bg-paper px-4 py-3 text-[16px] ring-1 ring-ink/10 outline-none transition-shadow focus:ring-2 focus:ring-ink aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-500';

export function ContactPage() {
  const { t, lang } = useLanguage();
  const c = { ...locales.en.contactPage, ...(t?.contactPage ?? {}) };
  const options = c.projectOptions?.length === locales.en.contactPage.projectOptions.length
    ? c.projectOptions
    : locales.en.contactPage.projectOptions;

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [sentTo, setSentTo] = useState({ name: '', email: '' });
  const formRef = useRef<HTMLFormElement>(null);

  const set = <K extends keyof typeof emptyForm>(key: K, value: (typeof emptyForm)[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    const errKey = (key === 'projectIndex' ? 'projectType' : key) as keyof FieldErrors;
    if (errors[errKey]) setErrors((e) => ({ ...e, [errKey]: undefined }));
    if (status === 'error') setStatus('idle');
  };

  const toggleExtra = (extra: string) => {
    setForm((f) => ({
      ...f,
      extras: f.extras.includes(extra)
        ? f.extras.filter((e) => e !== extra)
        : [...f.extras, extra]
    }));
  };

  const validate = (): FieldErrors => {
    const e: FieldErrors = {};
    const name = form.name.trim();
    if (name.length < 2 || name.length > 100) e.name = c.errName;
    if (!EMAIL_RE.test(form.email.trim())) e.email = c.errEmail;
    if (form.projectIndex === '') e.projectType = c.errProject;
    const phone = form.phone.trim();
    if (phone && !PHONE_RE.test(phone)) e.phone = 'Please enter a valid phone number.';
    const message = form.message.trim();
    if (message.length < 10 || message.length > 3000) e.message = c.errMessage;
    return e;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    const firstInvalid = (['name', 'email', 'projectType', 'message'] as const).find((k) => e[k]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#ct-${firstInvalid}`)?.focus();
      return;
    }

    setStatus('sending');
    const idx = Number(form.projectIndex);
    const whereLabel = form.where === 'milan' ? c.briefMilan : c.briefYourLocation;
    const extrasLabel = form.extras.length > 0 ? form.extras.join(', ') : '';

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          projectType: locales.en.contactPage.projectOptions[idx],
          projectTypeLabel: options[idx],
          where: whereLabel,
          extras: extrasLabel,
          message: form.message.trim(),
          locale: lang,
          company_website: form.company_website,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSentTo({ name: form.name.trim().split(/\s+/)[0] || '', email: form.email.trim() });
      setStatus('sent');
    } catch (err) {
      console.error('Contact form error:', err);
      setStatus('error');
    }
  };

  const reset = () => {
    setForm(emptyForm);
    setErrors({});
    setSentTo({ name: '', email: '' });
    setStatus('idle');
  };

  const errorId = (k: keyof FieldErrors) => (errors[k] ? `ct-${k}-error` : undefined);
  const fieldError = (k: keyof FieldErrors) => (
    <p id={`ct-${k}-error`} aria-live="polite" className="mt-1 text-[12px] text-red-600 empty:hidden">
      {errors[k] ?? ''}
    </p>
  );

  const successBody = (c.successBody || '')
    .replace('{name}', sentTo.name)
    .replace('{email}', sentTo.email);

  const extras = [
    { id: 'casting', label: c.briefModelCasting },
    { id: 'styling', label: c.briefStyling },
    { id: 'vertical-video', label: c.briefVerticalVideo },
    { id: 'express', label: c.briefExpressDelivery },
  ];

  return (
    <>
      <main id="main-content" className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-slate2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
            PHOTOGRAPHY &amp; VIDEO STUDIO — MILAN
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.6rem,7vw,5rem)] leading-[1.02] tracking-tighter-display">
            {c.title}
          </h1>
          <div className="mt-5 max-w-2xl space-y-3 text-[17px] leading-relaxed text-slate2">
            <p className="text-ink">{c.intro1}</p>
            <p>{c.intro2}</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)] lg:items-start lg:gap-10">
            {/* LEFT: FORM */}
            <div className="scroll-mt-24">
              {status === 'sent' ? (
                <div className="rounded-[20px] border border-[#ecebe6] bg-chalk p-6 sm:p-8">
                  <div className="flex min-h-[360px] flex-col items-start justify-center" role="status">
                    <CheckCircle2Icon size={30} className="text-ink" aria-hidden />
                    <h2 className="mt-4 font-display text-[2.2rem] leading-tight tracking-tighter-display">
                      {c.successTitle}
                    </h2>
                    <p className="mt-3 max-w-md text-[15.5px] leading-relaxed text-slate2">{successBody}</p>
                    <button
                      type="button"
                      onClick={reset}
                      className="mt-7 inline-flex min-h-[48px] items-center justify-center rounded-full bg-ink px-6 text-[15px] font-medium text-chalk transition-transform duration-150 ease-smooth hover:-translate-y-0.5">
                      {c.another}
                    </button>
                  </div>
                </div>
              ) : (
                <form id="contact-form" ref={formRef} onSubmit={onSubmit} noValidate className="rounded-[20px] border border-[#ecebe6] bg-chalk p-6 sm:p-8 space-y-8">
                  {/* Section 1: Service */}
                  <div className="border-b border-ink/10 pb-8">
                    <h2 className={labelClass}>{c.briefWhat}</h2>
                    <div className="flex flex-wrap gap-2">
                      {options.map((opt, i) => (
                        <label key={i} className="cursor-pointer">
                          <input
                            type="radio"
                            name="service"
                            value={String(i)}
                            checked={form.projectIndex === String(i)}
                            onChange={(e) => set('projectIndex', e.target.value)}
                            className="peer sr-only"
                            required
                          />
                          <span className="inline-flex min-h-[44px] items-center rounded-full px-4 py-2 text-[14px] font-medium border border-ink/20 transition-colors peer-checked:border-ink peer-checked:bg-ink/5 peer-focus-visible:ring-2 peer-focus-visible:ring-ink text-ink">
                            {opt}
                          </span>
                        </label>
                      ))}
                    </div>
                    {fieldError('projectType')}
                  </div>

                  {/* Section 2: Location */}
                  <div className="border-b border-ink/10 pb-8">
                    <h2 className={labelClass}>{c.briefWhere}</h2>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {[
                        { id: 'milan', title: c.briefMilan, desc: c.briefMilanDesc },
                        { id: 'your-location', title: c.briefYourLocation, desc: c.briefYourLocationDesc }
                      ].map((loc) => (
                        <label key={loc.id} className="cursor-pointer">
                          <input
                            type="radio"
                            name="location"
                            value={loc.id}
                            checked={form.where === loc.id}
                            onChange={(e) => set('where', e.target.value as 'milan' | 'your-location')}
                            className="peer sr-only"
                          />
                          <div className="rounded-xl border border-ink/15 p-4 transition-all peer-checked:border-ink peer-checked:bg-ink/3 peer-focus-visible:ring-2 peer-focus-visible:ring-ink min-h-[100px] flex flex-col justify-center">
                            <p className="font-medium text-ink">{loc.title}</p>
                            <p className="mt-1 text-[14px] text-slate2">{loc.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Section 3: Extras */}
                  <div className="border-b border-ink/10 pb-8">
                    <h2 className={labelClass}>{c.briefExtras}</h2>
                    <div className="space-y-2">
                      {extras.map((extra) => (
                        <label key={extra.id} className="flex items-center gap-3 cursor-pointer min-h-[44px]">
                          <input
                            type="checkbox"
                            name="extras"
                            value={extra.id}
                            checked={form.extras.includes(extra.id)}
                            onChange={() => toggleExtra(extra.id)}
                            className="peer h-5 w-5 rounded border-2 border-ink/30 accent-accent cursor-pointer"
                          />
                          <span className="text-[14.5px] font-medium text-ink">{extra.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Section 4: Contact fields */}
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="ct-name" className="block text-[13px] font-medium text-ink">
                          {c.name} <span aria-hidden className="text-slate2">*</span>
                        </label>
                        <input
                          id="ct-name"
                          name="name"
                          autoComplete="name"
                          required
                          maxLength={100}
                          value={form.name}
                          onChange={(e) => set('name', e.target.value)}
                          aria-invalid={!!errors.name}
                          aria-describedby={errorId('name')}
                          className={fieldClass}
                        />
                        {fieldError('name')}
                      </div>
                      <div>
                        <label htmlFor="ct-email" className="block text-[13px] font-medium text-ink">
                          {c.email} <span aria-hidden className="text-slate2">*</span>
                        </label>
                        <input
                          id="ct-email"
                          name="email"
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          required
                          maxLength={254}
                          value={form.email}
                          onChange={(e) => set('email', e.target.value)}
                          aria-invalid={!!errors.email}
                          aria-describedby={errorId('email')}
                          className={fieldClass}
                        />
                        {fieldError('email')}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="ct-phone" className="block text-[13px] font-medium text-ink">
                        {c.briefPhone}
                      </label>
                      <input
                        id="ct-phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        maxLength={20}
                        value={form.phone}
                        onChange={(e) => set('phone', e.target.value)}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errorId('phone')}
                        className={fieldClass}
                      />
                      {fieldError('phone')}
                    </div>

                    <div>
                      <label htmlFor="ct-message" className="block text-[13px] font-medium text-ink">
                        {c.message} <span aria-hidden className="text-slate2">*</span>
                      </label>
                      <textarea
                        id="ct-message"
                        name="message"
                        rows={5}
                        required
                        minLength={10}
                        maxLength={3000}
                        value={form.message}
                        onChange={(e) => set('message', e.target.value)}
                        aria-invalid={!!errors.message}
                        aria-describedby={errorId('message')}
                        className={`${fieldClass} resize-y`}
                      />
                      {fieldError('message')}
                    </div>
                  </div>

                  {/* Honeypot */}
                  <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
                    <label htmlFor="ct-company-website">Company website</label>
                    <input
                      id="ct-company-website"
                      name="company_website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.company_website}
                      onChange={(e) => set('company_website', e.target.value)}
                    />
                  </div>

                  {status === 'error' && (
                    <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[14px] text-red-700">
                      {c.errGeneric}
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* RIGHT: SUMMARY + CONTACT DETAILS */}
            <div className={status === 'sent' ? 'hidden' : 'flex flex-col gap-6'}>
              {/* FORM SUMMARY */}
              <div className="sticky top-24 rounded-[20px] border border-[#ecebe6] bg-ink text-chalk p-6 sm:p-8">
                <h2 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-chalk/60 mb-6">
                  {c.briefSummaryTitle}
                </h2>

                <div className="space-y-6 mb-8">
                  {form.projectIndex && (
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-chalk/50">{c.briefSummaryService}</p>
                      <p className="mt-2 text-[16px] font-medium text-chalk">{options[Number(form.projectIndex)]}</p>
                    </div>
                  )}

                  <div className="pt-6 border-t border-chalk/20">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-chalk/50">{c.briefSummaryWhere}</p>
                    <p className="mt-2 text-[16px] font-medium text-chalk">
                      {form.where === 'milan' ? c.briefMilan : c.briefYourLocation}
                    </p>
                  </div>

                  {form.extras.length > 0 && (
                    <div className="pt-6 border-t border-chalk/20">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-chalk/50">{c.briefSummaryExtras}</p>
                      <ul className="mt-2 space-y-1">
                        {form.extras.map((extra) => {
                          const ext = extras.find((e) => e.id === extra);
                          return ext ? <li key={extra} className="text-[14px] text-chalk">• {ext.label}</li> : null;
                        })}
                      </ul>
                    </div>
                  )}
                </div>

                <button
                  form="contact-form"
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-accent px-7 text-[15px] font-semibold text-ink transition-transform duration-150 ease-smooth hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70">
                  {status === 'sending' ? (
                    <>
                      <Loader2Icon size={16} className="animate-spin" aria-hidden />
                      {c.sending}
                    </>
                  ) : (
                    c.briefSubmitCta
                  )}
                </button>

                <p className="mt-4 text-[12px] text-chalk/60 text-center">{c.briefResponseTime}</p>
                <FormPrivacyNotice className="mt-2 text-center text-[12px] text-chalk/60" linkClassName="hover:text-chalk" />
              </div>

              {/* DIRECT CONTACT DETAILS BLOCK */}
              <div className="rounded-[20px] border border-[#ecebe6] bg-chalk p-6 sm:p-8">
                <div className="mb-6">
                  <img
                    src="/meocy-logo-wide.png"
                    width={1326}
                    height={320}
                    alt="MEOCY"
                    className="h-[22px] w-auto mb-3"
                  />
                  <div className="h-0.5 w-8 bg-accent rounded-full" />
                </div>

                <h3 className="text-[14px] font-semibold uppercase tracking-[0.12em] text-[#0b0b0c] mb-6">
                  Direct Contact
                </h3>

                <div className="space-y-4">
                  {/* Phone / WhatsApp */}
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate2 mb-2">
                      Phone / WhatsApp
                    </p>
                    <a
                      href={studioContact.whatsappHref}
                      className="-my-1.5 inline-flex items-center gap-2 py-1.5 text-[17px] font-medium text-ink hover:text-accent transition-colors"
                    >
                      {studioContact.phone}
                    </a>
                  </div>

                  {/* Email */}
                  <div className="pt-2 border-t border-ink/10">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate2 mb-2">
                      Email
                    </p>
                    <a
                      href={`mailto:${studioContact.email}`}
                      className="-my-1.5 inline-block py-1.5 text-[14px] text-ink hover:text-accent transition-colors"
                    >
                      {studioContact.email}
                    </a>
                  </div>

                  {/* Location */}
                  <div className="pt-2 border-t border-ink/10">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate2 mb-2">
                      Location
                    </p>
                    <p className="text-[14px] text-ink">Milan, Italy</p>
                  </div>

                  {/* Website */}
                  <div className="pt-2 border-t border-ink/10">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate2 mb-2">
                      Website
                    </p>
                    <a
                      href="https://meocy.com"
                      className="-my-1.5 inline-block py-1.5 text-[14px] text-ink hover:text-accent transition-colors"
                    >
                      meocy.com
                    </a>
                  </div>
                </div>

                {/* Social icons */}
                <div className="mt-6 pt-4 border-t border-ink/10">
                  <div className="flex gap-2">
                    <a
                      href={studioContact.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-9 h-9 rounded-full bg-paper border border-ink/10 hover:border-accent hover:bg-accent/10 transition-all"
                      title="WhatsApp"
                    >
                      <Image src="/ic-whatsapp.png" alt="WhatsApp" width={18} height={18} className="object-contain" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Secondary routing: collaborations and crew have their own forms */}
      <aside className="bg-paper pb-16 sm:pb-20">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="border-t border-ink/10 pt-6 text-[14px] leading-relaxed text-slate2">
            <p className="font-medium text-ink">{c.routeTitle}</p>
            <ul className="mt-2 space-y-1.5">
              <li>
                {c.routeModels}{' '}
                <a href="/collaborate" className="font-medium text-ink underline underline-offset-4 hover:text-ink/70">
                  {c.routeModelsCta}
                </a>
              </li>
              <li>
                {c.routeCrew}{' '}
                <a href="/work-with-meocy" className="font-medium text-ink underline underline-offset-4 hover:text-ink/70">
                  {c.routeCrewCta}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}
