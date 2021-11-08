const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader'); // only develop
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

const env = process.env.NODE_ENV;
console.info('client build env : ' + process.env.NODE_ENV)

// target : client (web)
const config = target => ({
  name: target,
  target,
  mode: env,
  entry: target === 'node' ?
    path.resolve(__dirname, '../src/app.tsx') :
    {
      main: path.resolve(__dirname, '../src/index.tsx'),
      vendor: ['react', 'react-dom']
    },
  output: {
    path: path.resolve(__dirname, `../dist/${target}`),
    filename: '[name].[contenthash].js',
    publicPath: '/web/',
    libraryTarget: target === 'node' ? 'commonjs2' : undefined,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css', '.scss'],
  },
  externals: target === 'node' ? [
    '@loadable/component',
    nodeExternals()
  ] : undefined,
  module: {
    rules: [
      {
        test: /\.(s[ac]ss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
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
      // env === 'development' ? {
      //   test: /\.tsx?$/,
      //   loader: 'esbuild-loader',
      //   options: {
      //     loader: 'tsx',
      //     target: 'es2015',
      //   }
      // } : {
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
})

const webConfig = config('web');
const nodeConfig = config('node');

if (env === 'development') {
  const devConfig = (configObj, target) => {
    Object.assign(configObj, {
      mode: 'development',
      devtool: 'inline-source-map', // 디버깅에 필요한 경우에만 활성화 - 빌드속도에 큰 영향
      entry: target === 'node' ?
        path.resolve(__dirname, '../src/app.tsx') :
        {
          main: [
            'webpack-hot-middleware/client?name=web&reload=true',
            path.resolve(__dirname, '../src/index.tsx'),
          ],
          vendor: ['react', 'react-dom']
        },
      output: {
        ...configObj.output,
        filename: '[name].js', // hash 제거
      },
      plugins: [
        ...configObj.plugins,
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
    configObj.module.rules[0].use.push({
      loader: 'esbuild-loader',
      options: {
        loader: 'css',
        minify: true
      }
    })
    
    return configObj;
  }

  module.exports = [devConfig(webConfig, 'web'), devConfig(nodeConfig, 'node')];
} else {
  module.exports = [webConfig, nodeConfig];
}