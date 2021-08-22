const path = require('path');
const nodeExternals = require('webpack-node-externals');

const env = process.env.NODE_ENV === 'development' ? 'development' : 'production';

// target : node
const config = {
  name: 'server',
  target: 'node',
  mode: 'production',
  entry: {
    server: path.resolve(__dirname, '../server/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js', // name: 'server'
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.ts', '.tsx', 'js', '.css', '.scss'],
  },
  externals: [nodeExternals()],
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]ss|css)$/,
        use: [
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: /\w+\.scss$/i,
                exportOnlyLocals: true,
                localIdentName: env === 'production' ?
                  '[hash:base64]' :
                  '[path][name]__[local]'
              },
            }
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require('sass'), // dart-sass
              sassOptions: {
                fiber: require('fibers'), // fibers
              },
            },
          },
        ],
      },
      env === 'development' ?
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2015',
        }
      } : {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: '../config/tsconfig.server.json',
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