import { shallowMount } from "@vue/test-utils";
import Guide from "@/components/organisms/Guide.vue";

import configs from "@/assets/configs";

describe("Guide.vue", () => {
  const component = {
    default: shallowMount(Guide),
  };

  const progressGuideFalse = (component) => {
    expect(component.vm.step).toBe(0);

    const progress = component.vm.progressGuide(false);

    expect(component.vm.step).toBe(1);
    expect(progress).toBeFalsy();
  };

  test("component should have properly applied configs", () => {
    const configGuide = configs.guide();
    const steps = configs.steps();
    const { 0: firstStep } = steps;

    expect(component.default.vm.configGuide).toEqual(configGuide);
    expect(component.default.vm.steps).toEqual(steps);
    expect(component.default.vm.content).toBe(firstStep.content);
  });

  test("guide should progress if passing truthy values", () => {
    expect(component.default.vm.step).toBe(0);

    component.default.vm.progressGuide(true);

    expect(component.default.vm.step).toBe(1);
    component.default.vm.step = 0;
  });

  test("guide should close if passing falsy values", () => {
    progressGuideFalse(component.default);
    component.default.vm.step = 0;
  });

  test("closing guide should emit proper values", () => {
    progressGuideFalse(component.default);

    const emitted = component.default.emitted();
    const [emittedArray] = emitted.closed;
    const [emittedValue] = emittedArray;

    expect(emittedValue).toBe(true);
    component.default.vm.step = 0;
  });

  test("guide should create empty polygon on the background", () => {
    const guideModal = component.default.find(".guide-modal");
    const guideModalElement = guideModal.wrapperElement;

    expect(guideModalElement.style.clipPath).toBeFalsy();

    component.default.vm.createModalPolygon({
      target: {
        params: {
          background: guideModalElement,
          target: guideModalElement,
        },
      },
    });

    expect(guideModalElement.style.clipPath).toBeTruthy();
    guideModalElement.style.clipPath = null;
  });
});
