'use client';
import { useId } from 'react';

/**
 * Line-art illustration of the Eiffel Tower (a drawing, not a photograph) used as the Paris page's
 * visual identity: lattice silhouette, platforms, and the tower's night beacon in the MEOCY lime.
 */
export function EiffelTowerArt({ className = '', beams = true }: { className?: string; beams?: boolean }) {
  const uid = useId().replace(/:/g, '');
  const lattice = `lattice-${uid}`;
  const glow = `glow-${uid}`;
  const beamL = `beamL-${uid}`;
  const beamR = `beamR-${uid}`;
  const fade = `fade-${uid}`;

  // Silhouette (viewBox 400 × 1000). The arch between the legs and the gap under the 2nd floor are holes (even-odd).
  const outline =
    'M20 1000 C45 930 60 870 70 827 L55 827 L55 812 L85 812 C105 750 125 700 138 665 L125 665 L125 650 L142 650 ' +
    'C165 480 180 320 190 180 L185 180 L185 164 L194 164 L194 120 L197 90 L199 30 L200 0 L201 30 L203 90 L206 120 ' +
    'L206 164 L215 164 L215 180 L210 180 C220 320 235 480 258 650 L275 650 L275 665 L262 665 C275 700 295 750 315 812 ' +
    'L345 812 L345 827 L330 827 C340 870 355 930 380 1000 L290 1000 C285 945 245 900 200 900 C155 900 115 945 110 1000 Z ' +
    'M150 812 C165 760 178 710 186 665 L214 665 C222 710 235 760 250 812 Z';

  return (
    <svg viewBox="-200 -40 800 1060" className={className} aria-hidden="true" focusable="false">
      <defs>
        <pattern id={lattice} width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M0 0L10 10M10 0L0 10" stroke="#ffffff" strokeOpacity="0.42" strokeWidth="0.9" />
        </pattern>
        <radialGradient id={glow}>
          <stop offset="0" stopColor="#c8f169" stopOpacity="0.95" />
          <stop offset="0.35" stopColor="#c8f169" stopOpacity="0.35" />
          <stop offset="1" stopColor="#c8f169" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={beamL} x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#c8f169" stopOpacity="0.28" />
          <stop offset="1" stopColor="#c8f169" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={beamR} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c8f169" stopOpacity="0.28" />
          <stop offset="1" stopColor="#c8f169" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={fade} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.75" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      {beams && (
        <g>
          <path d="M200 26 L-200 -10 L-200 70 Z" fill={`url(#${beamL})`} />
          <path d="M200 26 L600 50 L600 130 Z" fill={`url(#${beamR})`} />
        </g>
      )}

      {/* Lattice body + outline */}
      <path d={outline} fillRule="evenodd" fill={`url(#${lattice})`} />
      <path d={outline} fillRule="evenodd" fill="none" stroke={`url(#${fade})`} strokeOpacity="0.95" strokeWidth="3" strokeLinejoin="round" />

      {/* Platforms and structural lines */}
      <g fill="#ffffff" fillOpacity="0.9">
        <rect x="55" y="812" width="290" height="15" />
        <rect x="125" y="650" width="150" height="15" />
        <rect x="185" y="164" width="30" height="16" />
      </g>
      <g stroke="#ffffff" strokeOpacity="0.6" strokeWidth="1.6" fill="none">
        <path d="M200 900 L200 827" />
        <path d="M70 827 C120 840 280 840 330 827" />
        <path d="M110 1000 L150 827 M290 1000 L250 827" />
        <path d="M138 665 L200 812 L262 665" />
        <path d="M160 520 L240 520 M172 400 L228 400 M181 290 L219 290" />
      </g>

      {/* Ground line (Trocadéro side) */}
      <path d="M-200 1000 L600 1000" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1.5" />

      {/* Beacon */}
      <circle cx="200" cy="26" r="48" fill={`url(#${glow})`} />
      <circle cx="200" cy="26" r="4.5" fill="#c8f169" />
    </svg>
  );
}
