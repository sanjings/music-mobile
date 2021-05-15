const {
  override,
  addWebpackAlias,
  addWebpackPlugin,
  adjustStyleLoaders
} = require('customize-cra');
const path = require("path");
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const resolve = dir => path.resolve(__dirname, dir);

process.env.GENERATE_SOURCEMAP = "false"; // 不生成source-map文件

module.exports = override(
  addWebpackPlugin(
    new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.html$|\.css/,
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false
    })
  ),
  addWebpackAlias({
    '@': resolve('src'),
    'requests': resolve('src/requests'),
    'assets': resolve('src/assets'),
    'components': resolve('src/components'),
    'pages': resolve('src/pages'),
    'utils': resolve('src/utils'),
    'plugins': resolve('src/plugins'),
    'configs': resolve('src/configs')
  }),
  adjustStyleLoaders(rule => {
    if (rule.test.toString().includes("scss")) {
      rule.use.push({
        loader: require.resolve("sass-resources-loader"),
        options: {
          resources: "./src/assets/styles/variables.scss" 
        }
      });
    }
  })
);