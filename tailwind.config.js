module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      transitionDuration: {
        1500: '1500ms'
      }
    },
  },
  corePlugins: {
    fontFamily: false
  },
  plugins: []
};
