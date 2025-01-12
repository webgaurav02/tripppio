
import type { Config } from "tailwindcss";


export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#eaecf3',
        'background': '#080a13',
        'primary': '#97a6e0',
        'secondary': '#1c3595',
        'accent': '#264feb',
        'cards': '#2f394f'
       },
       fontFamily: {
        bungee: ['Bungee', 'cursive'],
        workSans: ['Work Sans', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        breeSerif: ['Bree Serif', 'cursive']
      },
    },
  },
  plugins: [],
} satisfies Config;
