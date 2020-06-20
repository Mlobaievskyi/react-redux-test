const { override, fixBabelImports, addBabelPlugins } = require("customize-cra");

module.exports = (config) => {
  override(
    // addWebpackPlugin(new AntdDayjsWebpackPlugin()),
    ...addBabelPlugins("@babel/plugin-proposal-optional-chaining"),
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: true,
    })
  )(config);
  require("react-app-rewire-postcss")(config, true);
  return config;
};
