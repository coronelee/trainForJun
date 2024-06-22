/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    keyframes: {
      openModal: {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
    },
    fontFamily: {
      nunito_regular: ["NunitoRegular", "sans-serif"],
      nunito_bold: ["NunitoBold", "sans-serif"],
    },
  },
  plugins: [],
}