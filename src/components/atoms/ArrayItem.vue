<template>
  <div class="array-item">Array Item #{{ id }}</div>
</template>

<script>
export default {
  name: "ArrayItem",
  props: {
    id: Number,
  },
};
</script>

<style lang="scss" scoped>
.array-item {
  border: 1px solid black;
  background: lightblue;
  border-radius: 4px;
  padding: 4px;
}
</style>
