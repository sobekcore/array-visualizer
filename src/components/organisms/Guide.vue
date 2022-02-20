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
import configs from "@/assets/configs";

export default {
  name: "Guide",
  emits: ["closed"],
  components: {
    Modal,
  },
  data() {
    return {
      configGuide: configs.guide(),
      steps: configs.steps(),
      content: "",
      step: 0,
    };
  },
  methods: {
    progressGuide(event) {
      let config = this.steps[++this.step];

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
      let elements = document.querySelectorAll(className);
      elements.forEach((element) => (element.className += " highlight"));

      if (elements.length === 1) {
        let background = document.querySelector(".modal-background");
        let targetElement = elements[0];

        window.addEventListener("resize", this.createModalPolygon);
        window.params = { background: background, target: targetElement };

        let event = new Event("resize");
        window.dispatchEvent(event);
      }
    },
    createModalPolygon(event) {
      let parent = event.target;
      let background = parent.params.background;
      let target = parent.params.target;

      let { left, top } = target.getBoundingClientRect();
      let bottom = top + target.offsetHeight;
      let right = left + target.offsetWidth;

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
      let highlighted = document.querySelectorAll(".highlight");
      highlighted.forEach((element) => {
        let className = element.className;
        element.className = this.$utility.removeAfterLastChar(className, " ");
      });

      window.removeEventListener("resize", this.createModalPolygon);
      let background = document.querySelector(".modal-background");
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
      let arrays = document.querySelector(".array");
      if (!arrays) {
        let addNewArray = document.querySelector(".add-new-array");
        addNewArray.click();
      }
    },
    addArrayItemIfNotExists() {
      let items = document.querySelector(".array-item");
      if (!items) {
        let addArrayItem = document.querySelector(".add-array-item");
        addArrayItem.click();
      }
    },
    openOperationsDropdown() {
      let dropdown = document.querySelector(".change-operation-type");
      this.stopEventPropagation("clickOnElement", dropdown);
      this.stopEventPropagation("progressOnClickaway");
    },
    prepareGuideLastStep() {
      let buttonsSelector = ".modal-button:not(.main-button)";
      let modalButtons = document.querySelectorAll(buttonsSelector);
      modalButtons.forEach((button) => button.remove());

      let mainModalButton = document.querySelector(".modal-button.main-button");
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
