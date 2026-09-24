import type { CSSProperties } from "react";
import { BANDS, bandPuffs } from "@/lib/clouds";
import { mixSky, type Edition } from "@/lib/editions";

/**
 * The living sky: a fixed gradient re-mixed from scroll position, four bands of
 * drifting cloud over it, and the frosted paper sheet the content reads on.
 */
export default function Backdrop({ pct, edition }: { pct: number; edition: Edition }) {
  return (
    <>
      <div className="sky" style={{ background: mixSky(pct / 100, edition) }} />

      <div className="clouds">
        {BANDS.map((band, i) => (
          <div
            key={i}
            className="cloudBand"
            style={
              {
                top: band.top,
                height: band.height,
                opacity: band.opacity,
                filter: `blur(${band.blur}px)`,
                "--dur": `${band.duration}s`,
                "--dir": band.reverse ? "reverse" : "normal",
              } as CSSProperties
            }
          >
            {bandPuffs(band).map((puff, j) => (
              <div key={j} style={puff} />
            ))}
          </div>
        ))}
      </div>

      <div className="wash" />
    </>
  );
}
