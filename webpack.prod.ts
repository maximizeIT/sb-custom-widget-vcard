import * as webpack from "webpack";
import common from "./webpack.common";
import { merge } from "webpack-merge";

const config: webpack.Configuration = merge(common, {
  mode: "production",
});

export default config;
