import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      fancy: ["Playwrite AU NSW"],
    },
    extend: {
      colors: {
        dropdownBg: "#2b3347",
        dropdownBgDarker: "#1e263b",
      },
      keyframes: {
        pulseShadowGreen: {
          "0%, 100%": { boxShadow: "inset 0 0 10px 1px rgba(34,197,94,0.5)" },
          "50%": { boxShadow: "inset 0 0 15px 2px rgba(34,197,94,0.9)" },
        },
        pulseShadowRed: {
          "0%, 100%": { boxShadow: "inset 0 0 10px 1px rgba(235,64,52,0.5)" },
          "50%": { boxShadow: "inset 0 0 15px 2px rgba(235,64,52,0.9)" },
        },
      },
      animation: {
        "pulse-shadow-green": "pulseShadowGreen 1s ease-in-out infinite",
        "pulse-shadow-red": "pulseShadowRed 1s ease-in-out infinite",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["retro", "synthwave", "dark"],
  },
};
