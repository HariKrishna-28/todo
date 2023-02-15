/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backGround: "#0D1117",
        textColour: "#FFFFFF",
        secondaryBackground: "#181B21",
        boxColour: "#2B2F42",
        secondaryText: "#858CA6",
      },
    },
  },
  plugins: [],
};
