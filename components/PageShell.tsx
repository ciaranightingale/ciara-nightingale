"use client";

import { useEffect } from "react";

import Backdrop from "@/components/Backdrop";
import Chrome from "@/components/Chrome";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
// import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Picks from "@/components/Picks";
import Ticker from "@/components/Ticker";
import Work from "@/components/Work";
import { skyEdge } from "@/lib/editions";
import { useEdition, useScrollProgress } from "@/lib/hooks";
import type { Track } from "@/lib/spotify";

/**
 * Everything scroll- and edition-aware lives below this boundary. The page
 * itself stays a server component so it can fetch on render; the data it
 * gathers arrives here as props.
 */
export default function PageShell({ topTracks }: { topTracks: Track[] | null }) {
  const pct = useScrollProgress();
  const [edition, setEdition] = useEdition();

  // The sky is fixed to the viewport, so a phone's rubber-band scroll reveals
  // the canvas behind it. Keeping the canvas on the sky means that gutter reads
  // as more sky rather than a flat colour from the other end of the day.
  useEffect(() => {
    document.documentElement.style.backgroundColor = skyEdge(pct / 100, edition);
  }, [pct, edition]);

  return (
    <div className="page">
      <Backdrop pct={pct} edition={edition} />
      <Chrome pct={pct} edition={edition} onEdition={setEdition} />

      <Hero />
      <Ticker />
      <Work />
      <Experience />
      {/* Waiting on artwork photos — restore with the import above. */}
      {/* <Gallery /> */}
      <Picks topTracks={topTracks} />
      <Contact />
    </div>
  );
}
