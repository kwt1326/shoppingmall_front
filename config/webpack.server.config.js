const path = require('path');
const nodeExternals = require('webpack-node-externals');
const LoadablePlugin = require('@loadable/webpack-plugin');

const env = process.env.NODE_ENV === 'development' ? 'development' : 'production';

// target : node
const config = {
  name: 'server',
  target: 'node',
  mode: 'production',
  entry: {
    server: path.resolve(__dirname, '../server/index.tsx'),
    vendor: [ 'react', 'react-dom' ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js', // name: 'server'
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
        test: /\.(s[ac]ss|css)$/,
        use: [
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: /\w+\.scss$/i,
                exportOnlyLocals: true,
                localIdentName: env === 'development' ?
                  '[path][name]__[local]' :
                  '[hash:base64]'
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
      {
        test: /\.(jpeg|jpg|svg|png|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: path.resolve(__dirname, '/'),
            },
          },
        ],
      },
      // env === 'development' ?
      // {
      //   test: /\.tsx?$/,
      //   loader: 'esbuild-loader',
      //   options: {
      //     loader: 'tsx',
      //     target: 'es2015',
      //   }
      // } : {
      //   test: /\.tsx?$/,
      //   loader: 'ts-loader',
      //   options: {
      //     configFile: '../config/tsconfig.server.json',
      //   }
      // }
      {
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
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              caller: 'node'
            }
          },
        ]
      }
    ]
  },
  plugins: [new LoadablePlugin()],
}

if (env === 'development') {
  Object.assign(config, {
    mode: 'development',
    // devtool: 'source-map', // 디버깅에 필요한 경우에만 활성화 - 빌드속도에 큰 영향
  })
}

module.exports = config;