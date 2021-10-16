<template>
  <div :class="`array-item item-${id}`">
    <input
      type="text"
      class="array-input interact"
      v-model="arrayItemValue"
      @input="returnItemValue($event)"
    />
    <div class="item-marker"></div>
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
      return String(Math.floor(Math.random() * 1000 + 1));
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
  display: flex;

  .item-marker {
    width: 20px;
    border-radius: 0 4px 4px 0;
    border: 1px solid black;
    background: #9292fa;
  }

  .array-input {
    width: 100%;
    padding: 4px;
    border-radius: 4px 0 0 4px;
    border: 1px solid black;
    border-right: none;
    background: #ddd;

    &.interact[disabled] {
      color: initial;
    }
  }

  &.included {
    .array-input {
      background: #9292fa;
    }
  }

  &:first-child {
    margin-top: 14px;
  }
}
</style>
