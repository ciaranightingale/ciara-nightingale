"use client";

import { Fragment } from "react";
import { HERO } from "@/lib/content";
import { useLondonClock } from "@/lib/hooks";

export default function Hero() {
  const time = useLondonClock();

  return (
    <header className="layer hero">
      <div>
        <h1 className="masthead">
          {HERO.name.map((line, i) => (
            <Fragment key={line}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </h1>
        <div className="ledeRow">
          <p className="lede">{HERO.lede}</p>
        </div>
      </div>

      <div className="heroFoot">
        <span>{HERO.explore}</span>
        <span>{time}</span>
      </div>
    </header>
  );
}
