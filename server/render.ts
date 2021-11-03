import { ChunkExtractor } from "@loadable/server";

export default function renderHTML(component: string, extractor: ChunkExtractor) {
  return (
    `<!DOCTYPE html>
    <html>
      <head>
        ${extractor.getLinkTags()}
        ${extractor.getStyleTags()}
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
        <div id="react-root">${component}</div>
        
        ${extractor.getScriptTags()}
      </body>
    </html>`
  )
}
