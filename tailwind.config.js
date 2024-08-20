/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        'main': '0px 0px 20px 0px rgba(0, 0, 0, 0.25)'
      }
    },
    keyframes: {
      openModal: {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
      openInputData: {
        '0%': { height: '0' },
        '100%': { height: 'auto' },
      },
    },
    fontFamily: {
      nunito_regular: ["NunitoRegular", "sans-serif"],
      nunito_bold: ["NunitoBold", "sans-serif"],
    },
  },
  plugins: [],
}