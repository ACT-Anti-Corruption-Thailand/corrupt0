import "../styles/globals.css";
import localFont from "next/font/local";

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
      path: "../assets/fonts/DB_Helvethaica_X_Ext_v3.2.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/DB_Helvethaica_X_Blk_Ext_v3.2.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/DB_Helvethaica_X_Blk_Ext_v3.2.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-dbh-expanded",
});

const condensed_font = localFont({
  src: [
    {
      path: "../assets/fonts/DB_Helvethaica_X_Li_Cond_v3.2.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/DB_Helvethaica_X_Li_Cond_v3.2.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/DB_Helvethaica_X_Bd_Cond_v3.2.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-dbh-condensed",
});

export const metadata = {
  title: "Corrupt0 — ACT AI",
  description:
    "ร่วมเป็นส่วนหนึ่งในการค้นหาและตรวจสอบเพื่อสร้างความโปร่งใสทางการเมือง (Political Transparency) ไปกับ ACT AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="th"
      className={`${normal_font.variable} ${expanded_font.variable} ${condensed_font.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
