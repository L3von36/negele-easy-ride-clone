/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F172A',
          100: '#1E293B',
        },
        accent: '#F97316',
        background: '#F3F4F6',
        card: '#FFFFFF',
        'text-primary': '#0F172A',
        'text-secondary': '#6B7280',
      },
      borderRadius: {
        'lg': '16px',
        'xl': '24px',
      },
    },
  },
  plugins: [],
}