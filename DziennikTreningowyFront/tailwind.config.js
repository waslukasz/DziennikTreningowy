/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "modal-black-rgba": "rgba(0, 0, 0, 0.54)",
      },
    },
  },
  plugins: [],
};
