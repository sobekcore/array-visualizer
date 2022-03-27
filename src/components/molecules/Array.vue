<template>
  <section :class="visual ? 'array' : `array array-${id}`">
    <div class="array-header">
      <h3 class="array-title">
        <slot></slot>
      </h3>
      <button
        v-if="!visual"
        class="array-button add-array-item interact"
        @click="addArrayItem()"
      >
        Add Array Item
      </button>
    </div>
    <div class="array-items">
      <template v-for="(item, count) in load" :key="++count">
        <ArrayItem
          :id="count"
          :visual="visual"
          :value="$utility.oneOfTwo(item.value, item)"
          @arrayItemValue="syncArrays(id, count, $event)"
        />
      </template>
      <template v-for="item in items" :key="item + populated">
        <ArrayItem
          :id="item + populated"
          :visual="visual"
          @arrayItemValue="syncArrays(id, item + populated, $event)"
        />
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
    load: Array,
  },
  data() {
    return {
      items: 0,
      offset: 0,
      populated: this.load ? this.load.length : 0,
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
        const columns = this.$enums.GRID_COLUMNS_AMOUNT;
        const arrays = document.querySelectorAll(".arrays-display .array");
        let following = columns * (Math.ceil(this.id / columns) - 1) + 1;

        // Skip first grid row (no point to calculate)
        if (following < columns + 1) {
          following = columns + 1;
        }

        for (let id = following; id <= arrays.length; id++) {
          const beforeId = id - columns;
          const arrayBefore = document.querySelector(`.array-${beforeId}`);
          const currentArray = document.querySelector(`.array-${id}`);

          if (arrayBefore && currentArray) {
            const { bottom: start } = arrayBefore.getBoundingClientRect();
            const { top: end } = currentArray.getBoundingClientRect();
            const arrayOffset = start - end + this.$enums.ARRAY_GRID_GAP;

            if (arrayOffset !== 0) {
              const arrayMargin = currentArray.style.marginTop;
              const margin = Number(arrayMargin.slice(0, -2)) + arrayOffset;
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
      @include typography-title(18px);
      color: $font-light-color;
      margin: 0;
    }

    .array-button {
      @include ui-button;
    }
  }

  .array-items {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
