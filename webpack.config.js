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
  publicPath: path.resolve(process.cwd(), 'dist/pages'),
};

module.exports = {
  entry: {
    // main: './src/pages/main/index.js',
    // savedNews: './src/pages/savedNews/index.js',
    main: `${PATHS.src}/pages/main`,
    savedNews: `${PATHS.src}/pages/savedNews`,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: PATHS.publicPath,
    filename: './[name].[chunkhash].js',

    // path: path.resolve(__dirname, 'dist'),
    // filename: 'pages/[name]/[name].[chunkhash].js',
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
          // (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
          (isDev ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader, options: { publicPath: '../../' },
          }),
          // Без style-loader:
          // { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../../' } },
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
              // не рабочее:
              // прописывает в HTML-файле неверный для моей структуры путь:
              // name: './images/[name].[ext]',
              // прописывает правильный путь,
              // но закидывает саму папку images выше папки всего проекта:
              // name: '../../images/[name].[ext]',
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

    // new HtmlWebpackPlugin({
    //   filename: 'pages/main/index.html',
    //   template: './src/pages/main/index.html',
    //   chunks: ['main'],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'pages/savedNews/index.html',
    //   template: './src/pages/savedNews/index.html',
    //   chunks: ['savedNews'],
    // }),
    // new MiniCssExtractPlugin({
    //   filename: 'pages/[name]/[name].[contenthash].css',
    // }),
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
