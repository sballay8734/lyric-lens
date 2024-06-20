import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      fancy: ["Playwrite AU NSW"],
    },
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["retro", "synthwave"],
  },
};
