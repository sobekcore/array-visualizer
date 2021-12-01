import enums from "@/utility/enums";

export default {
  application: () => {
    return "array-visualizer";
  },
  acceptedFileFormats: () => {
    return [enums.JSON_FILE_FORMAT, enums.CSV_FILE_FORMAT];
  },
  operations: () => {
    return [
      { name: "Concatenation", value: enums.CONCAT_OPERATION },
      { name: "Union", value: enums.UNION_OPERATION },
      { name: "Intersection", value: enums.INTERSECT_OPERATION },
      { name: "Difference", value: enums.DIFF_OPERATION },
      { name: "Sym. Difference", value: enums.SYM_DIFF_OPERATION },
      { name: "Sort", value: enums.SORT_OPERATION },
      { name: "Unique Sort", value: enums.UNIQUE_SORT_OPERATION },
    ];
  },
  visualizer: () => {
    return [
      { label: "JSON", value: enums.JSON_FILE_FORMAT, icon: "download" },
      { label: "CSV", value: enums.CSV_FILE_FORMAT, icon: "download" },
    ];
  },
  guide: () => {
    return [
      { label: "Close", value: false },
      { label: "Next", value: true, main: true },
    ];
  },
  steps: () => {
    return {
      0: {
        content: "Welcome to Array Visualizer! This guide will take you through most of the stuff you can do in this application. Click \"Next\" to follow through...",
      },
      1: {
        elements: ".add-new-array",
        content: "This button adds new empty array onto the playground.",
      },
      2: {
        elements: ".add-array-item",
        content: "This button adds new array item into the current array.",
        actions: "addArrayIfNotExists",
      },
      3: {
        elements: ".array-item",
        content: "One can change arrays item values. Initially its is a random number from 0 - 1000.",
        actions: "addArrayItemIfNotExists",
      },
      4: {
        elements: ".remove-arrays",
        content: "This button removes all the arrays from the playground.",
      },
      5: {
        elements: ".import-arrays",
        content: "This button allows to import arrays from various file formats.",
      },
      6: {
        elements: ".change-operation-type .dropdown-list",
        content: "This is a dropdown menu to change array operation type.",
        actions: "openOperationsDropdown",
      },
      7: {
        elements: ".visualize-arrays",
        content: "This button makes array visualization based on all the available arrays.",
      },
      8: {
        elements: ".export-arrays",
        content: "This button exports Visualized Array into a choosen file format.",
      },
      9: {
        content: "Here we go, the guide has came to an end, play with this application as you wish. I hope you will like it!",
        actions: "prepareGuideLastStep",
      },
    };
  },
};
