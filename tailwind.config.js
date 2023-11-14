/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      ip5: "320px",
      sm: "360px",
      ipx: "375px",
      ip13: "390px",
      px5: "393px",
      // => @media (min-width: 640px) { ... }
      on2: "412px",
      ipxr: "414px",
      ip13promax: "428px",

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
