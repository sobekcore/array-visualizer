import { shallowMount } from "@vue/test-utils";
import MaterialIcon from "@/components/atoms/MaterialIcon.vue";

describe("MaterialIcon.vue", () => {
  const component = {
    default: shallowMount(MaterialIcon, {
      props: {
        class: "icon",
        name: "info",
      },
    }),
  };

  test("icon should show after document load", async () => {
    const icon = component.default.find(".icon");
    const iconElement = icon.wrapperElement;

    let loadEvent = new Event("load");
    window.dispatchEvent(loadEvent);

    await component.default.vm.$nextTick();

    const hasHideIcon = iconElement.className.includes("hide-icon");
    expect(hasHideIcon).toBeFalsy();
  });
});
