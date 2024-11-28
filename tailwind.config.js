/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    colors: {
      'beaver':{
        100: '#A5D8BB',
        200: '#73C3A4',

      },
    extend: {},
  },
  plugins: [],
}}
