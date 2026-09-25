'use client';
import React, { useMemo, useState } from 'react';
import { CalendarClockIcon, CheckIcon, SparklesIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { addOnIds, estimate, euro } from '../utils/estimate';
import type { AddOnId } from '../utils/estimate';
import type { ShootCategory } from '../types/site';

const categories: ShootCategory[] = ['product', 'restaurant', 'fashion', 'brand'];

export function Estimator() {
  const { t, lang } = useLanguage();
  const [category, setCategory] = useState<ShootCategory>('product');
  const [count, setCount] = useState(20);
  const [onLocation, setOnLocation] = useState(false);
  const [addOns, setAddOns] = useState<AddOnId[]>([]);

  const result = useMemo(
    () => estimate({ category, images: count, onLocation, addOns }),
    [category, count, onLocation, addOns]
  );

  const toggleAddOn = (id: AddOnId) =>
  setAddOns((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const lineLabel = (key: string): string => {
    if (key === 'studio') return t.estimator.lineStudio(t.estimator.categories[category]);
    if (key === 'images') return t.estimator.lineImages(count);
    if (key === 'location') return t.estimator.lineLocation;
    return t.estimator.addOns[key as AddOnId].label;
  };

  const delivery = result.express ?
  t.estimator.delivery48 :
  result.large ?
  t.estimator.delivery7 :
  t.estimator.delivery4;

  const recommendedName =
  t.packages.tiers[result.recommended as keyof typeof t.packages.tiers].name;

  return (
    <section
      id="estimator"
      className="scroll-mt-24 border-y border-mist bg-chalk py-24 sm:py-32">
      
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate2">
            {t.estimator.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] tracking-tighter-display">
            {t.estimator.title}
          </h2>
          <p className="mt-4 text-[16.5px] leading-relaxed text-slate2">{t.estimator.lead}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
          <div className="rounded-xl2 bg-paper p-6 sm:p-8">
            <fieldset>
              <legend className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-slate2">
                {t.estimator.categoryLegend}
              </legend>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {categories.map((c) => {
                  const isProduct = c === 'product';
                  return (
                  <button
                    key={c}
                    type="button"
                    disabled={!isProduct}
                    aria-pressed={category === c}
                    onClick={() => isProduct && setCategory(c)}
                    className={`rounded-xl px-3 py-3 text-[14px] font-medium transition-colors duration-150 ease-smooth ${
                    isProduct ? (
                      category === c ?
                      'bg-ink text-chalk ring-2 ring-accent' :
                      'bg-chalk text-slate2 ring-1 ring-ink/8 hover:text-ink'
                    ) : (
                      'bg-chalk text-slate2/40 ring-1 ring-ink/8 opacity-50 cursor-not-allowed'
                    )}`
                    }>
                    {t.estimator.categories[c]}
                  </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-9">
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor="image-count"
                  className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-slate2">

                  {t.estimator.countLabel}
                </label>
                <span className="font-display text-[1.9rem] leading-none tracking-tighter-display text-accent font-bold">
                  {count}
                </span>
              </div>
              <input
                id="image-count"
                type="range"
                min={0}
                max={80}
                step={5}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-mist" />
              
              <div className="mt-2 flex justify-between text-[12px] font-medium text-slate1">
                <span>{t.estimator.countMin}</span>
                <span>{t.estimator.countMax}</span>
              </div>
            </div>

            <div className="mt-9">
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-slate2">
                {t.estimator.whereLabel}
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {[
                { v: false, title: t.estimator.whereStudio, note: t.estimator.whereStudioNote },
                {
                  v: true,
                  title: t.estimator.whereLocation,
                  note: t.estimator.whereLocationNote
                }].
                map((o) =>
                <button
                  key={o.title}
                  type="button"
                  aria-pressed={onLocation === o.v}
                  onClick={() => setOnLocation(o.v)}
                  className={`rounded-xl bg-chalk p-4 text-left transition-shadow duration-150 ease-smooth ${
                  onLocation === o.v ? 'ring-2 ring-ink' : 'ring-1 ring-ink/8 hover:ring-ink/25'}`
                  }>
                  
                    <span className="block text-[14.5px] font-medium text-ink">{o.title}</span>
                    <span className="mt-0.5 block text-[12.5px] text-slate2">{o.note}</span>
                  </button>
                )}
              </div>
            </div>

            <fieldset className="mt-9">
              <legend className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-slate2">
                {t.estimator.addOnLegend}
              </legend>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {addOnIds.map((id) => {
                  const on = addOns.includes(id);
                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleAddOn(id)}
                      className={`flex items-start gap-3 rounded-xl bg-chalk p-4 text-left transition-shadow duration-150 ease-smooth ${
                      on ? 'ring-2 ring-ink' : 'ring-1 ring-ink/8 hover:ring-ink/25'}`
                      }>
                      
                      <span
                        className={`mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-md transition-colors duration-150 ease-smooth ${
                        on ? 'bg-ink text-chalk' : 'bg-paper text-transparent ring-1 ring-ink/12'}`
                        }>
                        
                        <CheckIcon size={13} strokeWidth={3} />
                      </span>
                      <span>
                        <span className="block text-[14.5px] font-medium text-ink">
                          {t.estimator.addOns[id].label}
                        </span>
                        <span className="mt-0.5 block text-[12.5px] text-slate2">
                          {t.estimator.addOns[id].description}
                        </span>
                      </span>
                    </button>);

                })}
              </div>
            </fieldset>
          </div>

          <aside className="rounded-xl2 bg-ink p-6 text-chalk shadow-lift sm:p-8 lg:sticky lg:top-24">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              {t.estimator.resultLabel}
            </p>
            <p className="mt-4 font-display text-[clamp(2.3rem,5vw,3.2rem)] leading-none tracking-tighter-display">
              {euro(result.total, lang)}
            </p>

            <ul className="mt-7 space-y-2.5">
              {result.lines.map((l) =>
              <li key={l.key} className="flex items-baseline justify-between gap-4 text-[14px]">
                  <span className="text-chalk/60">{lineLabel(l.key)}</span>
                  <span className="flex-none font-medium tabular-nums">{euro(l.amount, lang)}</span>
                </li>
              )}
            </ul>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-chalk/[0.07] p-4">
                <CalendarClockIcon size={16} className="text-accent" />
                <p className="mt-2 text-[15px] font-medium">{delivery}</p>
                <p className="text-[12.5px] text-chalk/50">{t.estimator.deliveryLabel}</p>
              </div>
              <div className="rounded-xl bg-chalk/[0.07] p-4">
                <SparklesIcon size={16} className="text-accent" />
                <p className="mt-2 text-[15px] font-medium">{recommendedName}</p>
                <p className="text-[12.5px] text-chalk/50">
                  {result.days === 1 ? t.estimator.oneDay : t.estimator.twoDays}
                </p>
              </div>
            </div>

            <a
              href="#booking"
              className="mt-6 block rounded-full bg-accent px-6 py-3.5 text-center text-[15px] font-semibold text-ink transition-transform duration-150 ease-smooth hover:-translate-y-0.5">
              
              {t.estimator.cta}
            </a>
          </aside>
        </div>
      </div>
    </section>);

}