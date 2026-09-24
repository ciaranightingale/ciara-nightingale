export const EDITION_ORDER = ["morning", "evening", "night"] as const;

export type Edition = (typeof EDITION_ORDER)[number];

/**
 * Six sky stops per edition. Each stop is [top-of-page, mid-scroll, end-of-page, gradient stop %].
 * The live gradient is mixed from scroll progress — see `mixSky`.
 */
type SkyStop = [string, string, string, number];

export const SKY: Record<Edition, SkyStop[]> = {
  morning: [
    ["#79b0e6", "#f0b6d6", "#f2aecb", 0],
    ["#9cc0e8", "#f2a6ce", "#f59bc2", 16],
    ["#c3c4e4", "#f394c2", "#f68aae", 34],
    ["#e6c0d4", "#f286b6", "#f87f9a", 54],
    ["#efb6cd", "#ef78a8", "#f9787c", 72],
    ["#f4b0c6", "#eb6d99", "#f4705c", 88],
  ],
  evening: [
    ["#8fb6d8", "#f2b48e", "#f09a72", 0],
    ["#b3c0d8", "#f4a582", "#ee8b66", 16],
    ["#d2bcc9", "#f3937a", "#ec7d63", 34],
    ["#e8b6b4", "#f0806f", "#e96f5c", 54],
    ["#eeaca0", "#ec7466", "#e56455", 72],
    ["#f0a894", "#e96b5f", "#df5a4e", 88],
  ],
  night: [
    ["#26375f", "#2a2e56", "#241f3f", 0],
    ["#2e3f68", "#33325c", "#2a2445", 16],
    ["#3a4670", "#3d3763", "#31284b", 34],
    ["#4a4d78", "#4a3d6b", "#3a2d52", 54],
    ["#5a5480", "#573f6f", "#443157", 72],
    ["#6b5a86", "#5f4372", "#4c355c", 88],
  ],
};

const hex = (h: string): [number, number, number] => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];

/** Plain per-channel linear interpolation on RGB. */
const mix = (a: string, b: string, t: number) => {
  const A = hex(a);
  const B = hex(b);
  const c = A.map((v, i) => Math.round(v + (B[i] - v) * t));
  return `rgb(${c[0]} ${c[1]} ${c[2]})`;
};

/** Scroll fraction the opening colour holds for before the mid colour takes over. */
const HOLD = 0.22;

/**
 * `t` is scroll progress 0–1. The opening colour holds briefly, then the page
 * moves off the mid colour quickly — easing the second leg stops the middle of
 * the scroll from sitting in one flat tone for most of its length.
 */
export function mixSky(t: number, edition: Edition) {
  const c = Math.max(0, Math.min(1, t));
  const stops = SKY[edition].map((s) => {
    let colour;
    if (c < HOLD) {
      colour = mix(s[0], s[1], c / HOLD);
    } else {
      const u = (c - HOLD) / (1 - HOLD);
      colour = mix(s[1], s[2], Math.pow(u, 0.62));
    }
    return `${colour} ${s[3]}%`;
  });
  return `linear-gradient(180deg, ${stops.join(", ")})`;
}

export const EDITION_STORAGE_KEY = "cn-site-edition";
