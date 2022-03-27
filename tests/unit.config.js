import { config } from "@vue/test-utils";
import utility from "@/services/utility";
import enums from "@/services/enums";

config.global.mocks = {
  $utility: utility,
  $enums: enums,
};
