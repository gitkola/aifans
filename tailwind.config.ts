import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class", // or 'media' or 'class'
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/custom-forms")],
};
export default config;
