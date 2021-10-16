const path = require('path');
const nodeExternals = require('webpack-node-externals');

const env = process.env.NODE_ENV;
console.info('server build env : ' + process.env.NODE_ENV)

// target : node
const config = {
  name: 'server',
  target: 'node',
  mode: env,
  entry: {
    server: path.resolve(__dirname, '../server/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js', // name: 'server'
    chunkFilename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.ts', '.tsx', 'js', '.css', '.scss'],
  },
  externals: ['@loadable/component', nodeExternals()],
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.(jpeg|jpg|svg|png|gif|ico)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '../assets/images',
            },
          },
        ],
      },
      env === 'development' ? {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2015',
        }
      } : {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              caller: 'node'
            }
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: '../config/tsconfig.client.json',
            }
          }
        ]
      }
    ]
  },
}

module.exports = config;