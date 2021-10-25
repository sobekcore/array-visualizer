<template>
  <div>
    <h2>Visualizer</h2>
    <button
      type="button"
      class="visualize-arrays interact"
      @click="visualizeArrays()"
    >
      Visualize
    </button>
    <template v-if="arrayResults.length > 0">
      <Array :visual="true" title="Visualized Array" :prepend="arrayResults" />
    </template>
  </div>
</template>

<script>
import Array from "@/components/molecules/Array";

export default {
  name: "Visualizer",
  components: {
    Array,
  },
  props: {
    arrays: Object,
  },
  data() {
    return {
      arrayResults: [],
    };
  },
  methods: {
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

      for (let i = 1; i <= Object.keys(arrays)[length - 1]; i++) {
        if (!arrays[i]) {
          arrays[i] = [];
          length++;
        }
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
    disableInteraction(disable = true) {
      let elements = document.querySelectorAll(".interact");
      elements.forEach((element) => {
        element.disabled = disable ? true : false;
      });
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

      setTimeout(() => {
        let arrayResult = [].concat(...Object.values(compareArrays));
        this.arrayResults = arrayResult;
      }, this.$utility.getTime("second", itemTransitionTime));

      setTimeout(() => {
        let arrayItems = document.querySelectorAll(".array-item");
        arrayItems.forEach((item) => {
          let classes = item.className;
          item.className = this.$utility.removeAfterLastChar(classes, " ");
        });
        this.disableInteraction(false);
      }, this.$utility.getTime("second", 2));
    },
  },
};
</script>

<style lang="scss" scoped>
.visualize-arrays {
  position: fixed;
  border: 2px solid black;
  box-shadow: 2px 0 12px black;
  height: 44px;
  width: 50%;
  top: 0;
  left: 50%;
  transition: background 0.2s ease-out;

  &:hover {
    background: #9292fa;
    cursor: pointer;
  }
}
</style>
