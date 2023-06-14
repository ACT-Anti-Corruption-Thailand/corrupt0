/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["var(--font-dbh)", ...defaultTheme.fontFamily.sans],
      serif: ["var(--font-dbh)", ...defaultTheme.fontFamily.serif],
      mono: ["var(--font-dbh)", ...defaultTheme.fontFamily.mono],
      expanded: ["var(--font-dbh-expanded)", ...defaultTheme.fontFamily.sans],
      condensed: ["var(--font-dbh-condensed)", ...defaultTheme.fontFamily.sans],
    },
    colors: {
      transparent: "transparent",
      black: "#000",
      white: "#fff",
    },
    spacing: {
      0: "0",
      1: "1px",
      2: "2px",
      4: "4px",
      5: "5px",
      10: "10px",
      15: "15px",
      20: "20px",
      30: "30px",
      40: "40px",
      50: "50px",
      60: "60px",
      80: "80px",
      100: "100px",
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      1: "1px",
      2: "2px",
    },
    borderRadius: {
      5: "5px",
      10: "10px",
      full: "9999px",
    },
    extend: {
      gridTemplateRows: {},
      gridTemplateColumns: {
        "2eq": "1fr 1fr",
        "3eq": "repeat(3,1fr)",
        "4eq": "repeat(4,1fr)",
      },
    },
  },
  plugins: [],
};
