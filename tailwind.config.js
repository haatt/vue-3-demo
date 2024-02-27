/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{vue,js,ts,jsx,tsx,css,scss}"],
  prefix: "tw-",
  theme: {
    extend: {
      colors: {
        "r-orange": "#FF8F5E",
        "r-orange-1": "#FDEEE7",
        "r-green": "#65DBB0",
        "r-green-1": "#DAF6EC",
        "r-green-2": "#F1FCF8",
        "r-green-3": "#7FE9C2",
        "r-grey": "#A7A7A7",
        "r-blue-grey": "#F3F5F6",
        "r-blue-grey-1": "#F4F4F4",
        "r-navy-blue": "#3E4C68",
        "r-dark-grey": "#2A2C34",
        "r-white": "#ffffff",
        "r-red": "#FF8383",
        "r-blue": "#0000ee",
        "r-blue-1": "#6497d7",
        "r-yellow": "#FFCB14",
      },
    },
  },
  plugins: [],
};
