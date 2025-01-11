
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
        'text': '#0c141c',
        'background': '#f2f6fb',
        'primary': '#2878d8',
        'secondary': '#80b5f4',
        'accent': '#3892fd',
        'cards': '#ebf0f9'
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
