<template>
  <main class="application" role="application">
    <Arrays :load="load" @arrays="prepareArrays($event)" />
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
      load: {},
    };
  },
  methods: {
    prepareArrays(event) {
      if (!event) {
        this.load = {};
        this.arrays = {};
        this.$utility.localStorageSave("arrays", this.arrays);
        return false;
      }

      let id = event.array;
      if (!this.arrays[id]) {
        this.arrays[id] = [];
      }

      if (event.item && event.value) {
        let array = this.arrays[id];
        let iterator = array.entries();
        let alreadyCreated = false;

        for (let [id, value] of iterator) {
          if (value.item === event.item) {
            array[id] = {
              item: event.item,
              value: event.value,
            };
            alreadyCreated = true;
            break;
          }
        }

        if (!alreadyCreated) {
          array.push({
            item: event.item,
            value: event.value,
          });
        }
      }

      this.$utility.localStorageSave("arrays", this.arrays);
    },
    loadArrays() {
      this.load = this.$utility.localStorageGet("arrays");
    },
  },
  mounted() {
    this.loadArrays();
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
