const path = require('path');
const webpack = require('webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader'); // only develop
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

const env = process.env.NODE_ENV === 'development' ? 'development' : 'production';
console.info('build target : ' + process.env.NODE_ENV)

// target : client (web)
const config = {
  name: 'client',
  target: 'web',
  mode: 'production',
  entry: {
    client: [
      path.resolve(__dirname, '../src/index.tsx'),
    ],
    vendor: [ 'react', 'react-dom' ]
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
      //     configFile: '../config/tsconfig.client.json',
      //   }
      // }
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              caller: 'web'
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
              caller: 'web'
            }
          },
        ]
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
    new LoadablePlugin(),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },
}

if (env === 'development') {
  Object.assign(config, {
    mode: 'development',
    devtool: 'inline-source-map', // 디버깅에 필요한 경우에만 활성화 - 빌드속도에 큰 영향
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
    ],
    optimization: {
      minimizer: [
        new ESBuildMinifyPlugin({
          target: 'es2015', // Syntax to compile to (see options below for possible values)
          css: true
        })
      ]
    }
  })
  // 'css in js' method only
  config.module.rules[0].use.push({
    loader: 'esbuild-loader',
    options: {
      loader: 'css',
      minify: true
    }
  })
}

module.exports = config;