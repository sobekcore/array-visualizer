<template>
  <section :class="visual ? 'array' : `array array-${id}`">
    <div class="array-header">
      <h3 class="array-title">
        {{ title }}
      </h3>
      <button
        v-if="!visual"
        class="array-button interact"
        @click="addArrayItem()"
      >
        Add Array Item
      </button>
    </div>
    <div class="array-items">
      <template v-if="prepend">
        <template v-for="item in prepend" :key="item">
          <ArrayItem :visual="visual" :value="item" />
        </template>
      </template>
      <template v-else>
        <template v-for="item in items" :key="item">
          <ArrayItem
            :id="item"
            :visual="visual"
            @arrayItemValue="syncArrays(id, item, $event)"
          />
        </template>
      </template>
    </div>
  </section>
</template>

<script>
import ArrayItem from "@/components/atoms/ArrayItem";

export default {
  name: "Array",
  emits: ["arrayValues"],
  components: {
    ArrayItem,
  },
  props: {
    id: Number,
    title: String,
    visual: Boolean,
    prepend: Array,
  },
  data() {
    return {
      items: 0,
      offset: 0,
    };
  },
  methods: {
    addArrayItem() {
      this.items++;
    },
    syncArrays(array, item, event) {
      this.calculateOffset();
      this.$emit("arrayValues", {
        array: array,
        item: item,
        value: event,
      });
    },
    calculateOffset() {
      if (window.innerWidth > this.$enums.MEDIUM_SIZE_RESPONSIVE) {
        let columns = this.$enums.GRID_COLUMNS_AMOUNT;
        let arrays = document.querySelectorAll(".arrays-display .array");
        let following = columns * (Math.ceil(this.id / columns) - 1) + 1;

        // Skip first grid row (no point to calculate)
        if (following < columns + 1) {
          following = columns + 1;
        }

        for (let id = following; id <= arrays.length; id++) {
          let beforeId = id - columns;
          let arrayBefore = document.querySelector(`.array-${beforeId}`);
          let currentArray = document.querySelector(`.array-${id}`);

          if (arrayBefore && currentArray) {
            let { bottom: start } = arrayBefore.getBoundingClientRect();
            let { top: end } = currentArray.getBoundingClientRect();
            let arrayOffset = start - end + this.$enums.ARRAY_GRID_GAP;

            if (arrayOffset !== 0) {
              let arrayMargin = currentArray.style.marginTop;
              let margin = Number(arrayMargin.slice(0, -2)) + arrayOffset;
              currentArray.style.marginTop = `${margin}px`;
            }
          }
        }
      }
    },
  },
  watch: {
    "$parent.resize"() {
      if (this.$parent.resize) {
        this.calculateOffset();
        this.$parent.resize = false;
      }
    },
  },
  mounted() {
    if (!this.visual) {
      this.calculateOffset();
    }
  },
};
</script>

<style lang="scss" scoped>
.array {
  background: $main-medium-color;
  padding: 14px;

  .array-header {
    display: inline-flex;
    justify-content: space-between;
    background: $main-light-color;
    padding: 12px;
    width: 100%;
    gap: 14px;

    .array-title {
      color: $font-light-color;
      font-style: italic;
      margin: 0;
    }

    .array-button {
      border: none;
      border-radius: 4px;
      background: $main-blue-color;
      color: $font-light-color;
      font-weight: bold;
      cursor: pointer;
    }
  }

  .array-items {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
