import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../client/app';
import renderHTML from './render';

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackClientConfig = require('../config/webpack.client.config.js');
const webpackServerConfig = require('../config/webpack.server.config.js');

const server = express();
const port = process.env.PORT;
const env = process.env.NODE_ENV;

server.listen(port, () => console.log(`listening ${port} port`))

if (env === 'development') {
  const compiler = webpack([webpackClientConfig, webpackServerConfig]);

  server.use(webpackDevMiddleware(compiler, { publicPath: webpackClientConfig.output.publicPath }));
  server.use(webpackHotMiddleware(compiler.compilers[0]))
}

// output path = dist 이므로 __dirname 또한 같아진다.
server.use('/', express.static(path.join(__dirname, 'static')));

// readFileSync - 서버 실행중, 동기식 작업을 같이 수행하면 안된다.
const manifest = fs.readFileSync(path.join(__dirname, 'static/manifest.json'), 'utf-8');

const assets = JSON.parse(manifest);

server.get('/', (_req, res) => {
  const component = ReactDOMServer.renderToString(React.createElement(App));
  res.send(renderHTML(component, assets['client.js']));
})