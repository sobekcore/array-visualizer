<template>
  <main class="application" role="application">
    <Arrays @arrays="prepareArrays($event)" />
    <div class="separator"></div>
    <Visualizer :arrays="arrays" />
  </main>
</template>

<script>
import Arrays from "@/components/organisms/Arrays";
import Visualizer from "@/components/organisms/Visualizer";

export default {
  name: "app",
  components: {
    Arrays,
    Visualizer,
  },
  data() {
    return {
      arrays: {},
    };
  },
  methods: {
    prepareArrays(event) {
      let id = event.array;
      if (!this.arrays[id]) {
        this.arrays[id] = [];
      }

      let array = this.arrays[id];
      let alreadyCreated = false;
      let i = 0;

      for (let value of array) {
        if (value.item === event.item) {
          array[i] = {
            item: event.item,
            value: event.value,
          };
          alreadyCreated = true;
          break;
        }
        i++;
      }

      if (!alreadyCreated) {
        array.push({
          item: event.item,
          value: event.value,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.application {
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  grid-template-rows: 1fr;
  min-height: 100vh;

  @media (max-width: $SMALL_SIZE_RESPONSIVE) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1px auto;
  }

  .separator {
    background: $main-light-color;
    height: 100%;
    width: 100%;
  }
}
</style>
