/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#0067FF",
        yellowColor: "#FEB60D",
        purpleColor: "#9771ff",
        irisBlueColor: "#01B5C5",
        headingColor: "#181A1E",
        textColor: "#4E54F",
      },
      boxShadow: {
        panelShadow: "rgba(17,12,46,0.15)0px 48px 100px 0px",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          /* For Webkit (Chrome, Safari, Edge) */
          "&::-webkit-scrollbar": {
            display: "none",
          },
          /* For Firefox */
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      });
    },
  ],
};
