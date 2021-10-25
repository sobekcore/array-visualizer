<template>
  <button class="add-new-array interact" @click="addNewArray()">
    Add new <b>Array</b>
  </button>
  <main class="arrays">
    <template v-for="array in arrays" :key="array">
      <Array
        :id="array"
        :title="`Array #${array}`"
        @arrayValues="checkArrays($event)"
      />
    </template>
  </main>
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
.add-new-array {
  position: fixed;
  border: 2px solid black;
  box-shadow: 2px 0 12px black;
  height: 44px;
  width: 50%;
  top: 0;
  left: 0;
  transition: background 0.2s ease-out;

  &:hover {
    background: #9292fa;
    cursor: pointer;
  }
}

.arrays {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: flex-start;
  padding-top: 44px;
  margin: 14px;
  gap: 14px;
}
</style>
