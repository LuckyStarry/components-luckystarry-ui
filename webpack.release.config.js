const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const fs = require('fs')
const packages = require('./package.json')

fs.open('./src/luckystarry/release.ts', 'w', function(err, fd) {
  const buf = 'export const build: number = ' + new Date().getTime() + '\r\n'
  fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {})
})

fs.open('./src/luckystarry/version.ts', 'w', function(err, fd) {
  const buf = "export const version: string = '" + packages.version + "'\r\n"
  fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {})
})

module.exports = {
  entry: {
    luckystarry: './src/luckystarry/index.ts'
  },
  output: {
    // eslint-disable-next-line no-undef
    path: path.join(__dirname, './dist'),
    filename: 'luckystarry.min.js',
    library: 'luckystarry',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
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
          less: ExtractTextPlugin.extract({
            use: [
              'css-loader?minimize',
              'autoprefixer-loader',
              'less-loader'
            ],
            fallback: 'vue-style-loader'
          }),
          css: ExtractTextPlugin.extract({
            use: ['css-loader', 'autoprefixer-loader', 'less-loader'],
            fallback: 'vue-style-loader'
          }),
          ts: ['babel-loader', 'ts-loader']
        }
      }
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: ['css-loader?minimize', 'autoprefixer-loader'],
        fallback: 'style-loader'
      })
    },
    {
      test: /\.less/,
      use: ExtractTextPlugin.extract({
        use: ['autoprefixer-loader', 'less-loader'],
        fallback: 'style-loader'
      })
    },
    {
      test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
      loader: 'url-loader?limit=8192'
    }]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].min.css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    alias: {
      vue: 'vue/dist/vue.runtime.js',
      luckystarry: path.resolve(__dirname, './src/luckystarry')
    }
  },
  externals: {
    vue: 'vue',
    vuex: 'vuex',
    ['vue-router']: 'vue-router',
    ['element-ui']: 'element-ui'
  }
}