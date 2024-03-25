/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-radial': "radial-gradient(at bottom left, rgba(0,0,0,0) 60%, #8D0509 100%)",
      },
    },
  },
  plugins: [],
}

