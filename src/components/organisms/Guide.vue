<template>
  <Modal
    class="guide-modal"
    title="Array Visualizer guide"
    :content="this.content"
    :buttons="configGuide"
    @result="progressGuide($event)"
  />
</template>

<script>
import Modal from "@/components/molecules/Modal";
import configs from "@/services/configs.js";

export default {
  name: "Guide",
  emits: ["closed"],
  components: {
    Modal,
  },
  data() {
    return {
      configGuide: configs.guide,
      steps: configs.steps,
      content: "",
      step: 0,
    };
  },
  methods: {
    progressGuide(event) {
      const config = this.steps[++this.step];

      if (!event || !config) {
        this.closeGuide();
        return false;
      }

      this.content = config.content;
      this.unhighlightElements();

      if (config.actions) {
        this[config.actions]();
      }

      if (config.elements) {
        this.stopEventPropagation("highlightElements", config.elements);
      }
    },
    closeGuide() {
      delete window.params;
      this.unhighlightElements();
      this.$emit("closed", true);
    },
    stopEventPropagation(func, args) {
      setTimeout(() => this[func](args));
    },
    clickOnElement(element) {
      element.click();
    },
    highlightElements(className) {
      const elements = document.querySelectorAll(className);
      elements.forEach((element) => (element.className += " highlight"));

      if (elements.length === 1) {
        const background = document.querySelector(".modal-background");
        const targetElement = elements[0];

        window.addEventListener("resize", this.createModalPolygon);
        window.params = { background: background, target: targetElement };

        const event = new Event("resize");
        window.dispatchEvent(event);
      }
    },
    createModalPolygon(event) {
      const parent = event.target;
      const background = parent.params.background;
      const target = parent.params.target;

      const { left, top } = target.getBoundingClientRect();
      const bottom = top + target.offsetHeight;
      const right = left + target.offsetWidth;

      let paths = [
        "0 0", // OUTER left-top
        "0 100%", // OUTER left-bottom
        `${left}px 100%`, // left CONNECTOR
        `${left}px ${top}px`, // INNER left-top
        `${right}px ${top}px`, // INNER right-top
        `${right}px ${bottom}px`, // INNER right-bottom
        `${left}px ${bottom}px`, // INNER left-bottom
        `${left}px 100%`, // right CONNECTOR
        "100% 100%", // OUTER right-bottom
        "100% 0", // OUTER right-top
      ];

      // Merge all the paths into a single polygon
      background.style.clipPath = `polygon(${paths.join(", ")})`;
    },
    unhighlightElements() {
      const highlighted = document.querySelectorAll(".highlight");
      highlighted.forEach((element) => {
        const className = element.className;
        element.className = this.$utility.removeAfterLastChar(className, " ");
      });

      window.removeEventListener("resize", this.createModalPolygon);
      const background = document.querySelector(".modal-background");
      if (background) background.style.clipPath = "none";
    },
    progressOnClickaway() {
      document.addEventListener("click", this.checkIfClickOnModal, {
        once: true,
      });
    },
    checkIfClickOnModal(event) {
      if (!event.target.className.includes("modal-button")) {
        this.progressGuide(true);
      }
    },

    // Helper methods for specific steps
    addArrayIfNotExists() {
      if (!document.querySelector(".array")) {
        let addNewArray = document.querySelector(".add-new-array");
        addNewArray.click();
      }
    },
    addArrayItemIfNotExists() {
      if (!document.querySelector(".array-item")) {
        const addArrayItem = document.querySelector(".add-array-item");
        addArrayItem.click();
      }
    },
    openOperationsDropdown() {
      const dropdown = document.querySelector(".change-operation-type");
      this.stopEventPropagation("clickOnElement", dropdown);
      this.stopEventPropagation("progressOnClickaway");
    },
    prepareGuideLastStep() {
      const buttonsSelector = ".modal-button:not(.main-button)";
      const modalButtons = document.querySelectorAll(buttonsSelector);
      modalButtons.forEach((button) => button.remove());

      const mainModalButtonSelector = ".modal-button.main-button";
      const mainModalButton = document.querySelector(mainModalButtonSelector);
      mainModalButton.innerText = "Finish";
    },
  },
  mounted() {
    const { 0: firstStep } = this.steps;
    this.content = firstStep.content;
  },
};
</script>

<style lang="scss">
.highlight {
  box-shadow: inset 0 0 0 2px $main-blue-color, 0 0 20px $main-blue-color !important;
  z-index: 4 !important;
}
</style>
