import utility from "@/services/utility";
import enums from "@/services/enums";

const load = utility.localStorageGet(enums.STORAGE_ARRAYS);
const guide = utility.cookieGet(enums.COOKIE_GUIDE);

export default {
  arrays: {},
  load: load || {},
  guide: guide || false,
};
