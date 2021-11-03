<template>
  <span :class="this.class ? `material-icons ${this.class}` : 'material-icons'">
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
};
</script>
