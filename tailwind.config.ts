import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(50% 50% at 50% 50%, var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-img": "url('./img/hero.png')",
        "gradient-hero": "radial-gradient(var(--tw-gradient-stops))",
      },
      // variants: {
      //   extend: {
      //     backgroundColor: ["autofill"],
      //     bordeColor: ["autofill"],
      //   },
      // },
    },
  },
  plugins: [
    require("tailwindcss-hero-patterns"),
    require("@tailwindcss/typography"),
  ],
};
export default config;
