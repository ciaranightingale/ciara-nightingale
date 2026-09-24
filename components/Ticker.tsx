"use client";

import type { CSSProperties } from "react";
import { TICKER_FACTS, TICKER_LABEL } from "@/lib/content";
import { useDayOfMonth } from "@/lib/hooks";
import { doubled } from "@/lib/marquee";

/**
 * A single fact is far narrower than the band, so it is repeated to fill the
 * width before `doubled` mirrors it for the seamless -50% loop.
 */
const REPEATS = 3;

export default function Ticker() {
  const day = useDayOfMonth();
  // Guard the modulo so a shorter list still works if facts are ever removed.
  const fact = TICKER_FACTS[(day - 1) % TICKER_FACTS.length];
  const run = Array.from({ length: REPEATS }, () => fact);

  return (
    <div className="layer ticker" aria-hidden="true">
      <div className="marquee" style={{ "--dur": "64s" } as CSSProperties}>
        {doubled(run).map(({ key }) => (
          <span key={key} className="tickerItem">
            <span className="tickerLabel">{TICKER_LABEL}</span>
            <span className="tickerDot">·</span>
            <span className="tickerFact">{fact}</span>
            <span className="tickerDot">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
