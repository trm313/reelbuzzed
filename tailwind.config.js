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
    },
  },
  variants: {},
  plugins: [],
};
