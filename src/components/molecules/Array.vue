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
    };
  },
  methods: {
    addArrayItem() {
      this.items++;
    },
    syncArrays(array, item, event) {
      this.$emit("arrayValues", {
        array: array,
        item: item,
        value: event,
      });
    },
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
