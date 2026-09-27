'use client';
import React, { useMemo, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { estimate, euro } from '../utils/estimate';
import type { VideoType } from '../utils/estimate';
import type { ShootCategory } from '../types/site';

const categories: ShootCategory[] = ['product', 'food', 'fashion', 'brand'];
const videoTypes: VideoType[] = ['basic', 'voiceover', 'social', 'pack', 'commercial'];

export function Estimator() {
  const { t, lang } = useLanguage();
  const [category, setCategory] = useState<ShootCategory>('product');
  const [videoType, setVideoType] = useState<VideoType>('basic');
  const [quantity, setQuantity] = useState(1);

  const result = useMemo(
    () => estimate({ category, videoType, quantity }),
    [category, videoType, quantity]
  );

  const cfg = t.estimator.videoTypes[videoType];
  const unitLabel = quantity === 1 ? cfg.unit : cfg.unit + 's';

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
            {/* Categories */}
            <fieldset>
              <legend className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-slate2">
                {t.estimator.categoryLabel}
              </legend>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={category === c}
                    onClick={() => setCategory(c)}
                    className={`rounded-xl px-3 py-3 text-[14px] font-medium transition-colors duration-150 ease-smooth ${
                      category === c
                        ? 'bg-ink text-chalk ring-2 ring-accent'
                        : 'bg-chalk text-slate2 ring-1 ring-ink/8 hover:text-ink'
                    }`}>
                    {t.estimator.categories[c]}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Video Type Selection */}
            <fieldset className="mt-9">
              <legend className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-slate2">
                {t.estimator.videoTypeLegend}
              </legend>
              <div className="mt-4 space-y-2">
                {videoTypes.map((vt) => {
                  const vtCfg = t.estimator.videoTypes[vt];
                  const isPack = vt === 'pack';
                  const isSelected = videoType === vt;
                  return (
                    <label
                      key={vt}
                      className={`flex items-start gap-3 rounded-xl p-4 cursor-pointer transition-colors duration-150 ease-smooth ${
                        isSelected
                          ? 'bg-ink text-chalk ring-2 ring-accent'
                          : 'bg-chalk text-ink ring-1 ring-ink/8 hover:ring-ink/25'
                      }`}>
                      <input
                        type="radio"
                        name="videoType"
                        value={vt}
                        checked={isSelected}
                        onChange={() => setVideoType(vt)}
                        className="mt-0.5 h-4 w-4 flex-none cursor-pointer"
                      />
                      <span className="flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="block text-[14.5px] font-medium">
                            {vtCfg.name}
                          </span>
                          <span className={`text-[13px] font-semibold ${isSelected ? 'text-accent' : 'text-accent'}`}>
                            {euro(vtCfg.price, lang)}/{vtCfg.unit}
                          </span>
                        </div>
                        <span className={`mt-0.5 block text-[12.5px] ${isSelected ? 'text-chalk/70' : 'text-slate2'}`}>
                          {vtCfg.description}
                        </span>
                        {isPack && (
                          <span className="mt-2 inline-flex items-center gap-1.5 text-[11px]">
                            <span className={`line-through ${isSelected ? 'text-chalk/40' : 'text-slate2'}`}>
                              {euro(1000, lang)}
                            </span>
                            <span className="text-accent font-bold">{euro(500, lang)}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                              isSelected ? 'bg-accent text-ink' : 'bg-accent text-ink'
                            }`}>
                              {vtCfg.discount}
                            </span>
                          </span>
                        )}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* Quantity Slider */}
            <div className="mt-9">
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor="quantity"
                  className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-slate2">
                  {t.estimator.countLabel}
                </label>
                <span className="font-display text-[1.9rem] leading-none tracking-tighter-display text-accent font-bold">
                  {quantity}
                </span>
              </div>
              <input
                id="quantity"
                type="range"
                min={0}
                max={8}
                step={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-mist"
              />
              <div className="mt-2 flex justify-between text-[12px] font-medium text-slate1">
                <span>{t.estimator.countMin}</span>
                <span>{t.estimator.countMax}</span>
              </div>
            </div>
          </div>

          {/* Estimate Panel */}
          <aside className="rounded-xl2 bg-ink p-6 text-chalk shadow-lift sm:p-8 lg:sticky lg:top-24">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              {t.estimator.resultLabel}
            </p>
            <p className="mt-4 font-display text-[clamp(2.3rem,5vw,3.2rem)] leading-none tracking-tighter-display">
              {euro(result.total, lang)}
            </p>

            <ul className="mt-7 space-y-2.5">
              <li className="flex items-baseline justify-between gap-4 text-[14px]">
                <span className="text-chalk/60">{result.videoType === 'pack' ? 'Video packs' : 'Videos'}</span>
                <span className="flex-none font-medium tabular-nums text-accent">
                  {quantity} {unitLabel}
                </span>
              </li>
              {result.showPhotos && (
                <li className="flex items-baseline justify-between gap-4 text-[14px]">
                  <span className="text-accent font-medium">
                    {result.photos} {t.estimator.linePhotos}
                  </span>
                </li>
              )}
            </ul>

            {result.noteLabel && (
              <div className="mt-7 pt-7 border-t border-chalk/10">
                <p className="text-[12.5px] text-chalk/50">{result.noteLabel}</p>
              </div>
            )}

            <div className={result.noteLabel ? "mt-4" : "mt-7 pt-7 border-t border-chalk/10"}>
              <p className="text-[12.5px] text-chalk/50">{t.estimator.caption}</p>
            </div>

            <a
              href="#booking"
              className="mt-6 block rounded-full bg-accent px-6 py-3.5 text-center text-[15px] font-semibold text-ink transition-transform duration-150 ease-smooth hover:-translate-y-0.5">
              {t.estimator.cta}
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}