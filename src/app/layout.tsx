import "../styles/globals.css";
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

export const metadata: Metadata = {
  title: "Corrupt0 — ACT Ai",
  description:
    "ร่วมเป็นส่วนหนึ่งในการค้นหาและตรวจสอบเพื่อสร้างความโปร่งใสทางการเมือง (Political Transparency) ไปกับ ACT Ai",
  manifest: "/site.webmanifest",
  colorScheme: "dark",
  themeColor: "#ffffff",
  other: {
    "msapplication-TileColor": "#ffffff",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${normal_font.variable} ${expanded_font.variable}`}>
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ec1c24" />
      <body>{children}</body>
    </html>
  );
}
