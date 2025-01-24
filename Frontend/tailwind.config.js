/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "93vh": "93vh",
        "7vh": "7vh",
        "30rem": "30rem",
        "30%": "30%",
        "32%": "32%",
        "90%": "90%",
      },
      width: {
        "85vw": "85vw",
        "80vw": "80vw",
        "100vw": "100vw",
        "99vw": "99vw",
        "30%": "30%",
        "55%": "55%",
        "45%": "45%",
      },
      backgroundImage: {
        homebg: "url('./src/assets/homebg.jpg')",
      },
      screens: {
        tablet: "640px",

        laptop: "1024px",

        desktop: "1280px",
      },
    },
  },
  plugins: [require("daisyui")],
};
