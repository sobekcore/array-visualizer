<template>
  <section class="visualizer">
    <div class="visualizer-header">
      <button class="header-button interact" @click="visualizeArrays()">
        <MaterialIcon class="header-icon" name="visibility" /> Visualize
      </button>
      <Dropdown
        :config="configOperations"
        :title="configOperations[0].name"
        @value="changeOperationType($event)"
      />
      <div class="header-stretch-split"></div>
      <button class="header-button interact" @click="openExportModal()">
        <MaterialIcon class="header-icon" name="download" /> Export
      </button>
      <Modal
        v-if="exportModal"
        title="Export file type"
        :buttons="configVisualizer"
        :bigButtons="true"
        :closeButton="true"
        @result="exportArrays($event)"
      >
      </Modal>
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
import operations from "@/assets/operations.js";
import configs from "@/assets/configs.js";
import Papa from "papaparse";

export default {
  name: "Visualizer",
  components: {
    Array,
    Dropdown,
    MaterialIcon,
    Modal,
  },
  props: {
    arrays: Object,
  },
  data() {
    return {
      arrayResults: [],
      operation: this.$enums.CONCAT_OPERATION,
      configOperations: configs.operations(),
      configVisualizer: configs.visualizer(),
      exportModal: false,
    };
  },
  methods: {
    disableInteraction(disable = true) {
      let elements = document.querySelectorAll(".interact");
      elements.forEach((element) => {
        element.disabled = disable ? true : false;
      });
    },
    visualizeArrays() {
      this.disableInteraction(true);

      let compareArrays = {};
      let arraysChecked = 0;
      let nextArrayTimeout = 0;

      let arrays = this.$utility.toJSON(this.arrays);
      let length = Object.keys(arrays).length;

      if (length === 0) {
        this.disableInteraction(false);
        return false;
      }

      let items = 0;
      for (let i = 1; i <= length; i++) {
        items += arrays[i].length;
      }

      // Time to complete calucation is always ~2s
      let twoSeconds = this.$utility.getTime("second", 2);
      let itemTimeout = Math.round(twoSeconds / items);

      for (let i = 1; i <= length; i++) {
        compareArrays[i] = [];
        if (arrays[i].length > 0) {
          setTimeout(() => {
            let array = document.querySelector(`.array-${i}`);
            array.scrollIntoView({ behavior: "smooth" });

            arrays[i].forEach((item, id) => {
              setTimeout(() => {
                compareArrays[i][id] = item.value;
                let arrayItem = array.querySelector(`.item-${++id}`);
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

          let timeout = arrays[i].length * itemTimeout;
          nextArrayTimeout += timeout;
        } else {
          arraysChecked++;
        }
      }
    },
    calculateArrays(compareArrays) {
      let itemTransitionTime = this.$enums.ITEM_TRANSITION_TIME;
      let arrayTimeout = this.$utility.getTime("second", itemTransitionTime);

      setTimeout(() => {
        this.arrayResults = [];
        let arrayResult = operations.calculate(compareArrays, this.operation);
        this.$nextTick(() => {
          this.arrayResults = arrayResult;
        });
      }, arrayTimeout);

      // Scroll to visualized array after calculations on mobile
      if (window.innerWidth <= this.$enums.SMALL_SIZE_RESPONSIVE) {
        setTimeout(() => {
          let offset = this.$enums.HEADER_HEIGHT;
          let separator = document.querySelector(".separator");
          let { top: height } = separator.getBoundingClientRect();
          let position = height + window.scrollY;

          window.scrollTo({
            top: position - offset,
            behavior: "smooth",
          });
        }, arrayTimeout);
      }

      setTimeout(() => {
        let arrayItems = document.querySelectorAll(".array-item");
        arrayItems.forEach((item) => {
          let classes = item.className;
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
        let exportFileType = event;
        let arrays = this.$utility.toJSON(this.arrayResults);
        let dataToExport = Object.values(arrays);
        let fileBlob, fileName;

        switch (exportFileType) {
          case this.$enums.JSON_FILE_FORMAT:
            fileName = `${configs.application()}-data.json`;
            fileBlob = new File([JSON.stringify(dataToExport)], fileName, {
              type: "application/json",
            });
            break;
          case this.$enums.CSV_FILE_FORMAT:
            fileName = `${configs.application()}-data.csv`;
            fileBlob = new File([Papa.unparse([dataToExport])], fileName, {
              type: "text/csv",
            });
            break;
        }

        if (fileBlob && fileName) {
          let link = document.createElement("a");
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
    }
  }

  .array {
    margin: $ARRAY_GRID_GAP;
  }
}
</style>
