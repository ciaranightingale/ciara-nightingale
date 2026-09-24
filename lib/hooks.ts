"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import * as editionStore from "./editionStore";

/**
 * Scroll progress as a whole percentage. Throttled with rAF and only committed
 * when the integer changes, so the sky re-mixes at most once per percent.
 */
export function useScrollProgress() {
  const [pct, setPct] = useState(0);
  const frame = useRef<number | null>(null);
  const current = useRef(0);

  useEffect(() => {
    const read = () => {
      frame.current = null;
      const doc = document.documentElement;
      const y = window.scrollY || doc.scrollTop || 0;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const next = Math.max(0, Math.min(100, Math.round((y / max) * 100)));
      if (next !== current.current) {
        current.current = next;
        setPct(next);
      }
    };
    const onScroll = () => {
      if (frame.current !== null) return;
      frame.current = requestAnimationFrame(read);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    read();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  return pct;
}

/** London time as `HH:MM london`, refreshed every 30 seconds. */
export function useLondonClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      try {
        const t = new Date().toLocaleTimeString("en-GB", {
          timeZone: "Europe/London",
          hour: "2-digit",
          minute: "2-digit",
        });
        setTime(`${t} london`);
      } catch {
        setTime("london");
      }
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return time;
}

/**
 * Day of the London month, 1–31. The page is statically prerendered, so the
 * date has to be read on the client — computed at module scope it would freeze
 * at whatever day the site was last built. Returns 1 until mount so the server
 * and first client render agree.
 */
export function useDayOfMonth() {
  const [day, setDay] = useState(1);

  useEffect(() => {
    const read = () => {
      try {
        // `en-CA` gives YYYY-MM-DD, so the day is the last field whatever the
        // visitor's own locale would have done to the order.
        const parts = new Date()
          .toLocaleDateString("en-CA", { timeZone: "Europe/London" })
          .split("-");
        setDay(Number(parts[2]) || 1);
      } catch {
        setDay(1);
      }
    };
    read();
    // A tab left open overnight should roll over rather than stay on yesterday.
    const id = setInterval(read, 600000);
    return () => clearInterval(id);
  }, []);

  return day;
}

/**
 * The palette rides on custom properties set on documentElement, so switching
 * editions repaints the page without re-rendering the markup.
 */
export function useEdition() {
  const edition = useSyncExternalStore(
    editionStore.subscribe,
    editionStore.getSnapshot,
    editionStore.getServerSnapshot,
  );

  return [edition, editionStore.setEdition] as const;
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}
