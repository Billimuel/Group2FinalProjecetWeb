module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'oswald': ['oswald', 'sans-serif'],
        'opensans': ['Open Sans', 'Oswald', 'sans-serif'],
      },
      maxHeight: {
        '3/4': '75%',
        '2/3': '66%',
        '1/2': '50%',
        '2/5': '40%',
      }
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
}
