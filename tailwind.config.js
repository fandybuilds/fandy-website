/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        space: {
          950: '#030712',
          900: '#060b19',
          850: '#0b112c',
          800: '#0f172a',
          700: '#1e293b',
        },
        cosmic: {
          blue: '#2c67ed',
          'blue-light': '#5185fa',
          'blue-dark': '#1a49ba',
          cyan: '#00f2fe',
          purple: '#8a2be2',
        }
      },
      boxShadow: {
        'glow-blue': '0 0 25px -3px rgba(44, 103, 237, 0.55), 0 0 10px -2px rgba(44, 103, 237, 0.4)',
        'glow-blue-lg': '0 0 45px -5px rgba(44, 103, 237, 0.7), 0 0 20px -3px rgba(44, 103, 237, 0.5)',
        'glow-cyan': '0 0 25px -3px rgba(0, 242, 254, 0.5)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'meteor': 'meteor 5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
