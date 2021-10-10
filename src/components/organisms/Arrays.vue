<template>
  <button class="add-new-array" @click="addNewArray()">
    Add new <b>Array</b>
  </button>
  <main class="arrays">
    <template v-for="array in arrays" :key="array">
      <Array :id="array" />
    </template>
  </main>
</template>

<script>
import Array from "@/components/molecules/Array";

export default {
  name: "Arrays",
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
