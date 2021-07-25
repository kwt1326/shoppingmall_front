const path = require('path');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const env = process.env.NODE_ENV === 'development' ? 'development' : 'production';

const config = {
  name: 'client',
  target: 'web',
  mode: 'production',
  entry: {
    client: path.resolve(__dirname, 'client/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'dist/static'),
    filename: '[name].[contenthash].js',
    publicPath: '',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.client.json',
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin(),
  ]
}

if (env === 'development') {
  Object.assign(config, {
    mode: 'development',
    devtool: 'source-map',
    output: {
      ...config.output,
      filename: '[name].js', // hash 제거
    },
  })
}

module.exports = config;