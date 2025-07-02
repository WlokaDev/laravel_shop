import { heroui } from '@heroui/react'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './resources/js/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        input: {
          border: '#CFD5D9',
        },
      },
    },
  },
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            danger: {
              DEFAULT: '#E53935',
            },
            primary: {
              DEFAULT: '#0D2946',
              500: '#3a6082',
              50: '#EDF0F4',
              100: '#212A33',
            },
            default: {
              DEFAULT: '#e5e7e8',
              foreground: '#0D2946',
            },
            foreground: {
              DEFAULT: '#303A44',
            },
          },
        },
      },
    }),
  ],
}
export default config
