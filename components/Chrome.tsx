import { CHROME, EDITION_META } from "@/lib/content";
import { EDITION_ORDER, type Edition } from "@/lib/editions";

/**
 * Fixed page chrome. It crosses both backdrops, so its ink is scroll-aware:
 * hero ink over open sky, body ink once the paper wash is behind it.
 */
export default function Chrome({
  pct,
  edition,
  onEdition,
}: {
  pct: number;
  edition: Edition;
  onEdition: (e: Edition) => void;
}) {
  return (
    <div className="chrome" data-on-sky={pct < 8}>
      <div className="chromeId">
        <span className="chromeName">{CHROME.name}</span>
        <span className="chromeSub">{CHROME.location}</span>
      </div>

      <nav className="chromeNav">
        {CHROME.nav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="chromeRight">
        <div className="stamp">
          {EDITION_ORDER.map((k) => (
            <button
              key={k}
              type="button"
              title={EDITION_META[k].title}
              aria-pressed={k === edition}
              onClick={() => onEdition(k)}
            >
              {EDITION_META[k].label}
            </button>
          ))}
        </div>
        <span>{String(pct).padStart(2, "0")}%</span>
      </div>
    </div>
  );
}
