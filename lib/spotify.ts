import "server-only";

/**
 * Top tracks for the site owner's own account.
 *
 * This runs on the server only. The refresh token and client secret authorise
 * *this* account, so they can never reach the browser — and the browser-safe
 * PKCE flow is no use here either, since it would log the visitor in and show
 * their listening rather than the owner's.
 */

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const TOP_URL = "https://api.spotify.com/v1/me/top/tracks";

/** How many tracks to show in the picks column. */
const COUNT = 6;

/** Roughly the last four weeks. `medium_term` is ~6 months, `long_term` years. */
const RANGE = "short_term";

/** Cache for an hour — top tracks move slowly, and this stays far from any rate limit. */
const REVALIDATE = 3600;

export type Track = { title: string; by: string; href?: string };

type TopTracksResponse = {
  items?: Array<{
    name?: string;
    artists?: Array<{ name?: string }>;
    external_urls?: { spotify?: string };
  }>;
};

async function accessToken(): Promise<string | null> {
  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!id || !secret || !refresh) return null;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh,
    }),
    next: { revalidate: REVALIDATE },
  });

  if (!res.ok) return null;
  const json: { access_token?: string } = await res.json();
  return json.access_token ?? null;
}

/**
 * Returns null on any failure — missing config, expired token, Spotify down.
 * The caller falls back to the hand-written picks, so an outage costs nothing.
 */
export async function getTopTracks(): Promise<Track[] | null> {
  try {
    const token = await accessToken();
    if (!token) return null;

    const res = await fetch(`${TOP_URL}?time_range=${RANGE}&limit=${COUNT}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;

    const json: TopTracksResponse = await res.json();
    const tracks = (json.items ?? [])
      .map((t) => ({
        title: t.name ?? "",
        by: (t.artists ?? []).map((a) => a.name).filter(Boolean).join(", "),
        href: t.external_urls?.spotify,
      }))
      .filter((t) => t.title && t.by);

    return tracks.length ? tracks : null;
  } catch {
    return null;
  }
}
