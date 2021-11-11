<template>
  <section class="arrays">
    <div class="arrays-header">
      <button class="header-button interact" @click="addNewArray()">
        <MaterialIcon class="header-icon" name="add_box" /> Add new Array
      </button>
      <button class="header-button interact" @click="removeArrays()">
        <MaterialIcon class="header-icon" name="delete" /> Remove
      </button>
      <div class="header-stretch-split"></div>
      <button class="header-button interact">
        <MaterialIcon class="header-icon" name="upload" /> Import
      </button>
    </div>
    <div class="arrays-display">
      <template v-for="array in arrays" :key="array">
        <Array
          :id="array"
          :load="load[array]"
          @arrayValues="checkArrays($event)"
        >
          Array #{{ array }}
        </Array>
      </template>
    </div>
  </section>
</template>

<script>
import Array from "@/components/molecules/Array";
import MaterialIcon from "@/components/atoms/MaterialIcon";

export default {
  name: "Arrays",
  emits: ["arrays"],
  components: {
    Array,
    MaterialIcon,
  },
  props: {
    load: Object,
  },
  data() {
    return {
      arrays: 0,
      width: window.innerWidth,
      resize: false,
    };
  },
  methods: {
    addNewArray() {
      this.arrays++;
      this.checkArrays({ array: this.arrays });
    },
    checkArrays(event) {
      this.$emit("arrays", event);
    },
    resizeArrays() {
      let screen = window.innerWidth;
      let size = this.$enums.MEDIUM_SIZE_RESPONSIVE;
      this.resize = screen > size && this.width <= size ? true : false;
      this.width = screen;
    },
    removeArrays() {
      let message = "Do you want to remove all the arrays?";
      if (this.arrays > 0 && confirm(message)) {
        this.arrays = 0;
        this.checkArrays(null);
      }
    },
    loadArrays(arrays) {
      let length = Object.keys(arrays).length;
      for (let i = 1; i <= length; i++) {
        this.addNewArray();
      }
    },
  },
  mounted() {
    this.$utility.debounce("resize", this.resizeArrays, 100);
    this.$nextTick(() => this.loadArrays(this.load));
  },
};
</script>

<style lang="scss" scoped>
.arrays {
  @include ui-section;

  .arrays-header {
    @include ui-header;
  }

  .arrays-display {
    display: grid;
    grid-template-columns: repeat($GRID_COLUMNS_AMOUNT, 1fr);
    align-items: flex-start;
    margin: $ARRAY_GRID_GAP;
    gap: $ARRAY_GRID_GAP;

    @media (max-width: $MEDIUM_SIZE_RESPONSIVE) {
      grid-template-columns: 1fr;

      .array {
        margin-top: 0 !important;
      }
    }
  }
}
</style>
