<template>
  <div class="modal-background"></div>
  <div :class="className">
    <div class="modal-header">
      <h2 v-if="title" class="modal-title">{{ title }}</h2>
      <MaterialIcon
        v-if="closeButton"
        class="modal-close"
        name="close"
        @click="closeModal()"
      />
    </div>
    <p v-if="content" class="modal-content" v-html="content"></p>
    <div v-if="buttonsDefinition.length > 0" class="modal-buttons">
      <template v-for="button in buttonsDefinition" :key="button">
        <button
          :class="buttonClass(button.main)"
          @click="processModal(button.value)"
        >
          <MaterialIcon
            v-if="bigButtons"
            class="modal-button-icon"
            :name="button.icon"
          />
          {{ button.label }}
        </button>
      </template>
    </div>
  </div>
</template>

<script>
import MaterialIcon from "@/components/atoms/MaterialIcon";

export default {
  name: "Modal",
  emits: ["result"],
  components: {
    MaterialIcon,
  },
  props: {
    class: String,
    title: String,
    content: String,
    buttons: Array,
    bigButtons: Boolean,
    closeButton: Boolean,
  },
  data() {
    return {
      className: this.class ? `modal-box ${this.class}` : "modal-box",
      buttonsDefinition: this.$utility.oneOfTwo(this.buttons, [
        { label: "Cancel", value: false },
        { label: "Accept", value: true, main: true },
      ]),
    };
  },
  methods: {
    passResult(value) {
      this.$emit("result", value);
    },
    buttonClass(main) {
      let className = this.bigButtons ? "modal-big-button" : "modal-button";
      className += main ? " main-button interact" : " interact";
      return className;
    },
    processModal(value) {
      this.passResult(value);
    },
    closeModal() {
      this.passResult(null);
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-background {
  @include inactive-background(4);
}

.modal-box {
  @include ui-modal;
}
</style>
