/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4CAF50',
          light: '#81c784',
          dark: '#388e3c',
        },
        secondary: {
          DEFAULT: '#2196F3',
          light: '#64b5f6',
          dark: '#1976d2',
        },
      },
    },
  },
  plugins: [],
}

