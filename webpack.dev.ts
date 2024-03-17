import * as path from "path";
import * as webpack from "webpack";
import common from "./webpack.common";
import { merge } from "webpack-merge";
import "webpack-dev-server";

const config: webpack.Configuration = merge(common, {
  entry: {
    "maximize-it.custom-widget-user-vcard": "./src/dev.ts",
    config: "./dev/config.tsx",
    bootstrap: "./dev/bootstrap.ts",
  },
  devServer: {
    contentBase: path.join(__dirname, "resources"),
    compress: true,
    port: 9000,
  },
  mode: "development",
  devtool: "inline-source-map",
});

export default config;
