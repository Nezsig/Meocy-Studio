'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  milanLocations,
  milanPackages,
  maxLocationsFor,
  type MilanLocationId,
  type MilanPackageId,
} from '../../lib/milan-shoot-config';
import { PhotoPlaceholder, fmt, formatPrice } from './parts';

interface Props {
  packageId: MilanPackageId;
  onPackageChange: (id: MilanPackageId) => void;
  selected: MilanLocationId[];
  onSelectedChange: (ids: MilanLocationId[]) => void;
  onContinue: () => void;
}

export function LocationSelector({ packageId, onPackageChange, selected, onSelectedChange, onContinue }: Props) {
  const { t, lang } = useLanguage();
  const m = t.milanShoot;
  const pkg = milanPackages.find((p) => p.id === packageId)!;
  // Location the visitor tried to add beyond what is included (waiting for an explicit "Add for €50").
  const [pending, setPending] = useState<MilanLocationId | null>(null);
  const [limitHit, setLimitHit] = useState(false);

  // When packageId prop changes (e.g., from deep link, parent state, or inter-component navigation),
  // validate that selected locations are still valid for the new package.
  // This prevents stale location state when switching between packages via different UI paths.
  useEffect(() => {
    const max = maxLocationsFor(packageId);
    if (selected.length > max) {
      onSelectedChange(selected.slice(0, max));
    }
    // Reset transient UI state that's only meaningful in the context of the old package.
    setPending(null);
    setLimitHit(false);
  }, [packageId, selected, onSelectedChange]);

  const extra = Math.max(0, selected.length - pkg.includedLocations);
  const extraTotal = extra * (pkg.extraLocationPrice ?? 0);

  const changePackage = (id: MilanPackageId) => {
    const next = milanPackages.find((p) => p.id === id)!;
    // Never keep more locations than the new package allows without extras.
    if (next.extraLocationPrice === null && selected.length > next.includedLocations) {
      onSelectedChange(selected.slice(0, next.includedLocations));
    }
    setPending(null);
    setLimitHit(false);
    onPackageChange(id);
  };

  const toggle = (id: MilanLocationId) => {
    setLimitHit(false);
    if (selected.includes(id)) {
      onSelectedChange(selected.filter((s) => s !== id));
      setPending(null);
      return;
    }
    if (selected.length < pkg.includedLocations) {
      onSelectedChange([...selected, id]);
      setPending(null);
      return;
    }
    // Over the included amount: never add silently.
    if (pkg.extraLocationPrice !== null) setPending(id);
    else {
      setPending(null);
      setLimitHit(true);
    }
  };

  const confirmExtra = () => {
    if (pending) onSelectedChange([...selected, pending]);
    setPending(null);
  };

  const showMessage = pending !== null || limitHit;

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-slate2">{m.selector.packageLabel}</p>
          <div role="radiogroup" aria-label={m.selector.packageLabel} className="mt-3 grid grid-cols-3 gap-1 rounded-[20px] bg-chalk p-1 ring-1 ring-mist sm:inline-grid sm:rounded-full">
            {milanPackages.map((p) => {
              const active = p.id === packageId;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => changePackage(p.id)}
                  className={`min-h-[44px] rounded-2xl px-2 py-2 text-[12px] font-semibold uppercase leading-tight tracking-[0.06em] transition-colors sm:rounded-full sm:px-5 sm:text-[12.5px] ${
                    active ? 'bg-ink text-chalk' : 'text-slate2 hover:text-ink'
                  }`}>
                  {m.packages[p.id].name}
                  <span className={`block text-[11px] font-medium normal-case tracking-normal ${active ? 'text-accent' : 'text-slate2'}`}>
                    {formatPrice(p.price, lang)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <p className="text-[14px] text-slate2" aria-live="polite">
          {packageId === 'signature' && extra > 0
            ? `${pkg.includedLocations} included + ${extra} additional`
            : fmt(m.selector.counter, { count: selected.length, included: pkg.includedLocations })}
          {extra > 0 && <span className="ml-2 font-medium text-ink">{fmt(m.selector.extraCount, { n: extra, total: extraTotal })}</span>}
        </p>
      </div>

      {packageId === 'memory' && <p className="mt-4 text-[13.5px] text-slate2">{m.selector.duomoNote}</p>}

      <div aria-live="polite" className="empty:hidden">
        {showMessage && (
          <div className="mt-5 flex flex-col gap-3 rounded-2xl bg-ink px-5 py-4 text-chalk sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[14.5px]">
              {fmt(m.selector.limitIncluded, { n: pkg.includedLocations })}
              {pending && <> {m.selector.limitAdd}</>}
            </p>
            {pending && (
              <div className="grid shrink-0 gap-2 min-[480px]:flex">
                <button
                  type="button"
                  onClick={confirmExtra}
                  className="min-h-[44px] whitespace-nowrap rounded-full bg-accent px-5 text-[13px] font-semibold text-ink">
                  {m.selector.addConfirm}
                </button>
                <button
                  type="button"
                  onClick={() => setPending(null)}
                  className="min-h-[44px] whitespace-nowrap rounded-full px-4 text-[13px] font-medium text-chalk/75 ring-1 ring-chalk/20 hover:text-chalk">
                  {m.selector.dismiss}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {milanLocations.map((loc) => {
          const isOn = selected.includes(loc.id);
          const text = m.locations[loc.id];
          return (
            <li key={loc.id}>
              <button
                type="button"
                aria-pressed={isOn}
                onClick={() => toggle(loc.id)}
                className={`group flex h-full w-full flex-row overflow-hidden rounded-2xl bg-chalk text-left ring-1 transition-shadow duration-200 sm:flex-col ${
                  isOn ? 'ring-2 ring-ink' : 'ring-mist hover:ring-ink/30'
                }`}>
                <div className="relative aspect-square w-28 shrink-0 sm:aspect-[4/3] sm:w-full">
                  {loc.image ? (
                    <Image
                      src={loc.image.src}
                      alt={text.name}
                      fill
                      sizes="(min-width: 1240px) 222px, (min-width: 1024px) calc((100vw - 128px) / 5), (min-width: 640px) calc((100vw - 80px) / 2), 112px"
                      className="object-cover"
                    />
                  ) : (
                    <PhotoPlaceholder id={`location-${loc.id}`} label={m.ph.label} description={text.name} className="h-full w-full !p-3" />
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 p-4">
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink">{text.name}</p>
                    <p className="mt-1.5 text-[13.5px] leading-snug text-slate2">{text.desc}</p>
                  </div>
                  <span
                    className={`inline-flex min-h-[36px] items-center gap-1.5 self-start rounded-full px-3.5 text-[12.5px] font-semibold ${
                      isOn ? 'bg-accent text-ink' : 'bg-paper text-ink ring-1 ring-mist'
                    }`}>
                    {isOn && <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />}
                    {isOn ? m.selector.selected : m.selector.select}
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-8">
        <button
          type="button"
          onClick={onContinue}
          className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-ink px-7 text-[13.5px] font-semibold uppercase tracking-[0.08em] text-chalk transition-transform duration-150 ease-smooth hover:-translate-y-0.5">
          {m.selector.continueCta}
        </button>
      </div>
    </div>
  );
}
