/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}" ,'./src/components/**/*.jsx'],
  
safelist: ['animate-[fade-in_1s_slide-out-left]', 'animate-[fade-in-down_1s_ease-in-out]'],
  theme: {
    extend: {
      borderStyle: {
        'dashed': 'dashed',
      },
      colors: {
        button:{
          start:'#05ABB6',
          end:'#6BDBE2',
        },
        transparent:'rgba(255, 255, 255, 0.3)',
        highlight:'#388087',
        login:'#6FB3B8',
        cta:'#5CBE8F',
        yellow:'#F8CA55',
        sun:'#FF9900',
        yoi:'#B4F1CF',
        ctao:'#FF6161',
        read:'#116466',
        red:'#F85454',
        birthdaybg:'#FFECF0',
        purple:'#B8A7FB',
        viola:'#583EBC',
        pink:'#EE266E',
        active:'#3AB4BC',
        sky:'#6FA8FF',
        orange:'#EE266E',
        shortcut:'#6FA8FF',
        story:{
          start:'#EE266E',
          end:'#5CBE8F',
        },
        page:'#BFC138',
        span:{
          start:'#3AB4BC',
          end:'#5CBE8F',
        },
      },
      fontSize: {
        'time': '10px',
      },
    },
    experimental: {
      applyComplexClasses: true,
      layers: ['utilities'],
    },
  },
  plugins: [],
}

