import type { Metadata } from "next";
import { Big_Shoulders, Onest } from "next/font/google";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { Providers } from "@/components/providers";
import { meta, site } from "@/lib/site";
import "./globals.css";

const sans = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  display: "swap",
});

const display = Big_Shoulders({
  variable: "--font-shoulders",
  subsets: ["latin"],
  display: "swap",
});

const origin = "https://tafimichel.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: meta.home.title,
  description: meta.home.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: meta.home.title,
    description: meta.home.description,
    url: origin,
    siteName: site.name,
    locale: "de_CH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: meta.home.title,
    description: meta.home.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${sans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-veld font-sans text-ash">
        {/* Hides scroll-reveal targets before first paint, so nothing flashes
            in and then jumps. Injecting a stylesheet rather than touching a
            React-owned attribute keeps hydration clean; without JS, or with
            reduced motion, the rule is never added and the page reads as-is. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var s=document.createElement('style');s.textContent='[data-reveal]{opacity:0}';document.head.appendChild(s)}",
          }}
        />
        <Providers>
          <a
            href="#inhalt"
            className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:inline-block focus:h-auto focus:w-auto focus:bg-ash focus:px-4 focus:py-2 focus:text-veld"
          >
            Zum Inhalt
          </a>
          <Nav />
          <div id="inhalt">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
