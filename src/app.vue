<template>
  <Guide v-if="guide" @closed="loadGuide($event)" />
  <main class="application" role="application">
    <Arrays :load="load" @arrays="prepareArrays($event)" />
    <div class="separator"></div>
    <Visualizer :arrays="arrays" />
    <div class="background"></div>
  </main>
</template>

<script>
import Arrays from "@/components/organisms/Arrays";
import Visualizer from "@/components/organisms/Visualizer";
import Guide from "@/components/organisms/Guide";
import configs from "@/assets/configs.js";

export default {
  name: "app",
  components: {
    Arrays,
    Visualizer,
    Guide,
  },
  data() {
    return {
      application: configs.application(),
      guide: false,
      arrays: {},
      load: {},
    };
  },
  methods: {
    loadGuide(closed) {
      let cookieName = `${this.application}-guide`;
      let guide = this.$utility.cookieGet(cookieName);
      let showGuide = false;

      if (closed) {
        this.$utility.cookieSave(cookieName, false, 30);
      } else if (!guide) {
        showGuide = true;
      }

      this.guide = showGuide;
    },
    prepareArrays(event) {
      let alreadyComputed = false;

      if (!event || event.import) {
        this.load = {};
        this.arrays = {};
        alreadyComputed = true;
      }

      if (event && event.import) {
        this.$nextTick(() => {
          this.load = event.arrays;
        });
      }

      if (!alreadyComputed) {
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
      }

      this.$utility.localStorageSave(this.application, this.arrays);
    },
    loadArrays() {
      this.load = this.$utility.localStorageGet(this.application);
    },
  },
  mounted() {
    this.loadGuide();
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
    padding-bottom: $HEADER_HEIGHT;
  }

  .separator {
    background: $main-light-color;
    height: 100%;
    width: 100%;
  }

  .background {
    $gradient: to bottom, $main-dark-color 25%, rgba($main-dark-color, 0) 125%;
    background: linear-gradient($gradient), url("~@/assets/pattern.png");
    opacity: 0.06;
    position: fixed;
    min-height: 100%;
    width: 100%;
    z-index: -1;
  }
}
</style>
