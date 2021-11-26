module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      transitionDuration: {
        1500: '1500ms'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
