const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    options: {
      safelist: []
    }
  },
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: '#0674bb',
        accent: '#f2f8fb'
      },
      cursor: {
        none: 'none'
      },
      height: {
        '18': '4.5rem'
      },
      fontFamily: {
        sans: ['Source Sans Pro', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
