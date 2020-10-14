/* eslint-disable quote-props */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

const isDev = process.env.NODE_ENV === 'development';
const PATHS = {
  src: path.resolve(process.cwd(), 'src'),
  dist: path.resolve(process.cwd(), 'dist'),
};

module.exports = {
  entry: {
    main: `${PATHS.src}/pages/main`,
    savedNews: `${PATHS.src}/pages/savedNews`,
  },
  output: {
    path: PATHS.dist,

    /* Не удалось оптимизировать ссылки на файлы CSS и JS в итоговых файлах HTML. Сейчас они
    имеют вид ../../pages/main/main.bc245e3f1582459bf230.js, где часть ../../pages/main/
    избыточна. Для исправления этого могло бы использоваться свойство publicPath. В файлы HTML
    вставляются пути, которые получаются как publicPath + filename. То есть, нужно было бы
    удалить из filename часть pages/[name]/ и поместить ее в publicPath (начиная с ./
    – publicPath должен быть, емнип, относительным путем). Однако в publicPath не поддерживается
    переменная пути [name]. Решить эту проблему с помощью регулярного выражения также не удалось:
    видимо, это противоречит логике сопоставления путей, и на выходе оно подставляется в путь как
    строка. */
    // publicPath: './pages/[name]/',

    filename: 'pages/[name]/[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['transform-class-properties'],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          (isDev ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader, options: { publicPath: '../../' },
          }),
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: './vendor/fonts/[name].[ext]',
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '../../',
              name: 'images/[name].[ext]',

              /* не рабочее:
              – прописывает в HTML-файле неверный для моей структуры путь:
              publicPath не задан
              name: './images/[name].[ext]',
              – прописывает правильный путь,
                   но закидывает саму папку images выше папки всего проекта:
              publicPath не задан
              name: '../../images/[name].[ext]', */
              esModule: false,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'pages/main/index.html',
      template: './src/pages/main/index.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      filename: 'pages/savedNews/index.html',
      template: './src/pages/savedNews/index.html',
      chunks: ['savedNews'],
    }),
    new MiniCssExtractPlugin({
      filename: 'pages/[name]/[name].[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true,
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
