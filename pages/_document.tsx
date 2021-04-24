import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
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
          {/* <meta
            name="og:image"
            content="/images/og_image.png"
          /> */}

          {/* <link rel="icon" type="image/png" sizes="16x16" href={"/images/favicon-16x16.png"}/>
          <link rel="icon" type="image/png" sizes="32x32" href={"/images/favicon-32x32.png"}/>
          <link rel="icon" type="image/png" sizes="96x96" href={"/images/favicon-96x96.png"}/> */}

          <link rel="canonical" href="https://kwt1326.github.io" />
          {/* <link rel="preload stylesheet" href="/fonts/fonts.css" as="style" /> */}
          {/* {
            process.env.API_ENV !== 'development'
            && <link rel="stylesheet" href={`${this.props.__NEXT_DATA__.assetPrefix}/_next/static/style.css`} />
          } */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}