import { shallowMount } from "@vue/test-utils";
import { generateArray } from "./mocks/Arrays.mock";
import Arrays from "@/components/organisms/Arrays.vue";

describe("Arrays.vue", () => {
  const component = {
    default: shallowMount(Arrays, {
      props: {
        load: {},
      },
    }),

    loaded: shallowMount(Arrays, {
      props: {
        load: {
          1: generateArray(2),
          2: generateArray(2),
        },
      },
    }),
  };

  const clickAddNewArray = (component) => {
    const button = component.find(".add-new-array");
    const buttonElement = button.wrapperElement;

    expect(component.vm.arrays).toBe(0);

    const clickEvent = new Event("click");
    buttonElement.dispatchEvent(clickEvent);

    expect(component.vm.arrays).toBe(1);
  };

  test("button should open informational modal", () => {
    const button = component.default.find(".application-info");
    const buttonElement = button.wrapperElement;

    expect(component.default.vm.informationModal).toBeFalsy();

    const clickEvent = new Event("click");
    buttonElement.dispatchEvent(clickEvent);

    expect(component.default.vm.informationModal).toBeTruthy();
    component.default.vm.informationModal = false;
  });

  test("button should add new arrays", () => {
    clickAddNewArray(component.default);
    component.default.vm.arrays = 0;
  });

  test("button should remove all the arrays", () => {
    // Always click "OK" on the confirm dialog box
    window.confirm = jest.fn(() => true);

    clickAddNewArray(component.default);

    const removeArrays = component.default.find(".remove-arrays");
    const removeArraysElement = removeArrays.wrapperElement;

    const clickEvent = new Event("click");
    removeArraysElement.dispatchEvent(clickEvent);

    expect(component.default.vm.arrays).toBe(0);
  });

  test("arrays should be rendered in the dom", async () => {
    clickAddNewArray(component.default);

    await component.default.vm.$nextTick();

    const arraysDisplay = component.default.find(".arrays-display");
    const arraysDisplayElement = arraysDisplay.wrapperElement;

    expect(arraysDisplayElement).toBeDefined();
    component.default.vm.arrays = 0;
  });

  test("component should properly emit its values", () => {
    clickAddNewArray(component.default);

    const emitted = component.default.emitted();
    const [emittedArray] = emitted.arrays;
    const [emittedValue] = emittedArray;

    expect(emittedValue.array).toBe(1);
  });

  test("component should resize arrays", () => {
    component.default.vm.resizeArrays();

    expect(component.default.vm.width).toBe(window.innerWidth);
  });

  test("arrays should properly initialize with load values", () => {
    const load = component.loaded.vm.load;
    const loadLength = Object.keys(load).length;
    component.loaded.vm.loadArrays(load);

    expect(component.loaded.vm.arrays).toBe(loadLength);
  });
});
