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
const webpackServerConfig = require('../config/webpack.server.config.js');

const server = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || "production";

server.listen(port, () => console.log(`listening ${port} port`));

const compiler = webpack([webpackClientConfig, webpackServerConfig]);

if (env === 'development') {
  server.use(webpackDevMiddleware(compiler, {
    publicPath: webpackClientConfig.output.publicPath,
    writeToDisk(filePath: string) {
      return /dist\/node\//.test(filePath) || /loadable-stats/.test(filePath)
    },
  }));
  server.use(webpackHotMiddleware(compiler.compilers[0]));
}

server.use('/', express.static(path.join(__dirname, 'static')));
server.use(express.static(path.join(__dirname, '/')))

const manifest = fs.readFileSync(path.join(__dirname, 'static/manifest.json'), 'utf-8');

const assets = JSON.parse(manifest);

const nodeStats = path.join(__dirname, 'loadable-stats.json');

const webStats = path.join(__dirname, 'static/loadable-stats.json');

server.get('*', (req, res) => {

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
  // res.send(`
  //     <!DOCTYPE html>
  //     <html>
  //       <head>
  //       ${webExtractor.getLinkTags()}
  //       ${webExtractor.getStyleTags()}
  //       </head>
  //       <body>
  //         <div id="react-root">${html}</div>
  //         ${webExtractor.getScriptTags()}
  //       </body>
  //     </html>
  //   `)

  // const component = ReactDOMServer.renderToString(
  //   <StaticRouter location={req.originalUrl} context={{}}>
  //     <App />
  //   </StaticRouter>
  // );

  // res.send(renderHTML(component, env === 'development' ? {
  //   src: assets['client.js'],
  // } : {
  //   src: assets['client.js'],
  //   style: assets['client.css'],
  // }));
})