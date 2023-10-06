/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./Screens/HomeScreen.{ts, tsx}", "./components/Categories.{ts, tsx}", "./components/**/*.{js,jsx,ts,tsx}","./<custom-folder>/**/*.{js,jsx,ts,tsx}", "./Screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

