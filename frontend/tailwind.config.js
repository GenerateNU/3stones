/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/screens/home/home.tsx',
    './components/**.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: '#000000',
        white: '#FFFFFF',
        defaultPrimary: '#285852',
        defaultPush: '#65918C',
        defaultDisabled: '#A7C6C2',
        defaultText: '#282828',
        disabledText: '#868686',
        inverseText: '#F3F3F3',
        placeholderText: '#BBBBBB',
        surfaceBG: '#FAFAFC',
        surfaceFG: '#FFFFFF',
        surfaceDisabled: '#BBBBBB',
        borderPrimary: '#DDDDDD',
        borderSelected: '#4B4B4B',
        brand50: '#CADEDB',
        success: '#0E9888',
        warning: '#F7B418',
        error: '#D32246',
        brand: {
          50: '#CADEDB',
          100: '#A7C6C2',
          200: '#86ACA7',
          300: '#65918C',
          400: '#46756F',
          500: '#285852',
          600: '#1E524C',
          700: '#154B44',
          800: '#0E423C',
          900: '#083832',
        },
        gray: {
          50: '#F3F3F3',
          100: '#E8E8E8',
          200: '#DDDDDD',
          300: '#BBBBBB',
          400: '#A6A6A6',
          500: '#868686',
          600: '#727272',
          700: '#5E5E5E',
          800: '#4B4B4B',
          900: '#282828',
        },
      },
      fontFamily: {
        nunitoBlack: ['Nunito-Black'],
        nunitoBoldItalic: ['Nunito-BoldItalic'],
        heading: ['Nunito-Bold'],
        nunitoRegular: ['Nunito-Regular'],
        title: ['Nunito-ExtraBold'],
        bodyBold: ['Inter_18pt-Bold'],
        body: ['Inter_18pt-Regular'],
        sourceSans3: ['SourceSans3-Regular'],
      },
    },

    spacing: {
      three_xs: '4px',
      two_xs: '8px',
      xs: '12px',
      s: '16px',
      m: '24px',
      lg: '32px',
      xl: '40px',
      two_xl: '48px',
      three_xl: '56px',
      four_xl: '64px',
    },
  },
};
