import { PICKS, PICKS_HEAD } from "@/lib/content";
import type { Track } from "@/lib/spotify";

export default function Picks({ topTracks }: { topTracks?: Track[] | null }) {
  return (
    <section id="picks" className="layer picks">
      <div className="head">
        <h2 className="title">{PICKS_HEAD.title}</h2>
        <p className="note">{PICKS_HEAD.note}</p>
      </div>

      <div className="pickGrid">
        {PICKS.map((col) => {
          // Live tracks stand in for the written ones; if the fetch failed the
          // hand-written list shows instead, so the column is never empty.
          const items =
            col.source === "spotify" && topTracks?.length ? topTracks : col.items;

          return (
            <div key={col.label} className="pickCol">
              <div className="pickLabel">{col.label}</div>
              {items.map((item, i) => (
                <div key={i} className="pickItem">
                  <a
                    className="pickTitle"
                    // Spotify supplies real track URLs; everything else falls
                    // back to a search, so no entry needs a hand-found link.
                    href={
                      item.href ??
                      col.search + encodeURIComponent(`${item.title} ${item.by}`)
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.title}
                  </a>
                  <span className="pickBy">{item.by}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
