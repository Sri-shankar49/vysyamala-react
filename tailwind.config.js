/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        happyStorybglayer:"radial-gradient(#111 50%, #000 100%)",
        gradient:
          "linear-gradient(to right, #bd1225, #cd1f2f, #de2b3a, #ee3645, #ff4050)",
        gradientLight:
          "linear-gradient(to right, #bd1225, #cd1f2f, #de2b3a, #ee3645, #ff4050)",
        gradientBgImg: "url('assets/images/gradientBgImg.png'), linear-gradient(92.08deg, #BD1225 0.6%, #FF4050 103.08%)",
        heroSliderBgImg: "url('assets/images/HeroSliderBg.png')",
        gradientGold: "linear-gradient(to right, #d79d32, #dfa22d, #e6a727, #eeac20, #f5b117, #f8b71d, #fbbd23, #fec328, #fdcb3a, #fdd249, #fdda58, #fde166)",
        gradientGreen: "linear-gradient(to right, #2fbd12, #3ccd1f, #48de2b, #54ee36, #60ff40)",
        gradientBlack: "background: linear-gradient(179.86deg, rgba(0, 0, 0, 0) 52.14%, #000000 99.88%)"
      },

      colors: {
        main: "#ED1E24",
        primary: "#535665",
        secondary: "#FF6666",
        white: "#FFFFFF",
        vysyamalaBlack: "#282C3F",
        vysyamalaBlackSecondary: "#14181B",
        vysyamalaSandal: "#FFFBE3",
        vysyamalaLightSandal: "#FFFDF1",
        vysyamalaPink: "#EF4770",
        vysyamalaViolet: "#9047EF",
        vysyamalaYellow: "#EFAC47",
        checkGreen: "#53C840",
        checkRed: "#cd3040",
        closeRed: "#FF3333",
        gray: "#E9EAEC",
        grayBg: "#fafafa",
        ash: "#4F515D",
        ashSecondary: "#85878C",
        chatGray: "#E6E5EB",
        chatBlue: "#007AFF",
        "footer-gray": "#202332",
        "footer-text-gray": "#D4D5D9",
        "footer-line": "rgba(255, 255, 255, 0.12)",
        "gloss-black": "rgba(0, 0, 0, 0.73)",
        "light-pink": "#FFE5E5",
        "lightFade-pink": "#FFF5F5",
        "shadowPink": "#C243434B",
        "trustedWhite" : "#f9f9f9",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      container: {
        center: true,
      },
      boxShadow: {
        'reviewBoxShadow': '0px 0px 15px rgba(18, 17, 9, 0.05)',
        'trustedBoxShadow': '0px 20px 50px rgba(18, 17, 9, 0.01)',
      }
    },
  },
  plugins: [],
};
