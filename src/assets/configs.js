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
      { name: "Difference", value: enums.DIFF_OPERATION },
      { name: "Intersection", value: enums.INTERSECT_OPERATION },
      { name: "Union", value: enums.UNION_OPERATION },
    ];
  },
  visualizer: () => {
    return [
      { label: "JSON", value: enums.JSON_FILE_FORMAT, icon: "download" },
      { label: "CSV", value: enums.CSV_FILE_FORMAT, icon: "download" },
    ];
  },
};
