import { createApp } from "vue";
import app from "./app.vue";
import "@/utility/globals.scss";
import Utility from "@/utility/utility";

const application = createApp(app);
application.config.globalProperties.$utility = Utility;
application.mount("#app");
