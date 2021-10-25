<template>
  <div :class="generateItemClass(elements.item)">
    <input
      type="text"
      :class="generateItemClass(elements.input)"
      v-model="arrayItemValue"
      @input="returnItemValue($event)"
      :disabled="visual"
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
    visual: Boolean,
    value: String,
  },
  data() {
    return {
      elements: {
        item: "item",
        input: "input",
      },
      arrayItemValue: this.$utility.oneOfTwo(this.value, this.getRandomValue()),
    };
  },
  methods: {
    generateItemClass(element) {
      let type = this.visual ? "visual" : "array";
      let className;

      switch (element) {
        case this.elements.item:
          className = `${type}-item` + (!this.visual ? ` item-${this.id}` : "");
          break;
        case this.elements.input:
          className = `${type}-input` + (!this.visual ? " interact" : "");
          break;
      }

      return className;
    },
    getRandomValue() {
      return String(Math.floor(Math.random() * 1000 + 1));
    },
    returnItemValue(event, start = false) {
      this.$emit("arrayItemValue", !start ? event.target.value : event);
    },
  },
  mounted() {
    if (!this.visual) {
      this.returnItemValue(this.arrayItemValue, true);
    }
  },
};
</script>

<style lang="scss" scoped>
.array-item,
.visual-item {
  display: flex;
  $ITEM_TRANSITION_TIME: 0.25s;

  .item-marker {
    width: 20px;
    border-radius: 0 4px 4px 0;
    border: 1px solid black;
    background: #9292fa;
  }

  .array-input,
  .visual-input {
    width: 100%;
    padding: 4px;
    border-radius: 4px 0 0 4px;
    border: 1px solid black;
    border-right: none;
    background: #ddd;
    transition: background $ITEM_TRANSITION_TIME ease-in-out;

    &[disabled] {
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
