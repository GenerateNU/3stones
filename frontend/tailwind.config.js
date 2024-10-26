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
        inverseText: 'F3F3F3',
        surfaceBG: '#FAFAFC',
        surfaceFG: '#FFFFFF',
        border: '#DDDDDD',
        brand50: '#CADEDB',
        success: '#0E9888',
      },
      fontFamily: {
        nunitoBlack: ['Nunito-Black'],
        nunitoBoldItalic: ['Nunito-BoldItalic'],
        heading: ['Nunito-Bold'],
        nunitoRegular: ['Nunito-Regular'],
        title: ['Nunito-ExtraBold'],
        bodyBold: ['Inter_18pt-Bold'],
        body: ['Inter_18pt-Regular'],
        sourceSans3BodyBold: ['SourceSans3-Regular'],
        sourceSans3CaptionMedium: ['SourceSans3-Medium'],
        sourceSans3BodyMedium: ['SourceSans3-SemiBold'],

    },
  },
},
};
