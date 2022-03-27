import { createApp } from "vue";
import app from "@/app.vue";
import store from "@/store/store";
import "@/styles/globals.scss";

import utility from "@/services/utility";
import enums from "@/services/enums";

const application = createApp(app);

application.config.globalProperties.$utility = utility;
application.config.globalProperties.$enums = enums;

application.use(store);
application.mount("#app");
