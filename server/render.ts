export default function renderHTML(component: string, assets: { src: string, style?: string }) {
  return (
    `<!DOCTYPE html>
    <html>
      <head>
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
        <link rel="stylesheet" type="text/css" href=${assets.style}>
      </head>
      <body>
        <div id="react-root">${component}</div>
        <script defer="defer" src=${assets.src}></script>
      </body>
    </html>`
  )
}