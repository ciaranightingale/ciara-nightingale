import PageShell from "@/components/PageShell";
import { getTopTracks } from "@/lib/spotify";

/** Re-fetch spotify at most once an hour; the rest of the page is static. */
export const revalidate = 3600;

export default async function Page() {
  const topTracks = await getTopTracks();

  return <PageShell topTracks={topTracks} />;
}
