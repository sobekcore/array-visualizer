<template>
  <Modal
    v-if="exportModal"
    class="export-modal"
    title="Export file type"
    :buttons="configVisualizer"
    :bigButtons="true"
    :closeButton="true"
    @result="exportArrays($event)"
  />
  <section class="visualizer">
    <div class="visualizer-header">
      <button
        class="header-button visualize-arrays interact"
        @click="visualizeArrays()"
      >
        <MaterialIcon class="header-icon" name="visibility" /> Visualize
      </button>
      <Dropdown
        class="change-operation-type"
        :config="configOperations"
        :title="configOperations[0].name"
        @value="changeOperationType($event)"
      />
      <div class="header-stretch-split"></div>
      <button
        class="header-button export-arrays interact"
        @click="openExportModal()"
      >
        <MaterialIcon class="header-icon" name="download" /> Export
      </button>
    </div>
    <template v-if="arrayResults.length > 0">
      <Array :visual="true" :load="arrayResults">Visualized Array</Array>
    </template>
  </section>
</template>

<script>
import Array from "@/components/molecules/Array";
import Dropdown from "@/components/atoms/Dropdown";
import MaterialIcon from "@/components/atoms/MaterialIcon";
import Modal from "@/components/molecules/Modal";
import operations from "@/services/operations.js";
import configs from "@/services/configs.js";
import Papa from "papaparse";

export default {
  name: "Visualizer",
  components: {
    Array,
    Dropdown,
    MaterialIcon,
    Modal,
  },
  computed: {
    arrays() {
      return this.$store.getters.getArrays;
    },
  },
  data() {
    return {
      arrayResults: [],
      operation: this.$enums.CONCAT_OPERATION,
      configOperations: configs.operations,
      configVisualizer: configs.visualizer,
      exportModal: false,
    };
  },
  methods: {
    disableInteraction(disable = true) {
      let elements = document.querySelectorAll(".interact");
      elements.forEach((element) => {
        element.disabled = disable;
      });
    },
    visualizeArrays() {
      this.disableInteraction(true);

      let compareArrays = {};
      let arraysChecked = 0;
      let nextArrayTimeout = 0;

      const arrays = this.$utility.toJSON(this.arrays);
      const length = Object.keys(arrays).length;

      if (length === 0) {
        this.disableInteraction(false);
        return false;
      }

      let items = 0;
      for (let i = 1; i <= length; i++) {
        items += arrays[i].length;
      }

      // Time to complete calculation is always ~2s
      const twoSeconds = this.$utility.getTime("second", 2);
      const itemTimeout = Math.round(twoSeconds / items);

      for (let i = 1; i <= length; i++) {
        compareArrays[i] = [];
        if (arrays[i].length > 0) {
          setTimeout(() => {
            const array = document.querySelector(`.array-${i}`);
            array.scrollIntoView({ behavior: "smooth" });

            arrays[i].forEach((item, id) => {
              setTimeout(() => {
                compareArrays[i][id] = item.value;
                const arrayItem = array.querySelector(`.item-${++id}`);
                arrayItem.className += " included";

                if (id === arrays[i].length) {
                  arraysChecked++;
                  if (arraysChecked === length) {
                    this.calculateArrays(compareArrays);
                  }
                }
              }, id * itemTimeout);
            });
          }, nextArrayTimeout);

          const timeout = arrays[i].length * itemTimeout;
          nextArrayTimeout += timeout;
        } else {
          arraysChecked++;
        }
      }
    },
    calculateArrays(compareArrays) {
      const itemTransitionTime = this.$enums.ITEM_TRANSITION_TIME;
      const arrayTimeout = this.$utility.getTime("second", itemTransitionTime);

      setTimeout(() => {
        this.arrayResults = [];
        const arrayResult = operations.calculate(compareArrays, this.operation);
        this.$nextTick(() => (this.arrayResults = arrayResult));
      }, arrayTimeout);

      // Scroll to visualized array after calculations on mobile
      if (window.innerWidth <= this.$enums.SMALL_SIZE_RESPONSIVE) {
        setTimeout(() => {
          const offset = this.$enums.HEADER_HEIGHT;
          const separator = document.querySelector(".separator");
          const { top: height } = separator.getBoundingClientRect();
          const position = height + window.scrollY;

          window.scrollTo({
            top: position - offset,
            behavior: "smooth",
          });
        }, arrayTimeout);
      }

      setTimeout(() => {
        const arrayItems = document.querySelectorAll(".array-item");
        arrayItems.forEach((item) => {
          const classes = item.className;
          item.className = this.$utility.removeAfterLastChar(classes, " ");
        });
        this.disableInteraction(false);
      }, this.$utility.getTime("second", 2));
    },
    changeOperationType(event) {
      this.operation = event;
    },
    openExportModal() {
      if (this.arrayResults.length > 0) {
        this.exportModal = true;
      }
    },
    exportArrays(event) {
      this.exportModal = false;
      if (this.arrayResults.length > 0 && event) {
        const exportFileType = event;
        const arrays = this.$utility.toJSON(this.arrayResults);
        const dataToExport = Object.values(arrays);
        let fileBlob, fileName;

        switch (exportFileType) {
          case this.$enums.JSON_FILE_FORMAT:
            fileName = `${configs.application}-data.json`;
            fileBlob = new File([JSON.stringify(dataToExport)], fileName, {
              type: "application/json",
            });
            break;
          case this.$enums.CSV_FILE_FORMAT:
            fileName = `${configs.application}-data.csv`;
            fileBlob = new File([Papa.unparse([dataToExport])], fileName, {
              type: "text/csv",
            });
            break;
        }

        if (fileBlob && fileName) {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(fileBlob);
          link.download = fileName;
          link.click();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.visualizer {
  @include ui-section;

  .visualizer-header {
    @include ui-header;

    @media (max-width: $SMALL_SIZE_RESPONSIVE) {
      top: initial;
      position: fixed;
      height: inherit;
      bottom: 0;

      .header-button {
        font-size: 0;
        gap: 0;
      }
    }
  }

  .array {
    margin: $ARRAY_GRID_GAP;
  }
}
</style>
