/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'raspberry-light': '#E63946',
        'light-blue-light': '#A8DADC',
        'steel-blue-light': '#457B9D',
        'dark-blue-light': '#1D3557'
      }
    },
  },
  plugins: [],
  darkMode: ['class', '[data-theme="dark"]']
}
