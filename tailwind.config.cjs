/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",  
  ],
  theme: {
    extend: {
      backgroundImage: {
        'parchment': "url('/textures/parchment-texture.png')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
