import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from "./App.vue";

import "primeicons/primeicons.css";

// import "./index.css";

//in main.js

// import "../node_modules/primevue/resources/themes/arya-purple";
import "primevue/resources/themes/lara-light-green/theme.css";

const app = createApp(App);
app.use(PrimeVue);
app.mount("#app");
