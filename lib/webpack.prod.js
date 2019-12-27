const path = require('path');
const merge = require('webpack-merge');
const cssnano = require('cssnano');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const baseConfig = require('./webpack.base');

const prodConfig = {
  mode: 'production',
  // output: {
  //   path: path.join(__dirname, 'dist'), // 文件路径
  //   filename: '[name]_[chunkHash:8].js', // 文件名
  // },
  plugins: [
    // 压缩css代码
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        // 提取公共包npm
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
          priority: -20,
        },
        // vendors: {
        //     test: /(react|react-dom)/,
        //     name: 'vendors',
        //     priority: -10,
        //     chunks: "all",
        // }
      },
    },
  },
};


module.exports = merge(baseConfig, prodConfig);
