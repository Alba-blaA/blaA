import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

window.Kakao.init("696e8169dd084134f8ba85be092a70cb");

createApp(App).use(store).use(router).mount("#app");
