import { config } from "@vue/test-utils";
import utility from "@/utility/utility";
import enums from "@/utility/enums";

config.global.mocks = {
  $utility: utility,
  $enums: enums,
};
