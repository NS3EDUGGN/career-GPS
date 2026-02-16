/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      /* Your website green branding */
      colors: {
        brand: {
          light: "#d1fae5",
          DEFAULT: "#10b981",
          dark: "#047857",
        },
      },

      /* Better glass blur */
      backdropBlur: {
        xs: "2px",
        glass: "18px",
      },

      /* Soft shadows for liquid UI */
      boxShadow: {
        glass: "0 20px 60px rgba(16,185,129,0.25)",
      },

    },
  },
  plugins: [],
}
