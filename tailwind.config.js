/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: { 
      colors: {
      // 'first-color': '#003f60',  
      'first-color': '#a855f7',  
      'second-color': '#04bdcf', 
    },
  },
  },
  plugins: [daisyui],
}
