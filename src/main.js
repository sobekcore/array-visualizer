import { createApp } from "vue";
import app from "./app.vue";
import "@/utility/globals.scss";
import Utility from "@/utility/utility";
import Enums from "@/utility/enums";

const application = createApp(app);
application.config.globalProperties.$utility = Utility;
application.config.globalProperties.$enums = Enums;
application.mount("#app");
