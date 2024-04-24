import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "./router";
// import Birthday from "./components/BirthdayDialog.vue";
/*eslint no-undef: "error"*/
/*global someFunction, localStorage*/

import "bootstrap/dist/css/bootstrap.min.css";

loadFonts();

// axios.defaults.baseURL = "http://localhost:4001/api/";
// axios.defaults.baseURL = "https://ubbus.online/api/";
axios.defaults.baseURL = "http://82.197.92.248/apis/warehouse"; 

// axios.interceptors.request.use(
//   async (config) => {
//     const token = localStorage.getItem("token");
//     const response = await fetch("https://api.ipify.org/?format=json");
//     const data = await response.json();
//     if (data) {
//       config.headers["userip"] = data.ip;
//     }
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }

//     return config;
//   },

//   (error) => {
//     return Promise.reject(error);
//   },
// );

createApp(App).use(VueAxios, axios).use(vuetify).use(router).mount("#app");
