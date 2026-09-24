import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, Newsreader } from "next/font/google";
import { META } from "@/lib/content";
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

export const viewport: Viewport = {
  themeColor: "#8ec3e8",
};

/**
 * Restores the saved edition before first paint so the page never flashes the
 * morning palette on top of a night sky.
 *
 * `data-edition` is deliberately NOT rendered by React — the client owns it
 * outright. If React also held it in its tree it would overwrite whatever the
 * user picked on the next reconciliation. The stylesheet treats a missing
 * attribute as morning, so server output is correct without it.
 */
const restoreEdition = `try{var e=localStorage.getItem('cn-site-edition');document.documentElement.dataset.edition=(e==='evening'||e==='night')?e:'morning';}catch(_){}`;

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
