"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Frame from "./Frame";
import { TINTS, WORK, WORK_HEAD } from "@/lib/content";
import { usePrefersReducedMotion } from "@/lib/hooks";

export default function Work() {
  const [hover, setHover] = useState(-1);
  const previewRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  // The cursor position is deliberately not state — the transform is written
  // straight to the node so a mousemove never triggers a render.
  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (e: MouseEvent) => {
      const el = previewRef.current;
      if (el) {
        el.style.transform = `translate3d(${e.clientX + 26}px,${e.clientY - 150}px,0)`;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reducedMotion]);

  return (
    <>
      {!reducedMotion && (
        <div className="preview" ref={previewRef} aria-hidden="true">
          {WORK.map((row, i) => (
            <div
              key={row.no}
              className="previewCard"
              data-shown={hover === i}
            >
              <Frame
                className="previewFrame"
                tint={TINTS[i % TINTS.length]}
                src={row.src}
                hint={row.hint}
              />
            </div>
          ))}
        </div>
      )}

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
    </>
  );
}
