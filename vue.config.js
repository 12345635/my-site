// vue-cli的配置文件
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://y.qq.com/n/ryqq/player",
      },
    },
  },
  configureWebpack:require("./webpack.config"),
};
