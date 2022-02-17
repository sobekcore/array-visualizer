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

  test("button should add new arrays", () => {
    const button = component.default.find(".add-new-array");
    const buttonElement = button.wrapperElement;

    expect(component.default.vm.arrays).toBe(0);

    let clickEvent = new Event("click");
    buttonElement.dispatchEvent(clickEvent);

    expect(component.default.vm.arrays).toBe(1);
    component.default.vm.arrays = 0;
  });

  test("button should open informational modal", () => {
    const button = component.default.find(".application-info");
    const buttonElement = button.wrapperElement;

    expect(component.default.vm.informationModal).toBeFalsy();

    let clickEvent = new Event("click");
    buttonElement.dispatchEvent(clickEvent);

    expect(component.default.vm.informationModal).toBeTruthy();
    component.default.vm.informationModal = false;
  });

  test("button should remove all the arrays", () => {
    // Always click "OK" on the confirm dialog box
    window.confirm = jest.fn(() => true);

    const addNewArray = component.default.find(".add-new-array");
    const addNewArrayElement = addNewArray.wrapperElement;

    expect(component.default.vm.arrays).toBe(0);

    let clickEvent = new Event("click");
    addNewArrayElement.dispatchEvent(clickEvent);

    expect(component.default.vm.arrays).toBe(1);

    const removeArrays = component.default.find(".remove-arrays");
    const removeArraysElement = removeArrays.wrapperElement;
    removeArraysElement.dispatchEvent(clickEvent);

    expect(component.default.vm.arrays).toBe(0);
  });

  test("arrays should be rendered in the dom", async () => {
    const button = component.default.find(".add-new-array");
    const buttonElement = button.wrapperElement;

    expect(component.default.vm.arrays).toBe(0);

    let clickEvent = new Event("click");
    buttonElement.dispatchEvent(clickEvent);

    expect(component.default.vm.arrays).toBe(1);

    await component.default.vm.$nextTick();

    const arraysDisplay = component.default.find(".arrays-display");
    const arraysDisplayElement = arraysDisplay.wrapperElement;

    expect(arraysDisplayElement).toBeDefined();
    component.default.vm.arrays = 0;
  });

  test("component should properly emit its values", () => {
    const button = component.default.find(".add-new-array");
    const buttonElement = button.wrapperElement;

    expect(component.default.vm.arrays).toBe(0);

    let clickEvent = new Event("click");
    buttonElement.dispatchEvent(clickEvent);

    expect(component.default.vm.arrays).toBe(1);

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
