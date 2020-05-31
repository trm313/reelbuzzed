module.exports = {
  purge: ["./components/**/*.js", "./pages/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        "body": [
          "Nunito",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Ubuntu",
          "Helvetica Neue",
          "sans-serif",
        ],
        "display": ["Oswald", "Cambria", "serif"],
      },
      fontSize: {
        "3xs": "0.5rem",
        "2xs": "0.6rem",
      },
    },
  },
  variants: {
    border: ["focus"],
  },
  plugins: [],
};
