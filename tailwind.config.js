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
        bg: '#F4F9F8',
        text: '#072D4B',
        stroke: '#6B7E9E',
        gray: '#CACACA',
        'gray-darkest': '#626262',
        primary: '#017187',
        // accent: '#f2f8fb',
        accent: '#CCE3E7',
        skyblue: '#2F9FF8'
      },
      fontSize: {
        'md': '0.9375rem'
      },
      borderRadius: {
        'base': '0.25rem'
      },
      minWidth: {
        '72': '18rem'
      },
      cursor: {
        none: 'none'
      },
      height: {
        '18': '4.5rem'
      },
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
