/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#EAF1EF',
          100: '#CBDBD7',
          300: '#6D9C93',
          500: '#1E5C54',
          700: '#123E38',
          900: '#0B2E29'
        },
        amber: {
          50: '#FDF3E2',
          200: '#F6D18C',
          400: '#EFAE3F',
          500: '#E59A1F',
          600: '#C67F12'
        },
        coral: {
          500: '#E15A46',
          600: '#C6472F'
        },
        paper: '#F6F5EF',
        surface: '#FFFFFF'
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace']
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,46,41,0.06), 0 8px 24px -12px rgba(11,46,41,0.18)',
        pop: '0 12px 32px -8px rgba(11,46,41,0.28)'
      },
      borderRadius: {
        xl2: '1.25rem'
      },
      keyframes: {
        fillStar: {
          '0%': { transform: 'scale(0.4) rotate(-8deg)', opacity: 0 },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: 1 }
        }
      },
      animation: {
        fillStar: 'fillStar 0.35s cubic-bezier(.34,1.56,.64,1) forwards'
      }
    }
  },
  plugins: []
};
