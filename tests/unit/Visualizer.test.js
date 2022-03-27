import { shallowMount } from "@vue/test-utils";
import { sleep } from "./mocks/Time.mock";
import { generateArray, generateCompareArrays } from "./mocks/Arrays.mock";
import Visualizer from "@/components/organisms/Visualizer.vue";

import configs from "@/services/configs";
import operations from "@/services/operations";

describe("Visualizer.vue", () => {
  const COMPARE_ARRAYS_LENGTH = 2;
  const COMPARE_ARRAYS_IITEMS = 2;

  const configOperations = configs.operations;

  const component = {
    loaded: shallowMount(Visualizer, {
      attachTo: document.body,
      props: {
        arrays: {
          1: generateArray(2),
          2: generateArray(2),
        },
      },
    }),
  };

  const fillArrayResults = (component) => {
    component.vm.$enums.ITEM_TRANSITION_TIME = 0;

    const compareArrays = generateCompareArrays(
      COMPARE_ARRAYS_LENGTH,
      COMPARE_ARRAYS_IITEMS
    );

    component.vm.calculateArrays(compareArrays);
    component.vm.$enums.ITEM_TRANSITION_TIME = 0.25;

    return compareArrays;
  };

  for (let option of configOperations) {
    test(`calculate compared arrays - ${option.name}`, async () => {
      expect(component.loaded.vm.arrayResults.length).toBe(0);

      component.loaded.vm.operation = option.value;
      const compareArrays = fillArrayResults(component.loaded);

      await sleep();

      const result = operations.calculate(compareArrays, option.value);

      expect(component.loaded.vm.arrayResults).toEqual(result);
      component.loaded.vm.arrayResults = [];
    });
  }

  test("button should open export modal", async () => {
    const button = component.loaded.find(".export-arrays");
    const buttonElement = button.wrapperElement;

    expect(component.loaded.vm.exportModal).toBeFalsy();

    fillArrayResults(component.loaded);

    await sleep();

    const clickEvent = new Event("click");
    buttonElement.dispatchEvent(clickEvent);

    expect(component.loaded.vm.exportModal).toBeTruthy();
    component.loaded.vm.arrayResults = [];
  });

  test("button should export visualized arrays", async () => {
    // Mock createObjectURL to check for File constructor
    global.URL.createObjectURL = jest.fn((file) => {
      expect(file.constructor.name).toBe("File");
    });

    fillArrayResults(component.loaded);

    await sleep();

    const exportFileType = component.loaded.vm.$enums.JSON_FILE_FORMAT;
    component.loaded.vm.exportArrays(exportFileType);
  });

  test("visualize button should disable interact elements", () => {
    const button = component.loaded.find(".visualize-arrays");
    const buttonElement = button.wrapperElement;

    let interact = component.loaded.findAll(".interact");

    for (let element of interact) {
      element = element.wrapperElement;
      expect(element.disabled).toBeFalsy();
    }

    const clickEvent = new Event("click");
    buttonElement.dispatchEvent(clickEvent);

    interact = component.loaded.findAll(".interact");

    for (let element of interact) {
      element = element.wrapperElement;
      expect(element.disabled).toBeTruthy();
    }
  });
});
