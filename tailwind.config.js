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
        primary: {
          100: '#f0f5fe',
          200: '#dbe8fd',
          300: '#bed5fc',
          400: '#8fb8fa',
          500: '#3b82f6',
          600: '#224a8d',
          700: '#142b52',
          800: '#0b182d',
          900: '#050a13'
        },
      },
  
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        grow: {
          '0%, 100%': {
            boxShadow: '0px 0px 0.3em rgb(59 130 246 / 0.5)'
          },
          '50%': {
            boxShadow: '0px 0px 3em rgb(59 130 246 / 0.5)'
          },
        }
      },
      animation: {
        grow: 'grow 5s infinite',
      }
    },
  },
  plugins: [],
};

// '0%,100%': {
//   transform: 'box-shadow: 0px 0px 1em #aaa'
// },
// '50%': {
//   transform: 'box-shadow: 0px 0px 3em #aaa'
// },