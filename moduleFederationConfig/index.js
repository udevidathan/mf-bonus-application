require("dotenv").config();

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJSON = require("../package.json");

const mfConfig = (env) => {
  const environment = (
    (env["local"] && "local") ||
    (env["dev"] && "dev") ||
    (env["qa"] && "qa") ||
    (env["preprod"] && "staging") ||
    (env["prod"] && "prod")
  ).toUpperCase();

  return {
    plugins: [
      new ModuleFederationPlugin({
        name: "bonus",
        filename: "bonusEntry.js",
        remotes: {},
        exposes: {
          ".": "./src/App.tsx",
        },
        shared: packageJSON.dependencies,
      }),
    ],
  };
};

module.exports = mfConfig;
