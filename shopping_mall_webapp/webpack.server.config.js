const path = require('path');
const nodeExternals = require('webpack-node-externals');

const env = process.env.NODE_ENV === 'development' ? 'development' : 'production';

const config = {
  name: 'server',
  target: 'node',
  mode: 'production',
  entry: {
    server: path.resolve(__dirname, 'server/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js', // name: 'server'
  },
  resolve: {
    extensions: ['.ts', '.tsx'],
  },
  externals: [nodeExternals()],
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.server.json',
        }
      }
    ]
  },
}

if (env === 'development') {
  Object.assign(config, {
    mode: 'development',
    devtool: 'source-map',
  })
}

module.exports = config;