import { ChunkExtractor } from "@loadable/server";

export default function renderHTML(component: string, extractor: ChunkExtractor /*assets: { src: string, style?: string }*/) {
  return (
    `<!DOCTYPE html>
    <html>
      <head>
        ${extractor.getLinkTags()}
        ${extractor.getStyleTags()}
        <meta charset="utf-8" />
        <meta
          name="og:title"
          content="Fashion & Passion Shop"
        />
        <meta name="keywords" content="shopping, portfolio" />
        <meta
          name="description"
          content="Fashion & Passion Shop Portfolio by Kim wontae"
        />
        <meta
          name="og:description"
          content="Fashion & Passion Shop Portfolio by Kim wontae"
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

// <link rel="stylesheet" type="text/css" href=${assets.style}>
// <script defer="defer" src=${assets.src}></script>