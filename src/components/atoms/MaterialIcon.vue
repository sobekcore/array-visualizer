<template>
  <span ref="icon" :class="className">
    {{ name }}
  </span>
</template>

<script>
export default {
  name: "MaterialIcon",
  props: {
    class: String,
    name: String,
  },
  data() {
    return {
      className: this.class ? `material-icons ${this.class}` : "material-icons",
    };
  },
  methods: {
    showIconsAfterLoad() {
      if (document.readyState !== "complete") {
        const icon = this.$refs.icon;
        icon.className += " hide-icon";
        window.addEventListener("load", this.makeIconsVisible, { once: true });
      }
    },
    makeIconsVisible() {
      const icon = this.$refs.icon;
      const className = icon.className;
      icon.className = this.$utility.removeAfterLastChar(className, " ");
    },
  },
  mounted() {
    this.showIconsAfterLoad();
  },
};
</script>
