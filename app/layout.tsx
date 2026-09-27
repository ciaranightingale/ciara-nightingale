import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, Newsreader } from "next/font/google";
import { META } from "@/lib/content";
import { EDITION_STORAGE_KEY } from "@/lib/editions";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
};

/**
 * Restores the saved edition before first paint so the page never flashes the
 * morning palette on top of a night sky.
 *
 * No theme-color meta is declared: iOS Safari reads that once and then ignores
 * changes, so any fixed value locks the phone's status and address bars to one
 * edition. Without it the browser samples the page itself and the bars follow
 * whichever edition and section the reader is actually looking at.
 *
 * `data-edition` is deliberately NOT rendered by React — the client owns it
 * outright. If React also held it in its tree it would overwrite whatever the
 * user picked on the next reconciliation. The stylesheet treats a missing
 * attribute as morning, so server output is correct without it.
 */
const restoreEdition = `try{
  var e = localStorage.getItem('${EDITION_STORAGE_KEY}');
  e = (e === 'evening' || e === 'night') ? e : 'morning';
  document.documentElement.dataset.edition = e;
}catch(_){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: restoreEdition }} />
        {children}
      </body>
    </html>
  );
}
