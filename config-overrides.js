const {
  override,
  addWebpackAlias,
  adjustStyleLoaders
} = require('customize-cra');
const path = require("path");

const resolve = dir => path.join(__dirname, dir);

module.exports = override(
  addWebpackAlias({
    '@': resolve('src'),
    'requests': resolve('src/apis/requests'),
    'assets': resolve('src/assets'),
    'components': resolve('src/components'),
    'pages': resolve('src/pages'),
    'utils': resolve('src/utils'),
    'plugins': resolve('src/plugins')
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