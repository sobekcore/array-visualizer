import enums from "@/services/enums";

export default {
  information: `
    Array Visualizer is a simple application to visualize operations on arrays.
    <br class="line-break" />
    Currently supported import and export file formats are .json and .csv files.
    <br class="line-break" />
    Creator: <a href="https://github.com/sobekcore" target="_blank">@sobekcore</a>
  `,
  acceptedFileFormats: [
    enums.JSON_FILE_FORMAT,
    enums.CSV_FILE_FORMAT,
  ],
  operations: [
    { name: "Concatenation", value: enums.CONCAT_OPERATION },
    { name: "Union", value: enums.UNION_OPERATION },
    { name: "Intersection", value: enums.INTERSECT_OPERATION },
    { name: "Difference", value: enums.DIFF_OPERATION },
    { name: "Sym. Difference", value: enums.SYM_DIFF_OPERATION },
    { name: "Sort", value: enums.SORT_OPERATION },
    { name: "Unique Sort", value: enums.UNIQUE_SORT_OPERATION },
  ],
  visualizer: [
    { label: "JSON", value: enums.JSON_FILE_FORMAT, icon: "download" },
    { label: "CSV", value: enums.CSV_FILE_FORMAT, icon: "download" },
  ],
  guide: [
    { label: "Close", value: false },
    { label: "Next", value: true, main: true },
  ],
  steps: {
    0: {
      content: "Welcome to Array Visualizer! This guide will take you through most of the stuff you can do in this application. Click \"Next\" to follow through...",
    },
    1: {
      elements: ".application-info",
      content: "This button presents basic information about the application."
    },
    2: {
      elements: ".add-new-array",
      content: "This button adds new empty array onto the playground.",
    },
    3: {
      elements: ".add-array-item",
      content: "This button adds new array item into the current array.",
      actions: "addArrayIfNotExists",
    },
    4: {
      elements: ".array-item",
      content: "One can change arrays item values. Initially its is a random number from 0 - 1000.",
      actions: "addArrayItemIfNotExists",
    },
    5: {
      elements: ".remove-arrays",
      content: "This button removes all the arrays from the playground.",
    },
    6: {
      elements: ".import-arrays",
      content: "This button allows to import arrays from various file formats.",
    },
    7: {
      elements: ".change-operation-type .dropdown-list",
      content: "This is a dropdown menu to change array operation type.",
      actions: "openOperationsDropdown",
    },
    8: {
      elements: ".visualize-arrays",
      content: "This button makes array visualization based on all the available arrays.",
    },
    9: {
      elements: ".export-arrays",
      content: "This button exports Visualized Array into a chosen file format.",
    },
    10: {
      content: "Here we go, the guide has came to an end, play with this application as you wish. I hope you will like it!",
      actions: "prepareGuideLastStep",
    },
  },
};
