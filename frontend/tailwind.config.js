/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#1a2236",
      },
      width: {
        ds: "22rem",
      },
      maxWidth: {
        ds: "22rem",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
