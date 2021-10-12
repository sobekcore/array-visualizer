<template>
  <button class="add-new-array" @click="addNewArray()">
    Add new <b>Array</b>
  </button>
  <main class="arrays">
    <template v-for="array in arrays" :key="array">
      <Array :id="array" @arrayValues="checkArrays($event)" />
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
  position: absolute;
}

.arrays {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding-top: 22px;
}
</style>
