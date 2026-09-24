/**
 * One-time helper: turns your Spotify app credentials into a refresh token.
 *
 * Run it yourself — it prints a token you paste into .env.local. Nothing is
 * sent anywhere except Spotify, and nothing is written to the repo.
 *
 *   node scripts/spotify-refresh-token.mjs
 */
import { createServer } from "node:http";
import { readFileSync } from "node:fs";

const PORT = 8888;
// Spotify requires the loopback IP here rather than the name `localhost`.
const REDIRECT = `http://127.0.0.1:${PORT}/callback`;
const SCOPE = "user-top-read";

const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => l.trim() && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    }),
);

const id = env.SPOTIFY_CLIENT_ID;
const secret = env.SPOTIFY_CLIENT_SECRET;

if (!id || !secret) {
  console.error("Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env.local first.");
  process.exit(1);
}

const authUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    response_type: "code",
    client_id: id,
    scope: SCOPE,
    redirect_uri: REDIRECT,
  });

const server = createServer(async (req, res) => {
  const code = new URL(req.url, REDIRECT).searchParams.get("code");
  if (!code) return res.end("No code in callback.");

  const token = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT,
    }),
  }).then((r) => r.json());

  if (token.refresh_token) {
    console.log("\nAdd this line to .env.local:\n");
    console.log(`SPOTIFY_REFRESH_TOKEN=${token.refresh_token}\n`);
    res.end("Done — the refresh token is in your terminal. You can close this tab.");
  } else {
    console.error("\nNo refresh token returned:", token);
    res.end("Something went wrong — check the terminal.");
  }

  server.close();
});

server.listen(PORT, "127.0.0.1", () => {
  console.log("\nOpen this URL, log in, and approve:\n");
  console.log(authUrl + "\n");
});
