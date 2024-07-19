/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary: '#ba68c8', // Purple
        // secondary: '#ce93d8', // Light purple
        // accent: '#e1bee7', // Lighter purple
        // background: '#f3e5f5', // Light lavender
        // text: '#4a148c', // Dark purple
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        accent: 'var(--accent-color)',
        background: 'var(--background-color)',
        card: 'var(--card-color)',
        text: 'var(--text-primary-color)',
        text2: 'var(--text-secondary-color)',
        shadowText: 'var(--shadow-text-color)',
        logoColor: 'var(--logo-color)',
      },
    },
  },
  plugins: [],
}