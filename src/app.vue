<template>
  <Arrays @arrays="prepareArrays($event)" />
</template>

<script>
import Arrays from "@/components/organisms/Arrays";

export default {
  name: "app",
  components: {
    Arrays,
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

      // Properly emitting all the arrays
      console.log(this.arrays);
    },
  },
};
</script>
