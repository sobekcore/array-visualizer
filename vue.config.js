module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/utility/variables.scss";
        `,
      },
    },
  },
};
