module.exports = {
  purge: ["./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {
      borderWidth: ['focus'],
    }
  },
  theme: {
    extend: {
      boxShadow: {
        card: '0px 2px 1px rgba(0, 0, 0, 0.25)'
      },
      colors: {
        primary: {
         "50": "#FFE3EC",
          "100": "#FFB8D2",
          "200": "#FF8CBA",
          "300": "#F364A2",
          "400": "#E8368F",
          "500": "#DA127D",
          "600": "#BC0A6F",
          "700": "#A30664",
          "800": "#870557",
          "900": "#620042",
        },
        neutral: {
          "50": "#F5F7FA",
          "100": "#E4E7EB",
          "200": "#CBD2D9",
          "300": "#9AA5B1",
          "400": "#7B8794",
          "500": "#616E7C",
          "600": "#52606D",
          "700": "#3E4C59",
          "800": "#323F4B",
          "900": "#1F2933",
        },
        purple: {
          "50": "#F2EBFE",
          "100": "#DAC4FF",
          "200": "#B990FF",
          "300": "#A368FC",
          "400": "#9446ED",
          "500": "#8719E0",
          "600": "#7A0ECC",
          "700": "#690CB0",
          "800": "#580A94",
          "900": "#44056E",
        }
      },
      fontFamily: {
        'header': '"Didact Gothic", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        'sans': '"Arimo", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      }
    },
  },
  variants: {
    extend: {
      borderWidth: ['focus']
    },
  },
  plugins: [],
}
