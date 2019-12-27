const path = require('path');
const glob = require('glob');
const autoprefixer = require('autoprefixer');
const MiniCssExtract = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

//
const projectRoot = process.cwd();
console.log('==============='+path.join(projectRoot, './dist')+'==================')

const setMap = () => {
  const entry = {};
  const htmlWebpackPlugins = [];

  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));

  entryFiles.forEach((val, index) => {
    const entryFile = entryFiles[index];

    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];

    entry[pageName] = entryFile;
    htmlWebpackPlugins.push(new HtmlWebpackPlugin({
      template: path.join(projectRoot, `src/${pageName}/index.html`),
      filename: `${pageName}.html`, // 打包出来的html名称
      chunks: ['vendors', pageName], // 生成的html要使用哪个chunk
      inject: true, // 打包好的js、css自动注入html中
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }));
  });

  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMap();

module.exports = {
  entry,
  output: {
    path: path.join(projectRoot, './dist'),
    filename: '[name]_[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: [
          'babel-loader',
          // 'eslint-loader'
        ],
      },
      {
        test: /\.css$/,
        use: [ // 执行顺序 css-loader  style-loader
          MiniCssExtract.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer({
                  browsers: ['last 2 version', '>1%', 'ios 7'],
                }),
              ],
            },
          }, {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75, // 1rem -> 75px
              remPrecesion: 8, // 保留小数点后的位数
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240, // 图片小于10k 转成base64
            },
          },

          /* {
                        loader: "file-loader",
                        options: {
                            name: 'img/[name][hash:8].[ext]',  // 文件增加指纹
                        }
                    } */
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]', // 文件增加指纹
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // 提取css到单独的文件中
    new MiniCssExtract({
      filename: '[name]_[contentHash:8].css',
    }),

    // 构建前清理构建目录
    new CleanWebpackPlugin(),

    // 构建日志插件
    new FriendlyErrorsWebpackPlugin(),

    // 错误捕获
    // function Error() {
    //   this.hooks.done.tap('done', (stats) => {
    //     if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
    //       // console.log('build error');
    //       process.exit(1);
    //     }
    //   });
    // },
  ].concat(htmlWebpackPlugins),
  // stats: 'errors-only',
};
