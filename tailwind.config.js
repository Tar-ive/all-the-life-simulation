module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          green: {
            100: '#d1fae5',
            200: '#a7f3d0',
            300: '#6ee7b7',
            400: '#34d399',
            500: '#10b981',
            600: '#059669',
            700: '#047857',
            800: '#065f46',
          },
          blue: {
            200: '#bfdbfe',
          },
          red: {
            200: '#fecaca',
          },
          yellow: {
            200: '#fef08a',
          },
        },
      },
    },
    plugins: [],
  }