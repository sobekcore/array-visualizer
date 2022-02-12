import { shallowMount } from "@vue/test-utils";
import Dropdown from "@/components/atoms/Dropdown.vue";

import configs from "@/assets/configs";

describe("Dropdown.vue", () => {
  const configOperations = configs.operations();

  const component = {
    default: shallowMount(Dropdown, {
      props: {
        class: "test-dropdown-class",
        config: configOperations,
        title: configOperations[0].name,
      },
    }),
  };

  test("dropdown values should match config", async () => {
    const values = configOperations.map((option) => option.value);
    component.default.vm.active = true;

    await component.default.vm.$nextTick();

    const items = component.default.findAll(".dropdown-item");

    for (let item of items) {
      item = item.wrapperElement;
      let value = item.getAttribute("data-value");

      if (values.includes(value)) {
        values.splice(value, 1);
      }
    }

    expect(values.length).toBe(0);
    component.default.vm.active = false;
  });

  test("dropdown should be active after click", () => {
    const dropdown = component.default.find(".dropdown");
    const dropdownElement = dropdown.wrapperElement;

    let clickEvent = new Event("click");
    dropdownElement.dispatchEvent(clickEvent);

    expect(component.default.vm.active).toBeTruthy();
    component.default.vm.active = false;
  });

  test("dropdown should appear after click", async () => {
    const dropdown = component.default.find(".dropdown");
    const dropdownElement = dropdown.wrapperElement;

    let clickEvent = new Event("click");
    dropdownElement.dispatchEvent(clickEvent);

    await component.default.vm.$nextTick();

    let list = component.default.find(".dropdown-list");
    let listElement = list.wrapperElement;

    expect(listElement).toBeDefined();
    component.default.vm.active = false;
  });

  test("dropdown should hide after click if shown", async () => {
    const dropdown = component.default.find(".dropdown");
    const dropdownElement = dropdown.wrapperElement;

    let clickEvent = new Event("click");
    dropdownElement.dispatchEvent(clickEvent);

    await component.default.vm.$nextTick();

    let list = component.default.find(".dropdown-list");
    let listElement = list.wrapperElement;

    expect(listElement).toBeDefined();
    dropdownElement.dispatchEvent(clickEvent);

    await component.default.vm.$nextTick();

    list = component.default.find(".dropdown-list");
    expect(Object.keys(list).length).toBe(0);
  });
});
