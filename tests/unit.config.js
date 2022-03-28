import { config } from "@vue/test-utils";
import store from "@/store/store";

import utility from "@/services/utility";
import enums from "@/services/enums";

config.global.mocks = {
  $store: store,
  $utility: utility,
  $enums: enums,
};
