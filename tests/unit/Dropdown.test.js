import { shallowMount } from "@vue/test-utils";
import Dropdown from "@/components/atoms/Dropdown.vue";

import configs from "@/services/configs";

describe("Dropdown.vue", () => {
  const configOperations = configs.operations;

  const component = {
    default: shallowMount(Dropdown, {
      props: {
        class: "test-dropdown-class",
        config: configOperations,
        title: configOperations[0].name,
      },
    }),
  };

  const clickOnDropdown = async (component) => {
    const dropdown = component.find(".dropdown");
    const dropdownElement = dropdown.wrapperElement;

    const clickEvent = new Event("click");
    dropdownElement.dispatchEvent(clickEvent);

    expect(component.vm.active).toBeTruthy();

    await component.vm.$nextTick();

    const list = component.find(".dropdown-list");
    const listElement = list.wrapperElement;

    expect(listElement).toBeDefined();
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

  test("dropdown should appear after click", async () => {
    await clickOnDropdown(component.default);
    component.default.vm.active = false;
  });

  test("dropdown should hide after click if shown", async () => {
    await clickOnDropdown(component.default);

    const dropdown = component.default.find(".dropdown");
    const dropdownElement = dropdown.wrapperElement;

    const clickEvent = new Event("click");
    dropdownElement.dispatchEvent(clickEvent);

    await component.default.vm.$nextTick();

    const list = component.default.find(".dropdown-list");

    expect(component.default.vm.active).toBeFalsy();
    expect(Object.keys(list).length).toBe(0);
  });

  test("dropdown should emit clicked values", async () => {
    component.default.vm.active = true;

    await component.default.vm.$nextTick();

    const list = component.default.find(".dropdown-item");
    const listElement = list.wrapperElement;

    expect(listElement).toBeDefined();

    const elementValue = listElement.getAttribute("data-value");

    const event = { target: listElement };
    component.default.vm.setDropdownValues(event);

    const emitted = component.default.emitted();
    const [emittedArray] = emitted.value;
    const [emittedValue] = emittedArray;

    expect(emittedValue).toBe(elementValue);
  });
});
