import { shallowMount } from "@vue/test-utils";
import ArrayItem from "@/components/atoms/ArrayItem.vue";

describe("ArrayItem.vue", () => {
  test("component mounts properly", () => {
    const component = shallowMount(ArrayItem);
    expect(component.componentVM).toBeTruthy();
  });
});
