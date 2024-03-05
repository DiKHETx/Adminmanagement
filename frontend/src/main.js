import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import './index.css';

const app = createApp(App);

// เพิ่ม feature flag ให้กับ Vue โดยตรงที่ main.js
app.config.globalProperties.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;

app.use(router).mount("#app");
