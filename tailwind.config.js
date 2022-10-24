/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'black': '#353535',
      'night': '#2a303c',
      'dark': '#1d3557',
      'middle': '#457b9d',
      'light': '#a8dadc',
      'white': '#f1faee',
      'red': '#e63946',
    },

  },
  plugins: [require("daisyui")],
}
