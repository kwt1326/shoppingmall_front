const path = require('path');
const spawn = require('cross-spawn');
const webpack = require('webpack');
const webpackClientConfig = require('../webpack.client.config');
const webpackServerConfig = require('../webpack.server.config');

const compiler = webpack([ webpackClientConfig, webpackServerConfig ]);
let node = undefined;

compiler.hooks.watchRun.tap('dev', (compiler) => {
  console.info(`Compiling ${compiler.name}...`)
  if (compiler.name === 'server' && node) {
    node.kill();
    node = undefined;
  }
})

compiler.watch({}, (err, stat) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.info(stat?.toString('minimal'))

  const success = !stat?.hasErrors()
  if (success && !node) {
    console.info('Node Starting...')
    node = spawn('node', ['--inspect', path.join(__dirname, '../dist/server.js')], { stdio: 'inherit', })
  }
})