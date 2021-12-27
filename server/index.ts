import express from 'express';
import path from 'path';
import renderHTML from './render';

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackClientConfig = require('../config/webpack.client.config.js');

const server = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV;

if (env === 'development') {
  const compiler = webpack(webpackClientConfig);

  server.use(webpackDevMiddleware(compiler, {
    publicPath: webpackClientConfig.output.publicPath,
  }));
  server.use(webpackHotMiddleware(compiler, {
    publicPath: webpackClientConfig.output.publicPath,
  }));
} else {
  server.use(express.static(path.resolve(__dirname)));

  server.get('*', (req: express.Request, res: express.Response) => {
    res.set('content-type', 'text/html')
    res.send(renderHTML(req));
  })
}

server.listen(port, () => console.log(`listening ${port} port`));