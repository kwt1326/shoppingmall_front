import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from '../src/app';
import renderHTML from './render';

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackClientConfig = require('../config/webpack.client.config.js');
const webpackServerConfig = require('../config/webpack.server.config.js');

const server = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || "production";

server.listen(port, () => console.log(`listening ${port} port`));

const compiler = webpack([webpackClientConfig, webpackServerConfig]);

if (env === 'development') {
  server.use(webpackDevMiddleware(compiler, { publicPath: webpackClientConfig.output.publicPath }));
  server.use(webpackHotMiddleware(compiler.compilers[0]));
}

server.use('/', express.static(path.join(__dirname, 'static')));

const manifest = fs.readFileSync(path.join(__dirname, 'static/manifest.json'), 'utf-8');

const assets = JSON.parse(manifest);

server.get('/', (req, res) => {
  const component = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={{}}>
      <App />
    </StaticRouter>
  );
  res.send(renderHTML(component, env === 'development' ? {
    src: assets['client.js'],
  } : {
    src: assets['client.js'],
    style: 'client.css',
  }));
})