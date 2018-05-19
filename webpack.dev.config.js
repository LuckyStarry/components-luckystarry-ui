const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const fs = require('fs')
const packages = require('./package.json')

module.exports = {
  devtool: '#source-map',
  entry: {
    main: './src/demo/main',
    vendors: './src/demo/vendors'
  },
  output: {
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  module: {
    rules: [
    {
      enforce: 'pre',
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      loader: 'tslint-loader'
    },
    {
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: ['babel-loader', 'ts-loader']
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          ts: ['babel-loader', 'ts-loader']
        }
      }
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'autoprefixer-loader']
    },
    {
      test: /\.less/,
      use: [
        'style-loader',
        'css-loader',
        'autoprefixer-loader',
        'less-loader'
      ]
    },
    {
      test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
      loader: 'url-loader?limit=8192'
    }]
  },
  devServer: {
    contentBase: './src/demo/',
    compress: true,
    port: 80,
    host: '0.0.0.0',
    disableHostCheck: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    alias: {
      vue: 'vue/dist/vue.esm.js',
      luckystarry: path.resolve(__dirname, './src/luckystarry'),
      demo: path.resolve(__dirname, './src/demo')
    }
  }
}