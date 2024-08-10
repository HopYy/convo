/** @type {import("tailwindcss").Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-gray": "#252525",
        "light-gray": "#313131",
        "main-green": "#258c60"
      },
    },
  },
  plugins: [],
}