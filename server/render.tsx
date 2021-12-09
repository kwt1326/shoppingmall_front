import path from 'path';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { ChunkExtractor } from "@loadable/server";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../src/store/reducers';

export default function renderHTML(req: any) {
  const isDev = process.env.NODE_ENV === 'development';

  const dist = isDev ? '../dist/' : './';

  const nodeStats = path.resolve(__dirname, `${dist}node/loadable-stats.json`);

  const webStats = path.resolve(__dirname, `${dist}web/loadable-stats.json`);

  const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats });

  const { default: App } = nodeExtractor.requireEntrypoint()

  const webExtractor = new ChunkExtractor({ statsFile: webStats })

  const jsx = webExtractor.collectChunks(
    <StaticRouter location={req.originalUrl} context={{}}>
      <App />
    </StaticRouter>
  )

  const html = renderToString(jsx)

  return (
    `<!DOCTYPE html>
    <html>
      <head>
        ${webExtractor.getLinkTags()}
        ${webExtractor.getStyleTags()}
        <meta charset="utf-8" />
        <meta
          name="og:title"
          content="The Goods Shop"
        />
        <meta name="keywords" content="shopping, portfolio" />
        <meta
          name="description"
          content="The Goods Shop Portfolio by Kim wontae"
        />
        <meta
          name="og:description"
          content="The Goods Shop Portfolio by Kim wontae"
        />
        <title>Welcome The Shop!</title>
        
      </head>
      <body>
        <div id="react-root">${html}</div>
        
        ${webExtractor.getScriptTags()}
      </body>
    </html>`
  )
}
