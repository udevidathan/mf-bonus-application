const path = require("path");
const { merge } = require("webpack-merge");
const mfConfig = require("../moduleFederationConfig");
const commonConfig = require("./webpack.common");

const prodConfig = (env) => {
  const environment = (
    (env["local"] && "local") ||
    (env["dev"] && "dev") ||
    (env["qa"] && "qa") ||
    (env["preprod"] && "staging") ||
    (env["prod"] && "prod")
  ).toUpperCase();

  const PUBLIC_PATH = process.env[`REACT_APP_${environment}_HOST`];
  return {
    mode: "production",
    output: {
      path: path.resolve(__dirname, "..", "./dist"),
      publicPath: () => PUBLIC_PATH,
      filename: "[name].[hash].js",
      clean: true,
    },
  };
};

module.exports = (env) => {
  return merge(commonConfig(env), prodConfig(env), mfConfig(env));
};
