const path = require("path");
const dotenv = require("dotenv").config();
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

function getEnvironment(config) {
  const envKeys = ["prod", "preprod", "qa", "dev", "local"];
  const envKey = envKeys.find((key) => config[key]);
  return envKey || "";
}

module.exports = (env) => {
  let newRelicScript;
  if (["prod", "preprod", "qa"].indexOf(getEnvironment(env)) > -1)
    newRelicScript = ["new-relic.js"];
  else newRelicScript = [];

  const plugins = [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "..", "./public/index.html"),
      favicon: path.resolve(__dirname, "..", "./public/favicon.ico"),
    }),
    new HtmlWebpackTagsPlugin({
      tags: newRelicScript,
      append: false,
    }),
    new DefinePlugin({
      "process.env": JSON.stringify(dotenv.parsed),
    }),
  ];

  if (newRelicScript.length) {
    plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "..", `./public/${newRelicScript}`),
            to: path.resolve(__dirname, "..", `./dist/${newRelicScript}`),
            noErrorOnMissing: true,
          },
        ],
      })
    );
  }

  return {
    target: "web",
    entry: {
      main: "./src/index.tsx",
    },
    output: {
      publicPath: () => process.env.REACT_APP_LOCAL_HOST,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".d.ts"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-env",
                  [
                    "@babel/preset-react",
                    {
                      runtime: "automatic",
                    },
                  ],
                  "@babel/preset-typescript",
                ],
                plugins: [
                  [
                    "@babel/plugin-transform-runtime",
                    {
                      regenerator: true,
                    },
                  ],
                ],
              },
            },
          ],
        },
        {
          test: /\.s?(css)$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
              },
            },
            {
              loader: "resolve-url-loader",
              options: {
                sourceMap: true,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: plugins,
  };
};
