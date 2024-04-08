/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

// Vuetify
import { createVuetify } from "vuetify";

export default createVuetify({
  icons: {
    iconfont: "fa" || "md",
  },
  theme: {
    defaultTheme: "dark",
    themes: {
      dark: {
        colors: {
          main: "#1c1c28",
          core: "#fff",
          second: "#30303c",
          third: "#505064",
          fourth: "#8c8cb0",
          fifth: "#69698b",
          primary: "#3aafa9",
          accent: "#e74c3c",
        },
      },
      light: {
        colors: {
          main: "#fff",
          core: "#1c1c28",
          second: "#f0f0ff",
          third: "#d9d9fd",
          fourth: "#b9b9ed",
          fifth: "#c7c7ff",
          primary: "#3aafa9",
          accent: "#e74c3c",
        },
      },
    },
  },
  ssr: true,
});
