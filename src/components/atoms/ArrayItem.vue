<template>
  <div class="array-item">
    <input
      type="text"
      class="array-input"
      v-model="arrayItemValue"
      @input="returnItemValue($event)"
    />
  </div>
</template>

<script>
export default {
  name: "ArrayItem",
  emits: ["arrayItemValue"],
  props: {
    id: Number,
  },
  data() {
    return {
      arrayItemValue: this.getRandomValue(),
    };
  },
  methods: {
    getRandomValue() {
      return Math.floor(Math.random() * 1000 + 1);
    },
    returnItemValue(event, start = false) {
      this.$emit("arrayItemValue", !start ? event.target.value : event);
    },
  },
  mounted() {
    this.returnItemValue(this.arrayItemValue, true);
  },
};
</script>

<style lang="scss" scoped>
.array-item {
  .array-input {
    width: 100%;
    padding: 4px;
    border-radius: 4px;
    border: 1px solid black;
    background: lightblue;
  }
}
</style>
