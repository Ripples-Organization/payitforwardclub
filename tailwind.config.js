/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}'],
  theme: {
    extend: {},
    colors: {
      blue_pf: '#001F8E',
      purple: '#7e5bef',
      pink: '#ff49db',
      orange: '#ff7849',
      green: '#13ce66',
      yellow: '#ffc82c',
      'gray-dark': '#273444',
      gray: '#8492a6',
      'gray-light': '#d3dce6',
      white: '#ffffff',
      blue_pf_primary: '#0038FF',
      grey_pf: '#EEEEEE',
    },
    fontFamily: {
      body: ['Racing Sans One', 'sans-serif'],
      sans: ['ui-sans-serif', 'system-ui'],
      roboto: ['Roboto', 'sans-serif'],
    },
  },
  plugins: [],
}
