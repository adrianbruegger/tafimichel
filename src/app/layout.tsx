import type { Metadata } from "next";
import Script from "next/script";
import { Big_Shoulders, Onest } from "next/font/google";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Nav } from "@/components/nav";
import { Providers } from "@/components/providers";
import { siteGraph } from "@/lib/seo";
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: meta.home.title,
  description: meta.home.description,
  openGraph: {
    siteName: site.name,
    locale: "de_CH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de-CH"
      className={`${sans.variable} ${display.variable} antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://challenges.cloudflare.com" />
        <link rel="preconnect" href={new URL(site.plausible.script).origin} />
      </head>
        <body className="min-h-svh bg-veld font-sans text-ash">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var s=document.createElement('style');s.id='reveal-hide';s.textContent='[data-reveal]{opacity:0}';document.head.appendChild(s);setTimeout(function(){s.remove()},2500)}",
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
        <Script
          src={site.plausible.script}
          strategy="afterInteractive"
          data-domain={site.plausible.domain}
        />
        <JsonLd data={siteGraph()} />
      </body>
    </html>
  );
}
