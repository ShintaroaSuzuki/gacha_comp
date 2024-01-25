import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import { blackA, violet } from "@radix-ui/colors";

const config: Config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    transparent: "transparent",
    current: "currentColor",
    extend: {
      colors: {
        // radix-ui
        ...blackA,
        ...violet,
      },
    },
  },
};
export default config;
