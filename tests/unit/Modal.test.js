import { shallowMount } from "@vue/test-utils";
import Modal from "@/components/molecules/Modal.vue";

import configs from "@/assets/configs";

describe("Modal.vue", () => {
  const configGuide = configs.guide();

  const component = {
    default: shallowMount(Modal, {
      props: {
        class: "modal",
        title: "Modal",
        content: "Modal content",
        buttons: configGuide,
      },
    }),

    closable: shallowMount(Modal, {
      props: {
        class: "modal",
        buttons: configGuide,
        closeButton: true,
      },
    }),

    bigButtons: shallowMount(Modal, {
      props: {
        class: "modal",
        buttons: configGuide,
        bigButtons: true,
      },
    }),
  };

  test("modal should have close button if in closable mode", () => {
    const closeButton = component.closable.find(".modal-close");
    const closeButtonElement = closeButton.wrapperElement;
    expect(closeButtonElement).toBeTruthy();
  });

  test("modal should display title if passed", () => {
    const modalContent = component.default.find(".modal-title");
    const modalContentElement = modalContent.wrapperElement;
    expect(modalContentElement).toBeTruthy();
  });

  test("modal should display content if passed", () => {
    const modalContent = component.default.find(".modal-content");
    const modalContentElement = modalContent.wrapperElement;
    expect(modalContentElement).toBeTruthy();
  });

  test("buttons should be displayed if definiton is passed", () => {
    const modalButtons = component.default.find(".modal-buttons");
    const modalButtonsElement = modalButtons.wrapperElement;
    expect(modalButtonsElement).toBeTruthy();
  });

  test("big buttons should be enabled if in big button mode", () => {
    const modalButtonIcon = component.bigButtons.find(".modal-button-icon");
    const modalButtonIconElement = modalButtonIcon.wrapperElement;
    expect(modalButtonIconElement).toBeTruthy();
  });

  test("modal should properly emit its value", () => {
    const modalButton = component.default.find(".modal-button");
    const modalButtonElement = modalButton.wrapperElement;

    let clickEvent = new Event("click");
    modalButtonElement.dispatchEvent(clickEvent);

    const emitted = component.default.emitted();
    const [emittedArray] = emitted.result;
    const [emittedValue] = emittedArray;

    expect(emittedValue).toBeDefined();
  });
});
