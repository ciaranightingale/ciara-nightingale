import { EDITION_STORAGE_KEY, type Edition } from "./editions";

/**
 * The edition lives on `documentElement`'s data attribute — written before first
 * paint by the inline script in app/layout.tsx, and read back by CSS. That makes
 * it an external system, so React subscribes to it rather than owning it.
 */
const listeners = new Set<() => void>();

let snapshot: Edition = "morning";

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): Edition {
  const value = document.documentElement.dataset.edition;
  // Cached so useSyncExternalStore sees a stable value between notifications.
  if (value === "morning" || value === "evening" || value === "night") {
    snapshot = value;
  }
  return snapshot;
}

export function getServerSnapshot(): Edition {
  return "morning";
}

export function setEdition(next: Edition) {
  document.documentElement.dataset.edition = next;
  try {
    localStorage.setItem(EDITION_STORAGE_KEY, next);
  } catch {
    /* private mode — the edition just won't persist */
  }
  for (const listener of listeners) listener();
}
