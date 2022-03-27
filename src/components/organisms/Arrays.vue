<template>
  <Modal
    v-if="informationModal"
    class="information-modal"
    title="Array Visualizer"
    :content="informationConfig"
    :buttons="[]"
    :closeButton="true"
    @result="closeApplicationInfo($event)"
  />
  <section class="arrays">
    <div class="arrays-header">
      <button
        class="header-button application-info interact"
        @click="openApplicationInfo()"
      >
        <MaterialIcon class="header-icon" name="info" />
      </button>
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
import Modal from "@/components/molecules/Modal";
import operations from "@/services/operations.js";
import configs from "@/services/configs.js";
import debounce from "lodash.debounce";

export default {
  name: "Arrays",
  emits: ["arrays"],
  components: {
    Array,
    MaterialIcon,
    Modal,
  },
  computed: {
    load() {
      return this.$store.getters.getLoaded;
    },
  },
  data() {
    return {
      arrays: 0,
      width: window.innerWidth,
      informationConfig: configs.information,
      informationModal: false,
      resize: false,
    };
  },
  methods: {
    checkArrays(event) {
      this.$store.dispatch("prepareArraysAction", event);
    },
    addNewArray() {
      this.arrays++;
      this.checkArrays({ array: this.arrays });
    },
    resizeArrays() {
      const screen = window.innerWidth;
      const size = this.$enums.MEDIUM_SIZE_RESPONSIVE;
      this.resize = screen > size && this.width <= size;
      this.width = screen;
    },
    removeArrays() {
      const message = "Do you want to remove all the arrays?";
      if (this.arrays > 0 && confirm(message)) {
        this.arrays = 0;
        this.checkArrays(null);
      }
    },
    loadArrays(arrays) {
      this.arrays = 0;
      const length = Object.keys(arrays).length;
      for (let i = 1; i <= length; i++) {
        this.addNewArray();
      }
    },
    importArrays() {
      const importArrays = document.querySelector(".import-arrays-file");
      importArrays.click();

      importArrays.addEventListener("change", this.loadFile, {
        once: true,
      });
    },
    loadFile(event) {
      const promise = this.readFromFile(event);

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
        const file = event.target.files[0];
        const fileFormats = configs.acceptedFileFormats;
        const type = file.type.split("/")[1];

        if (!fileFormats.includes(type)) {
          reject("Unsupported file format.");
        }

        const reader = new FileReader();
        reader.readAsText(file);

        reader.onload = () => {
          const preparedResult = operations.process(reader.result, type);
          resolve(preparedResult);
        };

        reader.onerror = () => {
          alert(reader.error.message);
          reject(reader.error.message);
        };
      });
    },
    openApplicationInfo() {
      this.informationModal = true;
    },
    closeApplicationInfo(event) {
      if (!event) {
        this.informationModal = false;
      }
    },
  },
  mounted() {
    this.loadArrays(this.load);
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

      .header-button {
        font-size: 0;
        gap: 0;
      }
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
