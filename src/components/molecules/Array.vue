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
        Add Array <b>Item</b>
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
  border-radius: 8px;
  border: 2px solid black;
  background: #eeeeee;
  padding: 14px;

  .array-header {
    display: inline-flex;
    justify-content: space-between;
    border: 1px solid black;
    border-radius: 4px;
    background: #ddd;
    padding: 12px;
    width: 100%;
    gap: 14px;

    .array-title {
      margin: 0;
    }

    .array-button {
      border-radius: 4px;
      border: 1px solid black;
      background: #9292fa;
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
