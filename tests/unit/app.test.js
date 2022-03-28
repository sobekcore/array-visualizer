import { shallowMount } from "@vue/test-utils";
import { generateArray, generateArrayToSave } from "./mocks/Arrays.mock";
import app from "@/app.vue";

describe("app.vue", () => {
  const component = {
    default: shallowMount(app),
  };

  const prepareArrays = (component, full = false) => {
    let arrays = component.vm.$store.getters.getArrays;
    expect(Object.keys(arrays).length).toBe(0);

    const array = generateArrayToSave();
    component.vm.$store.dispatch("prepareArraysAction", array);

    arrays = component.vm.$store.getters.getArrays;
    expect(Object.keys(arrays).length).toBe(1);

    if (full) {
      const storage = component.vm.$enums.STORAGE_ARRAYS;
      const loaded = component.vm.$utility.localStorageGet(storage);
      const arrayToCompare = generateArray();

      expect(loaded).toEqual({ 1: arrayToCompare });
    }
  };

  test("app should load guide without cookie", () => {
    component.default.vm.loadGuide();

    expect(component.default.vm.guide).toBeTruthy();
    component.default.vm.$store.commit("setGuide", false);
  });

  test("app shouldnt load guide with cookie", () => {
    component.default.vm.loadGuide(true);

    expect(component.default.vm.guide).toBeFalsy();
    component.default.vm.$store.commit("setGuide", false);
  });

  test("app should save cookie when loading guide", () => {
    component.default.vm.loadGuide(true);
    const cookieName = component.default.vm.$enums.COOKIE_GUIDE;

    expect(component.default.vm.guide).toBeFalsy();

    const cookie = component.default.vm.$utility.cookieGet(cookieName);

    expect(cookie).toBeTruthy();
    component.default.vm.$store.commit("setGuide", false);
  });

  test("app should prepare arrays properly", () => {
    prepareArrays(component.default);
    component.default.vm.$store.commit("setArrays", {});
  });

  test("app should save prepared arrays to the local storage", () => {
    prepareArrays(component.default, true);
    component.default.vm.$store.commit("setArrays", {});
  });
});
