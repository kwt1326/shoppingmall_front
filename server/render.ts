export default function renderHTML(component: string, src: string) {
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
      </head>
      <body>
        <div id="react-root">${component}</div>
        <script defer="defer" src=${src}></script>
      </body>
    </html>`
  )
}