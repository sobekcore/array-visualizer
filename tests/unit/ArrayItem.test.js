import { shallowMount } from "@vue/test-utils";
import ArrayItem from "@/components/atoms/ArrayItem.vue";

describe("ArrayItem.vue", () => {
  const DEFAULT_ITEM_ID = 1;

  const component = {
    default: shallowMount(ArrayItem, {
      props: {
        id: DEFAULT_ITEM_ID,
        visual: false,
      },
    }),

    visual: shallowMount(ArrayItem, {
      props: {
        id: DEFAULT_ITEM_ID,
        visual: true,
      },
    }),
  };

  test("append props value to component input", () => {
    const input = component.default.find("input");
    const element = input.wrapperElement;
    expect(element.value).toMatch(/\w+/g);
  });

  test("input should be disabled when in visual mode", () => {
    const input = component.visual.find("input");
    const inputElement = input.wrapperElement;
    expect(inputElement.disabled).toBeTruthy();
  });

  test("item marker should be hidden in visual mode", () => {
    const marker = component.visual.find(".item-marker");
    expect(Object.keys(marker).length).toBe(0);
  });

  test("component should properly emit its values", () => {
    const arrayItemValue = component.default.vm.arrayItemValue;
    component.default.vm.returnItemValue(arrayItemValue, true);

    const emitted = component.default.emitted();
    const [emittedArray] = emitted.arrayItemValue;
    const [emittedValue] = emittedArray;

    expect(emittedValue).toBe(arrayItemValue);
  });
});
