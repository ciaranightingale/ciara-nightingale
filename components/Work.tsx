"use client";

import { Fragment, useState } from "react";
import { WORK, WORK_HEAD } from "@/lib/content";

export default function Work() {
  // Hovering a row dims the others, so the list reads one line at a time.
  const [hover, setHover] = useState(-1);

  return (
    <section id="work" className="layer work">
      <div className="head">
        <h2 className="title">
          {WORK_HEAD.title.map((line, i) => (
            <Fragment key={line}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </h2>
        <p className="note">{WORK_HEAD.note}</p>
      </div>

      {WORK.map((row, i) => (
        <a
          key={row.no}
          href={row.href}
          target="_blank"
          rel="noreferrer"
          className="workRow"
          data-hovered={hover === i}
          data-dimmed={hover !== -1 && hover !== i}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(-1)}
          onFocus={() => setHover(i)}
          onBlur={() => setHover(-1)}
        >
          <span className="workNo">{row.no}</span>
          <span className="workTitle">{row.title}</span>
          <span className="workKind">{row.kind}</span>
          <span className="workYear">{row.year}</span>
        </a>
      ))}
    </section>
  );
}
