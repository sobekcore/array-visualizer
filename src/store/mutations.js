import utility from "@/services/utility";
import enums from "@/services/enums";

export default {
  setArrays: (state, arrays) => {
    state.arrays = arrays;
    utility.localStorageSave(enums.STORAGE_ARRAYS, arrays);
  },
  setLoaded: (state, arrays) => {
    state.load = arrays;
  },
  setGuide: (state, guide) => {
    state.guide = guide;
    utility.cookieSave(enums.COOKIE_GUIDE, guide, 30);
  },
};
