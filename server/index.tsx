import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from '../src/app';
import reducer from '../src/store/reducers';
import renderHTML from './render';

import { renderToString } from 'react-dom/server'
import { ChunkExtractor } from '@loadable/server'

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackClientConfig = require('../config/webpack.client.config.js');

const server = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV;

server.listen(port, () => console.log(`listening ${port} port`));

const compiler = webpack(webpackClientConfig);

if (env === 'development') {
  server.use(webpackDevMiddleware(compiler, {
    publicPath: webpackClientConfig[0].output.publicPath,
    writeToDisk: true,
  }));
  server.use(webpackHotMiddleware(compiler));
}

server.use(express.static(path.resolve(__dirname)));

server.get('*', (req, res) => {
  const nodeStats = path.resolve(__dirname, './node/loadable-stats.json');

  const webStats = path.resolve(__dirname, './web/loadable-stats.json');
  
  const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats });

  const { default: App } = nodeExtractor.requireEntrypoint()

  const webExtractor = new ChunkExtractor({ statsFile: webStats })

  const jsx = webExtractor.collectChunks(
    <StaticRouter location={req.originalUrl} context={{}}>
      <App />
    </StaticRouter>
  )

  const html = renderToString(jsx)

  res.set('content-type', 'text/html')
  res.send(renderHTML(html, webExtractor));
})