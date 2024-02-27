import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/styles/index.scss";
import router from "./router";
import store from "./store";
import "vue-toast-notification/dist/theme-sugar.css";
import "qalendar/dist/style.css";

createApp(App).use(store).use(router).mount("#app");
