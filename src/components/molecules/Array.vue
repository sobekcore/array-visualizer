<template>
  <section class="array">
    <div class="array-header">
      <h2 class="array-title">Array #{{ id }}</h2>
      <button class="array-button" @click="addArrayItem()">
        Add Array <b>Item</b>
      </button>
    </div>
    <div class="array-items">
      <template v-for="item in items" :key="item">
        <ArrayItem :id="item" />
      </template>
    </div>
  </section>
</template>

<script>
import ArrayItem from "@/components/atoms/ArrayItem";

export default {
  name: "Array",
  components: {
    ArrayItem,
  },
  props: {
    id: Number,
  },
  data() {
    return {
      items: 0,
    };
  },
  methods: {
    addArrayItem: function () {
      this.items++;
    },
  },
};
</script>

<style lang="scss" scoped>
.array {
  border: 1px solid black;
  background: #eeeeee;
  display: inline-block;
  border-radius: 4px;
  padding: 14px;
  margin: 8px;

  .array-header {
    display: inline-flex;
    justify-content: space-between;
    background: #ddd;
    border-radius: 4px;
    margin-bottom: 14px;
    padding: 12px;
    width: 100%;
    gap: 14px;

    .array-title {
      margin: 0;
    }

    .array-button {
      border-radius: 4px;
      border: 1px solid black;
      background: lightblue;
      cursor: pointer;
    }
  }

  .array-items {
    display: grid;
    gap: 8px;
  }
}
</style>
