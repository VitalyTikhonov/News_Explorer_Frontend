/* eslint-disable quote-props */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    index: './src/index.js',
    savednews: './src/savednews/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[chunkhash].js',
    // publicPath: '../',
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
          (isDev
            ? 'style-loader'
            : {
              loader: MiniCssExtractPlugin.loader,
              options: { publicPath: '../' },
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
            publicPath: isDev ? '../' : '',
            /* Без publicPath здесь и ниже для изображений в дев-сборке не грузились картинки
            и шрифты: вместо http://localhost:8080/images/logout_black.png запрос за ними
            уходил на http://localhost:8080/savednews/images/logout_black.png. (В текущей реализации savednews может браться
            только из new HtmlWebpackPlugin).
            С этим publicPath не грузятся картинки в продакшене на удаленном сервере: запрос
            ошибочно поднимается на уровень выше – http://vitaliytikhonov.ru/webdev/projects/images/vitaliytikhonov.jpg
            вместо Request URL: http://vitaliytikhonov.ru/webdev/projects/news_explorer/images/vitaliytikhonov.jpg.
            Попытки задать publicPath в new HtmlWebpackPlugin или в output не удается осмыслить,
            не решают проблему и (output) приводят к ошибкам. */
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './images/[name].[ext]',
              esModule: false,
              publicPath: isDev ? '../' : '',
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
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      template: './src/savednews/index.html',
      filename: 'savednews/index.html',
      chunks: ['savednews'],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
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
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
