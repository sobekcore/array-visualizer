import { shallowMount } from "@vue/test-utils";
import { generateArray, generateArrayToSave } from "./mocks/Arrays.mock";
import app from "@/app.vue";

import configs from "@/services/configs";

describe("app.vue", () => {
  const application = configs.application;

  const component = {
    default: shallowMount(app),
  };

  const prepareArrays = (component, full = false) => {
    expect(Object.keys(component.vm.arrays).length).toBe(0);

    const array = generateArrayToSave();
    component.vm.prepareArrays(array);

    expect(Object.keys(component.vm.arrays).length).toBe(1);

    if (full) {
      const loaded = component.vm.$utility.localStorageGet(application);
      const arrayToCompare = generateArray();

      expect(loaded).toEqual({ 1: arrayToCompare });
    }
  };

  test("app should load guide without cookie", () => {
    component.default.vm.loadGuide();

    expect(component.default.vm.guide).toBeTruthy();
    component.default.vm.guide = false;
  });

  test("app shouldnt load guide with cookie", () => {
    component.default.vm.loadGuide(true);

    expect(component.default.vm.guide).toBeFalsy();
    component.default.vm.guide = false;
  });

  test("app should save cookie when loading guide", () => {
    component.default.vm.loadGuide(true);
    const cookieName = `${application}-guide`;

    expect(component.default.vm.guide).toBeFalsy();

    const cookie = component.default.vm.$utility.cookieGet(cookieName);

    expect(cookie).toBeTruthy();
    component.default.vm.guide = false;
  });

  test("app should prepare arrays properly", () => {
    prepareArrays(component.default);
    component.default.vm.arrays = {};
  });

  test("app should save prepared arrays to the local storage", () => {
    prepareArrays(component.default, true);
    component.default.vm.arrays = {};
  });

  test("app should properly load arrays from local storage", () => {
    prepareArrays(component.default, true);

    expect(Object.keys(component.default.vm.load).length).toBe(0);

    component.default.vm.loadArrays();

    expect(Object.keys(component.default.vm.load).length).toBe(1);
    component.default.vm.arrays = {};
  });
});
