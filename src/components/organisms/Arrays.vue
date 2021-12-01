<template>
  <section class="arrays">
    <div class="arrays-header">
      <button
        class="header-button add-new-array interact"
        @click="addNewArray()"
      >
        <MaterialIcon class="header-icon" name="add_box" /> Add new Array
      </button>
      <button
        class="header-button remove-arrays interact"
        @click="removeArrays()"
      >
        <MaterialIcon class="header-icon" name="delete" /> Remove
      </button>
      <div class="header-stretch-split"></div>
      <button
        class="header-button import-arrays interact"
        @click="importArrays()"
      >
        <input class="import-arrays-file" type="file" @click.stop />
        <MaterialIcon class="header-icon" name="upload" /> Import
      </button>
    </div>
    <div v-if="arrays > 0" class="arrays-display">
      <template v-for="array in arrays" :key="array">
        <Array
          :id="array"
          :load="load[array]"
          @arrayValues="checkArrays($event)"
        >
          Array #{{ array }}
        </Array>
      </template>
    </div>
  </section>
</template>

<script>
import Array from "@/components/molecules/Array";
import MaterialIcon from "@/components/atoms/MaterialIcon";
import operations from "@/assets/operations.js";
import configs from "@/assets/configs.js";
import debounce from "lodash.debounce";

export default {
  name: "Arrays",
  emits: ["arrays"],
  components: {
    Array,
    MaterialIcon,
  },
  props: {
    load: Object,
  },
  data() {
    return {
      arrays: 0,
      width: window.innerWidth,
      resize: false,
    };
  },
  methods: {
    addNewArray() {
      this.arrays++;
      this.checkArrays({ array: this.arrays });
    },
    checkArrays(event) {
      this.$emit("arrays", event);
    },
    resizeArrays() {
      let screen = window.innerWidth;
      let size = this.$enums.MEDIUM_SIZE_RESPONSIVE;
      this.resize = screen > size && this.width <= size ? true : false;
      this.width = screen;
    },
    removeArrays() {
      let message = "Do you want to remove all the arrays?";
      if (this.arrays > 0 && confirm(message)) {
        this.arrays = 0;
        this.checkArrays(null);
      }
    },
    loadArrays(arrays) {
      this.arrays = 0;
      let length = Object.keys(arrays).length;
      for (let i = 1; i <= length; i++) {
        this.addNewArray();
      }
    },
    importArrays() {
      let importArrays = document.querySelector(".import-arrays-file");
      importArrays.click();

      importArrays.addEventListener("change", this.loadFile, {
        once: true,
      });
    },
    loadFile(event) {
      let promise = this.readFromFile(event);

      promise.then((result) => {
        this.checkArrays({
          arrays: result,
          import: true,
        });
      });

      promise.then(() => {
        event.target.value = null;
      });
    },
    readFromFile(event) {
      return new Promise((resolve, reject) => {
        let file = event.target.files[0];
        let fileFormats = configs.acceptedFileFormats();
        let type = file.type.split("/")[1];

        if (!fileFormats.includes(type)) {
          reject("Unsupported file format.");
        }

        const reader = new FileReader();
        reader.readAsText(file);

        reader.onload = () => {
          let preparedResult = operations.process(reader.result, type);
          resolve(preparedResult);
        };

        reader.onerror = () => {
          alert(reader.error.message);
          reject(reader.error.message);
        };
      });
    },
  },
  watch: {
    load() {
      this.loadArrays(this.load);
    },
  },
  mounted() {
    window.addEventListener("resize", debounce(this.resizeArrays, 100));
  },
};
</script>

<style lang="scss" scoped>
.arrays {
  @include ui-section;

  .arrays-header {
    @include ui-header;

    @media (max-width: $SMALL_SIZE_RESPONSIVE) {
      position: fixed;
      height: inherit;
    }

    .import-arrays-file {
      display: none;
    }
  }

  .arrays-display {
    display: grid;
    grid-template-columns: repeat($GRID_COLUMNS_AMOUNT, 1fr);
    align-items: flex-start;
    margin: $ARRAY_GRID_GAP;
    gap: $ARRAY_GRID_GAP;

    @media (max-width: $MEDIUM_SIZE_RESPONSIVE) {
      grid-template-columns: 1fr;

      .array {
        margin-top: 0 !important;

        &:first-child {
          @media (max-width: $SMALL_SIZE_RESPONSIVE) {
            margin-top: $HEADER_HEIGHT !important;
          }
        }
      }
    }
  }
}
</style>
