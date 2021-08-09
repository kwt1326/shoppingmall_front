const path = require('path');
const webpack = require('webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = process.env.NODE_ENV === 'development' ? 'development' : 'production';

// target : client (web)
const config = {
  name: 'client',
  target: 'web',
  mode: 'production',
  entry: {
    client: [
      path.resolve(__dirname, '../src/index.tsx'),
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]ss|css)$/,
        use: [
          env === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                auto: /\w+\.scss$/i,
                localIdentName: env === 'production' ?
                  '[hash:base64]' :
                  '[path][name]__[local]'
              },
              sourceMap: env === 'development',
            }
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require('sass'), // dart-sass
              sassOptions: {
                fiber: require('fibers'), // fibers
              },
              sourceMap: env === 'development',
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: '../config/tsconfig.client.json',
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css",
    }),
  ]
}

if (env === 'development') {
  Object.assign(config, {
    mode: 'development',
    devtool: 'source-map',
    entry: {
      client: [
        'webpack-hot-middleware/client?reload=true',
        path.resolve(__dirname, '../src/index.tsx'),
      ]
    },
    output: {
      ...config.output,
      filename: '[name].js', // hash 제거
    },
    plugins: [
      ...config.plugins,
      new webpack.HotModuleReplacementPlugin(),
    ]
  })
}

module.exports = config;