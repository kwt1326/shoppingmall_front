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

server.listen(port, () => console.log(`listening ${port} port`));

if (env === 'development') {
  const compiler = webpack(webpackClientConfig);

  server.use(webpackDevMiddleware(compiler, {
    publicPath: webpackClientConfig[0].output.publicPath,
    writeToDisk: true,
  }));
  server.use(webpackHotMiddleware(compiler));
}

server.use(express.static(path.resolve(
  env === 'development' ? path.join(__dirname, '../dist') : __dirname)
));

server.get('*', (req: express.Request, res: express.Response) => {
  res.set('content-type', 'text/html')
  res.send(renderHTML(req));
})