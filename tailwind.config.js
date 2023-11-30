const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{html,js,vue}',
    './components/**/*.{html,js,vue}',
    './layouts/**/*.{html,js,vue}'
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            p: {
              marginTop: '0px',
              marginBottom: '12px'
            },
            '> ul > li > *:first-child': {
              marginTop: '0px',
            },
            '> ul > li > *:last-child': {
              marginBottom: '12px',
            },
            '> ol > li > *:first-child': {
              marginTop: '0px',
            },
            '> ol > li > *:last-child': {
              marginBottom: '12px',
            },
            "code::before": { content: '' },
            "code::after": { content: '' }
          },
        },
      },
      colors: {
        bg: '#2D2D2D',
        text: '#FFFFFF',
        stroke: '#606060',
        'input-stroke': '#30303E',
        'gray-darkest': '#626262',
        // primary: '#1A1A1A',
        primary: '#1F1F1F',
        secondary: '#262626',
        accent: '#94FFB2',
        'accent-darker': '#62AA76',
        skyblue: '#2F9FF8',
        error: '#FF5252',
        'error-darker': '#d42f2f',
        grayscale: {
          50: '#101010',
          100: '#111111',
          200: '#222222',
          300: '#333333',
          400: '#444444',
          500: '#555555',
          600: '#666666',
          700: '#777777',
          800: '#888888',
          900: '#999999',
          950: '#aaaaaa'
        },
        'post-written': '#2F9FF8'
      },
      fontSize: {
        'md': '0.9375rem'
      },
      borderRadius: {
        'base': '0.25rem',
        '3.75xl': '2rem',
        '4xl': '2.25rem'
      },
      minWidth: {
        '20': '5rem',
        '28': '7rem',
        '80': '20rem'
      },
      cursor: {
        none: 'none'
      },
      height: {
        '18': '4.5rem',
        '22': '5.5rem'
      },
      width: {
        '22': '5.5rem'
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      },
      zIndex: {
        '50': 50,
        '60': 60
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
