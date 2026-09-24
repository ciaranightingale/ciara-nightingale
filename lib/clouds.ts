import type { CSSProperties } from "react";

/**
 * One cloud = a row of overlapping round lobes drawn in three passes: the shelf
 * underside, the crowns, then the sunlit highlights. Every lobe is a plain
 * `border-radius: 50%` div with a solid background colour so it stays round.
 *
 * `x` is a % across the doubled strip, `t` a px top offset, sizes in px.
 */
const SHELF = [
  { x: 2.0, w: 300, h: 150, t: 124 },
  { x: 7.4, w: 340, h: 158, t: 118 },
  { x: 13.0, w: 300, h: 146, t: 126 },
];

const CROWNS = [
  { x: 1.6, d: 150, t: 92 },
  { x: 4.4, d: 214, t: 44 },
  { x: 8.2, d: 268, t: 8 },
  { x: 12.6, d: 206, t: 46 },
  { x: 16.2, d: 148, t: 94 },
  { x: 9.6, d: 182, t: 74 },
  { x: 6.2, d: 160, t: 86 },
];

/** Sun catches the upper-left of each crown. */
const HIGHLIGHTS = [
  { x: 5.0, d: 128, t: 42 },
  { x: 8.6, d: 168, t: 12 },
  { x: 12.8, d: 122, t: 44 },
  { x: 9.9, d: 108, t: 62 },
];

export const BANDS = [
  { top: "4%", height: "360px", opacity: 0.62, blur: 22, duration: 96, reverse: false, scale: 1.05, shift: 0 },
  { top: "19%", height: "320px", opacity: 0.58, blur: 24, duration: 138, reverse: true, scale: 0.9, shift: 17 },
  { top: "35%", height: "380px", opacity: 0.55, blur: 26, duration: 112, reverse: false, scale: 1.16, shift: 8 },
  { top: "52%", height: "330px", opacity: 0.5, blur: 24, duration: 158, reverse: true, scale: 0.96, shift: 24 },
];

type Lobe = { x: number; t: number; d?: number; w?: number; h?: number };

function puff(p: Lobe, colour: string, offset: number, scale: number): CSSProperties {
  return {
    position: "absolute",
    left: `${p.x + offset}%`,
    top: `${Math.round(p.t * scale)}px`,
    width: `${Math.round((p.w ?? p.d ?? 0) * scale)}px`,
    height: `${Math.round((p.h ?? p.d ?? 0) * scale)}px`,
    borderRadius: "50%",
    backgroundColor: colour,
  };
}

/**
 * Two identical copies of the cloud per band — at `x` and `x + 50` across the
 * 200%-wide strip — so the marquee drift never runs out.
 */
export function bandPuffs(band: (typeof BANDS)[number]): CSSProperties[] {
  const out: CSSProperties[] = [];
  for (const offset of [0, 50]) {
    const off = offset + band.shift;
    for (const p of SHELF) out.push(puff(p, "var(--cloudUnder)", off, band.scale));
    for (const p of CROWNS) out.push(puff(p, "var(--cloudCore)", off, band.scale));
    for (const p of HIGHLIGHTS) out.push(puff(p, "var(--cloudLit)", off, band.scale * 0.9));
  }
  return out;
}
