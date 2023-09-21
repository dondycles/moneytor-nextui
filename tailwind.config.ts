import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: "#06b6d4",
            secondary: "#22c55e",
            background: "#efefef",
            foregorund: "#1d1d1d",
          },
        },
        dark: {
          colors: {
            primary: "#06b6d4",
            secondary: "#22c55e",
            background: "#1d1d1d",
            foregorund: "#efefef",
          },
        },
      },
    }),
    require("tailwind-scrollbar"),
  ],
};
export default config;
