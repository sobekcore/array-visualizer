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
    };
  },
  methods: {
    addNewArray() {
      this.arrays++;
    },
    checkArrays(event) {
      this.$emit("arrays", event);
    },
  },
};
</script>

<style lang="scss" scoped>
.arrays {
  max-height: 100vh;
  overflow-y: auto;

  .arrays-header {
    @include ui-header;
  }

  .arrays-display {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: flex-start;
    margin: 14px;
    gap: 14px;
  }
}
</style>
