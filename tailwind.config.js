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
        HomeHead: 'var(--Home-Heading)',
      },
      animation: {
        fadeIn: 'fadeIn 2s ease-in-out',
        slideIn: 'slideIn 2s ease-in-out',
        slideUp: 'slideUp 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideUp: {
          '100%': { transform: 'translateY(20px)', opacity: 1 },
          '0%': { transform: 'translateY(0)', opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}