/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        gradient:
          "linear-gradient(to right, #bd1225, #cd1f2f, #de2b3a, #ee3645, #ff4050)",
        gradientLight:
          "linear-gradient(to right, #bd1225, #cd1f2f, #de2b3a, #ee3645, #ff4050)",
        gradientBgImg: "url('assets/images/gradientBgImg.png'), linear-gradient(92.08deg, #BD1225 0.6%, #FF4050 103.08%)",
      },

      colors: {
        main: "#ED1E24",
        primary: "#535665",
        secondary: "#FF6666",
        white: "#FFFFFF",
        vysyamalaBlack: "#282C3F",
        checkGreen: "#53C840",
        gray: "#E9EAEC",
        ash: "#4F515D",
        ashSecondary: "#85878C",
        "footer-gray": "#202332",
        "footer-text-gray": "#D4D5D9",
        "footer-line": "rgba(255, 255, 255, 0.12)",
        "gloss-black": "rgba(0, 0, 0, 0.73)",
        "light-pink": "#FFE5E5",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
};
