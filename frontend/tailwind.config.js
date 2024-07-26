/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000', // Black color
        ab:'#fafafa',
      },
      
     fontFamily: {
      lobster : ['Lobster'],
      Monoton : ['Monoton'],
      Nosifer : ['Nosifer'],
      Tourney : ['Tourney']
     },
    },
  },

  plugins: [],
}

