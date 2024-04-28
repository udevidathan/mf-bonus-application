const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const port = process.env.PORT || 8080;
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const mfConfig = require("../moduleFederationConfig");

const devConfig = {
  mode: "development",
  devtool: "source-map",
  optimization: { minimize: false },
  devServer: {
    open: true,
    hot: true,
    historyApiFallback: true,
    port,
  },
  plugins: [new ReactRefreshWebpackPlugin()],
};

module.exports = (env) => {
  return merge(commonConfig(env), devConfig, mfConfig(env));
};
