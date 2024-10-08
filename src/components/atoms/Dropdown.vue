<template>
  <div ref="dropdown" :class="className" @click="toggleDropdown($event)">
    <button :class="active ? 'dropdown-button active' : 'dropdown-button'">
      <span class="dropdown-value">{{ text }}</span>
      <MaterialIcon class="dropdown-icon" name="arrow_drop_down" />
    </button>
    <ul role="listbox" class="dropdown-list" v-if="active">
      <li
        role="option"
        class="dropdown-item"
        :data-name="option.name"
        :data-value="option.value"
        v-for="option in config"
        :key="option"
      >
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import MaterialIcon from "@/components/atoms/MaterialIcon";

export default {
  name: "Dropdown",
  emits: ["value"],
  components: {
    MaterialIcon,
  },
  props: {
    class: String,
    config: Array,
    title: String,
  },
  data() {
    return {
      text: this.title,
      className: this.class
        ? `dropdown interact ${this.class}`
        : "dropdown interact",
      active: false,
    };
  },
  methods: {
    toggleDropdown(event) {
      const dropdown = this.$refs.dropdown;
      if (!dropdown.disabled) {
        this.active = !this.active;
        this.setDropdownValues(event);
      }
    },
    setDropdownValues(event) {
      const value = event.target.getAttribute("data-value");
      const name = event.target.getAttribute("data-name");
      if (value && name) {
        this.text = name;
        this.$emit("value", value);
      }
    },
    watchClickaway() {
      const dropdown = this.$refs.dropdown;
      document.addEventListener("click", (event) => {
        if (!dropdown.contains(event.target)) {
          this.active = false;
        }
      });
    },
  },
  mounted() {
    this.watchClickaway();
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  @include ui-dropdown;

  .dropdown-list {
    @media (max-width: $SMALL_SIZE_RESPONSIVE) {
      @include dropdown-transform(true);
      margin-top: -$HEADER_HEIGHT;
    }
  }
}
</style>
