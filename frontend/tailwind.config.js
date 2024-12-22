/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,vue,css,scss}"],
  theme: {
    extend: {
      colors: {
        customGray: "#909294",
        customGray2: "#212529",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
