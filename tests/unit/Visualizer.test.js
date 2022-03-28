import { shallowMount } from "@vue/test-utils";
import { sleep } from "./mocks/Time.mock";
import { generateArray, generateArrayToSave, generateCompareArrays } from "./mocks/Arrays.mock";
import Visualizer from "@/components/organisms/Visualizer.vue";

import configs from "@/services/configs";
import operations from "@/services/operations";

describe("Visualizer.vue", () => {
  const COMPARE_ARRAYS_LENGTH = 2;
  const COMPARE_ARRAYS_ITEMS = 2;

  const configOperations = configs.operations;

  const component = {
    default: shallowMount(Visualizer, {
      attachTo: document.body,
    }),
  };

  const fillArrayResults = (component) => {
    component.vm.$enums.ITEM_TRANSITION_TIME = 0;

    const compareArrays = generateCompareArrays(
      COMPARE_ARRAYS_LENGTH,
      COMPARE_ARRAYS_ITEMS
    );

    component.vm.calculateArrays(compareArrays);
    component.vm.$enums.ITEM_TRANSITION_TIME = 0.25;

    return compareArrays;
  };

  for (let option of configOperations) {
    test(`calculate compared arrays - ${option.name}`, async () => {
      expect(component.default.vm.arrayResults.length).toBe(0);

      component.default.vm.operation = option.value;
      const compareArrays = fillArrayResults(component.default);

      await sleep();

      const result = operations.calculate(compareArrays, option.value);

      expect(component.default.vm.arrayResults).toEqual(result);
      component.default.vm.arrayResults = [];
    });
  }

  test("button should open export modal", async () => {
    const button = component.default.find(".export-arrays");
    const buttonElement = button.wrapperElement;

    expect(component.default.vm.exportModal).toBeFalsy();

    fillArrayResults(component.default);

    await sleep();

    const clickEvent = new Event("click");
    buttonElement.dispatchEvent(clickEvent);

    expect(component.default.vm.exportModal).toBeTruthy();
    component.default.vm.arrayResults = [];
  });

  test("button should export visualized arrays", async () => {
    // Mock createObjectURL to check for File constructor
    global.URL.createObjectURL = jest.fn((file) => {
      expect(file.constructor.name).toBe("File");
    });

    fillArrayResults(component.default);

    await sleep();

    const exportFileType = component.default.vm.$enums.JSON_FILE_FORMAT;
    component.default.vm.exportArrays(exportFileType);
  });

  test("visualize button should disable interact elements", () => {
    component.default.vm.arrays = {
      1: generateArray(2),
      2: generateArray(2),
    };

    const button = component.default.find(".visualize-arrays");
    const buttonElement = button.wrapperElement;

    let interact = component.default.findAll(".interact");

    for (let element of interact) {
      element = element.wrapperElement;
      expect(element.disabled).toBeFalsy();
    }

    const clickEvent = new Event("click");
    buttonElement.dispatchEvent(clickEvent);

    interact = component.default.findAll(".interact");

    for (let element of interact) {
      element = element.wrapperElement;
      expect(element.disabled).toBeTruthy();
    }

    component.default.vm.arrays = {};
  });
});
