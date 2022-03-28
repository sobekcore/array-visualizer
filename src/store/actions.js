import utility from "@/services/utility";
import enums from "@/services/enums";

export default {
  prepareArraysAction: (store, event) => {
    let alreadyComputed = false;
    let arrays = store.getters.getArrays;

    if (!event || event.import) {
      store.commit("setLoaded", {});
      store.commit("setArrays", {});
      alreadyComputed = true;
    }

    if (event && event.import) {
      setTimeout(() => {
        store.commit("setLoaded", event.arrays);
      });
    }

    if (!alreadyComputed) {
      const id = event.array;

      if (!arrays[id]) {
        arrays[id] = [];
      }

      if (event.item && event.value) {
        let array = arrays[id];
        const iterator = array.entries();
        let alreadyCreated = false;

        for (let [id, value] of iterator) {
          if (value.item === event.item) {
            array[id] = {
              item: event.item,
              value: event.value,
            };

            alreadyCreated = true;
            break;
          }
        }

        if (!alreadyCreated) {
          array.push({
            item: event.item,
            value: event.value,
          });
        }
      }
    }

    store.commit("setArrays", arrays);
  },
  loadGuideAction: (store, closed) => {
    const cookieName = enums.COOKIE_GUIDE;
    const guide = utility.cookieGet(cookieName);
    let showGuide = false;

    if (closed) {
      utility.cookieSave(cookieName, false, 30);
    } else if (!guide) {
      showGuide = true;
    }

    store.commit("setGuide", showGuide);
  },
};
