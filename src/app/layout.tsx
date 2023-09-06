import "../styles/globals.css";

import PdpaBanner from "@/components/PdpaBanner";
import Script from "next/script";

import localFont from "next/font/local";

import type { Metadata } from "next";

const normal_font = localFont({
  src: [
    {
      path: "../assets/fonts/DB_Helvethaica_X.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/DB_Helvethaica_X_Bd_v3.2.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-dbh",
});

const expanded_font = localFont({
  src: [
    {
      path: "../assets/fonts/DB_Helvethaica_X_Blk_Ext_v3.2.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-dbh-expanded",
});

export const commonOpenGraph: Metadata["openGraph"] = {
  title: "ACT Ai Politics Data — ACT Ai",
  description:
    "ร่วมเป็นส่วนหนึ่งในการค้นหาและตรวจสอบเพื่อสร้างความโปร่งใสทางการเมือง (Political Transparency) ไปกับ ACT Ai",
  images: {
    url: "https://poldata.actai.co/og.png",
    type: "image/png",
    width: 1201,
    height: 630,
  },
};

export const openGraph: Metadata["openGraph"] = {
  url: "https://poldata.actai.co/",
  type: "website",
  ...commonOpenGraph,
};

export const twitter: Metadata["twitter"] = {
  card: "summary_large_image",
  ...commonOpenGraph,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://poldata.actai.co/"),
  title: "ACT Ai Politics Data — ACT Ai",
  description:
    "ร่วมเป็นส่วนหนึ่งในการค้นหาและตรวจสอบเพื่อสร้างความโปร่งใสทางการเมือง (Political Transparency) ไปกับ ACT Ai",
  manifest: "/site.webmanifest",
  colorScheme: "dark",
  themeColor: "#ffffff",
  other: {
    "msapplication-TileColor": "#ffffff",
  },
  openGraph,
  twitter,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${normal_font.variable} ${expanded_font.variable}`}>
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ec1c24" />
      <body>
        <Script id="gtag-pre">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied'
            });
          `}
        </Script>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-1FSBCVGWK4" />
        <Script id="gtag-init">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            gtag('js', new Date());
            gtag('config', 'G-1FSBCVGWK4');
          `}
        </Script>
        <PdpaBanner />
        {children}
        <Script
          id="plausible"
          defer
          data-domain="poldata.actai.co"
          src="https://analytics.punchup.world/js/plausible.js"
        />
      </body>
    </html>
  );
}
