/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "93vh": "93vh",
        "92vh": "92vh",
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
        "90%": "90%",
      },
      backgroundImage: {
        homebg: "url('./src/assets/homebg.jpg')",
      },
      colors: {
        primary: "#1A202C",
        secondary: "#32384D",
        tertiary: "#475575",
        quaternary: "#637294",
        quinary: "#8092C2",
        primaryLight: "#F1F3F6",
        secondaryLight: "#E2E6EB",
        tertiaryLight: "#D3D8DF",
        quaternaryLight: "#C4C9D1",
        quinaryLight: "#B5BACC",
        primaryDark: "#0F141C",
        secondaryDark: "#1A202C",
        tertiaryDark: "#232A39",
        quaternaryDark: "#32384D",
        quinaryDark: "#475575",
        primaryText: "#F1F3F6",
        secondaryText: "#E2E6EB",
        tertiaryText: "#D3D8DF",
        quaternaryText: "#C4C9D1",
        quinaryText: "#B5BACC",
        primaryHover: "#151C26",
        secondaryHover: "#232A39",
        tertiaryHover: "#2E354A",
        quaternaryHover: "#394157",
        quinaryHover: "#444C62",
        HomeBgColor: "#F1F3F6",
        headingColor: "#424242",
      }
      ,
      screens: {
        tablet: "640px",

        laptop: "1024px",

        desktop: "1280px",
      },
    },
  },
  plugins: [require("daisyui")],
};
