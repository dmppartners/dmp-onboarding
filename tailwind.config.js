/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#12181f",
        brand: {
          DEFAULT: "#1c3a5e",
          light: "#2f5580",
          accent: "#c98a3e",
        },
      },
    },
  },
  plugins: [],
};
