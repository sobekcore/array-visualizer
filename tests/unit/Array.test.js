import { shallowMount } from "@vue/test-utils";
import Array from "@/components/molecules/Array.vue";

describe("Array.vue", () => {
  const DEFAULT_ARRAY_ID = 1;

  const resizeEvent = new Event("resize");
  global.innerWidth = 1920;
  global.dispatchEvent(resizeEvent);

  const component = {
    default: shallowMount(Array, {
      props: {
        id: DEFAULT_ARRAY_ID,
        title: "Array",
        visual: false,
      },
    }),

    visual: shallowMount(Array, {
      props: {
        id: DEFAULT_ARRAY_ID,
        title: "Array",
        visual: true,
      },
    }),
  };

  test("array should have id class if not in visual mode", () => {
    const array = component.default.find(".array");
    const arrayElement = array.wrapperElement;
    const id = component.default.vm.id;

    let hasArrayId = arrayElement.className.includes(`array-${id}`);
    expect(hasArrayId).toBeTruthy();
  });

  test("button should be hidden in visual mode", () => {
    const button = component.visual.find(".array-button");
    expect(Object.keys(button).length).toBe(0);
  });

  test("button should add new array item", () => {
    const button = component.default.find(".array-button");
    const buttonElement = button.wrapperElement;

    expect(component.default.vm.items).toBe(0);

    let clickEvent = new Event("click");
    buttonElement.dispatchEvent(clickEvent);

    expect(component.default.vm.items).toBe(1);
    component.default.vm.items = 0;
  });

  test("array should properly emit its values", () => {
    const arrayItemId = 1;
    const arrayItemValue = "Value";

    component.default.vm.syncArrays(
      DEFAULT_ARRAY_ID,
      arrayItemId,
      arrayItemValue
    );

    const emitted = component.default.emitted();
    let [emittedArray] = emitted.arrayValues;
    let [emittedObject] = emittedArray;

    expect(emittedObject.array).toBe(DEFAULT_ARRAY_ID);
    expect(emittedObject.item).toBe(arrayItemId);
    expect(emittedObject.value).toBe(arrayItemValue);
  });
});
