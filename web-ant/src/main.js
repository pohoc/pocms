import { createApp } from "vue";
import router from "./router";
import store from "./store";
import App from "./App.vue";

//引入公共css
import "./assets/css/style.css";

createApp(App).use(store).use(router).mount("#app");