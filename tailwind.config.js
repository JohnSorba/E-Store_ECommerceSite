/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      // Define a set of custom button styles
      button: {
        base: "px-4 py-2 rounded-md font-semibold",
        primary: "bg-blue-500 text-white",
        secondary: "bg-gray-300 text-gray-800",
      },
    },
  },
  variants: {},
  plugins: [],
};
