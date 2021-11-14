<template>
  <section class="visualizer">
    <div class="visualizer-header">
      <button class="header-button interact" @click="visualizeArrays()">
        <MaterialIcon class="header-icon" name="visibility" /> Visualize
      </button>
      <Dropdown
        :config="config"
        :title="config[0].name"
        @value="changeOperationType($event)"
      />
      <div class="header-stretch-split"></div>
      <button class="header-button interact">
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
import operations from "@/assets/operations.js";
import configs from "@/assets/configs.js";

export default {
  name: "Visualizer",
  components: {
    Array,
    Dropdown,
    MaterialIcon,
  },
  props: {
    arrays: Object,
  },
  data() {
    return {
      arrayResults: [],
      operation: this.$enums.CONCAT_OPERATION,
      config: configs.operations(),
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
      // Arrays to make calculations
      console.log(
        "%c" + "Arrays to calculate",
        "color: yellow;",
        compareArrays,
        "\n--------------"
      );

      let itemTransitionTime = this.$enums.ITEM_TRANSITION_TIME;
      let arrayTimeout = this.$utility.getTime("second", itemTransitionTime);

      setTimeout(() => {
        let arrayResult = operations.calculate(compareArrays, this.operation);
        this.arrayResults = arrayResult;
      }, arrayTimeout);

      setTimeout(() => {
        let visualizerHeader = document.querySelector(".visualizer-header");
        visualizerHeader.scrollIntoView({ behavior: "smooth" });
      }, arrayTimeout);

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
  },
};
</script>

<style lang="scss" scoped>
.visualizer {
  @include ui-section;

  .visualizer-header {
    @include ui-header;
  }

  .array {
    margin: $ARRAY_GRID_GAP;
  }
}
</style>
