'use client';
import React, { useRef, useState } from 'react';
import { CheckCircle2Icon, Loader2Icon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { locales } from '../data/locales';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type ContentType = 'photography' | 'video' | 'both';
type FieldErrors = Partial<Record<'name' | 'email' | 'projectType' | 'message', string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Index of "Model / creative collaboration" in contactPage.projectOptions.
const COLLAB_OPTION = 7;

const emptyForm = {
  name: '',
  email: '',
  brand: '',
  projectIndex: '',
  preferredDate: '',
  location: '',
  quantity: '',
  contentType: 'both' as ContentType,
  message: '',
  company_website: '',
};

const fieldClass =
  'mt-1.5 block min-h-[48px] w-full min-w-0 rounded-xl bg-paper px-4 py-3 text-[16px] ring-1 ring-ink/10 outline-none transition-shadow duration-150 ease-smooth focus:ring-2 focus:ring-ink aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-500';
const labelClass = 'block text-[13.5px] font-medium text-ink';
const externalLink = { target: '_blank', rel: 'noopener noreferrer' } as const;

export function ContactPage() {
  const { t, lang } = useLanguage();
  // Fall back to English for any missing translation.
  const c = { ...locales.en.contactPage, ...(t?.contactPage ?? {}) };
  const options = c.projectOptions?.length === locales.en.contactPage.projectOptions.length
    ? c.projectOptions
    : locales.en.contactPage.projectOptions;

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [sentTo, setSentTo] = useState({ name: '', email: '' });
  const formRef = useRef<HTMLFormElement>(null);
  const projectRef = useRef<HTMLSelectElement>(null);

  const set = <K extends keyof typeof emptyForm>(key: K, value: (typeof emptyForm)[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    const errKey = (key === 'projectIndex' ? 'projectType' : key) as keyof FieldErrors;
    if (errors[errKey]) setErrors((e) => ({ ...e, [errKey]: undefined }));
    if (status === 'error') setStatus('idle');
  };

  const validate = (): FieldErrors => {
    const e: FieldErrors = {};
    const name = form.name.trim();
    if (name.length < 2 || name.length > 100) e.name = c.errName;
    if (!EMAIL_RE.test(form.email.trim())) e.email = c.errEmail;
    if (form.projectIndex === '') e.projectType = c.errProject;
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
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          brand: form.brand,
          projectType: locales.en.contactPage.projectOptions[idx],
          projectTypeLabel: options[idx],
          preferredDate: form.preferredDate,
          where: form.location,
          quantity: form.quantity,
          contentType: form.contentType,
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

  const startCollab = () => {
    if (status === 'sent') reset();
    setForm((f) => ({ ...f, projectIndex: String(COLLAB_OPTION) }));
    setErrors((e) => ({ ...e, projectType: undefined }));
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => projectRef.current?.focus({ preventScroll: true }), 400);
  };

  const errorId = (k: keyof FieldErrors) => (errors[k] ? `ct-${k}-error` : undefined);
  // Always-mounted live region so screen readers announce errors as they appear.
  const fieldError = (k: keyof FieldErrors) => (
    <p id={`ct-${k}-error`} aria-live="polite" className="mt-1.5 text-[13px] text-red-600 empty:hidden">
      {errors[k] ?? ''}
    </p>
  );

  const contentOptions: { value: ContentType; label: string }[] = [
    { value: 'photography', label: c.photo },
    { value: 'video', label: c.video },
    { value: 'both', label: c.both },
  ];

  const successBody = (c.successBody || '')
    .replace('{name}', sentTo.name)
    .replace('{email}', sentTo.email);

  return (
    <>
      <main className="py-24 sm:py-32">
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

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start lg:gap-10">
            <div id="contact-form" className="scroll-mt-24 rounded-[20px] border border-[#ecebe6] bg-chalk p-6 sm:p-8">
              {status === 'sent' ? (
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
              ) : (
                <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="ct-name" className={labelClass}>
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
                      <label htmlFor="ct-email" className={labelClass}>
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

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="ct-brand" className={labelClass}>
                        {c.brand}
                      </label>
                      <input
                        id="ct-brand"
                        name="brand"
                        autoComplete="organization"
                        maxLength={200}
                        value={form.brand}
                        onChange={(e) => set('brand', e.target.value)}
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="ct-projectType" className={labelClass}>
                        {c.projectType} <span aria-hidden className="text-slate2">*</span>
                      </label>
                      <select
                        id="ct-projectType"
                        ref={projectRef}
                        name="projectType"
                        required
                        value={form.projectIndex}
                        onChange={(e) => set('projectIndex', e.target.value)}
                        aria-invalid={!!errors.projectType}
                        aria-describedby={errorId('projectType')}
                        className={`${fieldClass} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='12'%20height='8'%20fill='none'%3E%3Cpath%20d='M1%201.5l5%205%205-5'%20stroke='%230b0b0c'%20stroke-width='1.6'/%3E%3C/svg%3E")] bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat pr-10`}>
                        <option value="" disabled>
                          {c.select}
                        </option>
                        {options.map((opt, i) => (
                          <option key={i} value={String(i)}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {fieldError('projectType')}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="ct-date" className={labelClass}>
                        {c.preferredDate}
                      </label>
                      <input
                        id="ct-date"
                        name="preferredDate"
                        type="date"
                        autoComplete="off"
                        min={new Date().toISOString().slice(0, 10)}
                        value={form.preferredDate}
                        onChange={(e) => set('preferredDate', e.target.value)}
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="ct-location" className={labelClass}>
                        {c.location}
                      </label>
                      <input
                        id="ct-location"
                        name="location"
                        autoComplete="address-level2"
                        maxLength={200}
                        value={form.location}
                        onChange={(e) => set('location', e.target.value)}
                        className={fieldClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="ct-quantity" className={labelClass}>
                      {c.quantity}
                    </label>
                    <input
                      id="ct-quantity"
                      name="quantity"
                      autoComplete="off"
                      maxLength={200}
                      value={form.quantity}
                      onChange={(e) => set('quantity', e.target.value)}
                      className={fieldClass}
                    />
                  </div>

                  <fieldset>
                    <legend className={labelClass}>{c.contentType}</legend>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {contentOptions.map((opt) => (
                        <label key={opt.value} className="relative">
                          <input
                            type="radio"
                            name="contentType"
                            value={opt.value}
                            checked={form.contentType === opt.value}
                            onChange={() => set('contentType', opt.value)}
                            className="peer sr-only"
                          />
                          <span className="inline-flex min-h-[44px] cursor-pointer items-center rounded-full px-5 text-[14.5px] font-medium ring-1 ring-ink/10 transition-colors peer-checked:bg-accent peer-checked:ring-accent peer-focus-visible:ring-2 peer-focus-visible:ring-ink bg-paper text-ink">
                            {opt.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div>
                    <label htmlFor="ct-message" className={labelClass}>
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

                  {/* Honeypot: hidden from people and assistive tech; bots that fill it are silently ignored. */}
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
                    className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-accent px-7 text-[15px] font-semibold text-ink transition-transform duration-150 ease-smooth hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70 sm:w-auto">
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

            <aside className="rounded-[20px] border border-[#ecebe6] bg-chalk p-6 sm:p-8">
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate2">{c.detailsTitle}</h2>
              <div className="mt-6">
                <p className="flex items-baseline gap-1.5 text-[26px] font-semibold leading-none tracking-tight text-ink">
                  MEOCY
                  <span className="text-[11px] font-semibold tracking-[0.2em] text-slate2">STUDIO</span>
                </p>
                <div className="mt-3 h-1 w-11 rounded-full bg-accent" />
                <p className="mt-4 text-[14px] text-[#6b6a66]">Photography &amp; Video Studio</p>
                <p className="text-[14px] text-[#6b6a66]">{c.loc}</p>
              </div>

              <div className="mt-6 space-y-1">
                {[
                  { label: 'T', value: '+39 379 105 1000', href: 'https://wa.me/393791051000', external: true },
                  { label: 'M', value: '+39 380 498 1718', href: 'tel:+393804981718', external: false },
                  { label: 'E', value: 'hello@meocy.com', href: 'mailto:hello@meocy.com', external: false },
                  { label: 'IG', value: '@chamila.it', href: 'https://instagram.com/chamila.it', external: true },
                  { label: 'IG', value: '@chami.eu', href: 'https://instagram.com/chami.eu', external: true },
                ].map((r) => (
                  <a
                    key={r.value}
                    href={r.href}
                    {...(r.external ? externalLink : {})}
                    className="flex min-h-[40px] items-center gap-3 text-[14.5px] text-[#0b0b0c] transition-colors hover:text-slate2">
                    <span className="w-6 shrink-0 font-medium text-[#9a998f]">{r.label}</span>
                    <span className="min-w-0 break-words">{r.value}</span>
                  </a>
                ))}
              </div>

              <a
                href="https://wa.me/393791051000"
                {...externalLink}
                className="mt-7 inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-accent px-6 text-center text-[15px] font-semibold text-ink transition-transform duration-150 ease-smooth hover:-translate-y-0.5">
                {c.whatsappCta}
              </a>
            </aside>
          </div>
        </div>
      </main>

      <section className="bg-ink py-20 text-chalk sm:py-28">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-chalk/60">
              <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
              {c.collabLabel}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.04] tracking-tighter-display">
              {c.collabTitle}
            </h2>
            <p className="mt-6 text-[17px] leading-relaxed text-chalk/70">{c.collabText1}</p>
            <p className="mt-3 text-[17px] leading-relaxed text-chalk/70">{c.collabText2}</p>
            <button
              type="button"
              onClick={startCollab}
              className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-full bg-accent px-7 text-[15px] font-semibold text-ink transition-transform duration-150 ease-smooth hover:-translate-y-0.5">
              {c.collabButton}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
