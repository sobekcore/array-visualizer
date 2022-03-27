<template>
  <Guide v-if="guide" @closed="loadGuide($event)" />
  <main class="application" role="application">
    <Arrays />
    <div class="separator"></div>
    <Visualizer />
    <div class="background"></div>
  </main>
</template>

<script>
import Arrays from "@/components/organisms/Arrays";
import Visualizer from "@/components/organisms/Visualizer";
import Guide from "@/components/organisms/Guide";

export default {
  name: "app",
  components: {
    Arrays,
    Visualizer,
    Guide,
  },
  computed: {
    arrays() {
      return this.$store.getters.getArrays;
    },
    guide() {
      return this.$store.getters.getGuide;
    },
  },
  methods: {
    loadGuide(closed) {
      this.$store.dispatch("loadGuideAction", closed);
    },
  },
  mounted() {
    this.loadGuide();
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
