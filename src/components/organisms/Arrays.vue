<template>
  <section class="arrays">
    <div class="arrays-header">
      <button class="add-new-array interact" @click="addNewArray()">
        Add new Array
      </button>
    </div>
    <div class="arrays-display">
      <template v-for="array in arrays" :key="array">
        <Array
          :id="array"
          :title="`Array #${array}`"
          @arrayValues="checkArrays($event)"
        />
      </template>
    </div>
  </section>
</template>

<script>
import Array from "@/components/molecules/Array";

export default {
  name: "Arrays",
  emits: ["arrays"],
  components: {
    Array,
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
  },
  mounted() {
    this.$utility.debounce("resize", this.resizeArrays, 100);
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
