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
    Result Array: {{ arrayResults }}
  </div>
</template>

<script>
export default {
  name: "Visualizer",
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

      let items = 0;
      for (let i = 1; i <= length; i++) {
        items += arrays[i].length;
      }

      // Time to complete calucation is always 2s
      let twoSeconds = this.$utility.getTime("second", 2);
      let itemTimeout = Math.round(twoSeconds / items);

      for (let i = 1; i <= length; i++) {
        setTimeout(() => {
          let array = document.querySelector(`.array-${i}`);
          arrays[i].forEach((item, id) => {
            setTimeout(() => {
              arrays[i][id] = item.value;
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
          compareArrays[i] = arrays[i];
        }, nextArrayTimeout);

        let timeout = arrays[i].length * itemTimeout;
        nextArrayTimeout += timeout;
      }
    },
    disableInteraction(disable = true) {
      let elements = document.querySelectorAll(".interact");
      elements.forEach((element) => {
        element.disabled = disable ? true : false;
      });
    },
    calculateArrays(compareArrays) {
      // Arrays to make calculate
      console.log(
        "%c" + "Arrays to calculate",
        "color: yellow;",
        compareArrays,
        "\n--------------"
      );

      let arrayResult = [];
      arrayResult = compareArrays[1].concat(compareArrays[2]);
      this.arrayResults = arrayResult;

      setTimeout(() => {
        let arrayItems = document.querySelectorAll(".array-item");
        arrayItems.forEach((item) => {
          let classes = item.className;
          item.className = classes.substring(0, classes.lastIndexOf(" ") + 1);
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
