const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: "all",
  },
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       additionalData: `
  //               @import "@/assets/scss/_reset.scss";
  //               @import "@/assets/scss/_variables.scss";
  //               @import "@/assets/scss/_breakpoints.scss";
  //               @import "@/assets/scss/_mixins.scss";
  //           `,
  //     },
  //   },
  // },
});
