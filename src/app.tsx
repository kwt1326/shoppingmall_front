import React from 'react';
import Home from './pages/Home';

export default function App() {
  return (
    <div>
      test12345678
      <Home />
    </div>
  )
}

/**
 * import type { AppProps } from 'next/app'
import Head from 'next/head';
import { Fragment } from 'react';
import wrapper from '../store';
import Modal from '../components/Modal';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContentWrap from '../components/ContentWrap';
import '../assets/styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  const getTitle = (title: string) => {
    switch (process.env.NODE_ENV) {
      case 'development': return `Local ${title}`;
      default: return title
    }
  }

  return (
    <Fragment>
      <Head>
        <meta
          name="viewport"
          id="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <title>{getTitle(`Fashion & Passion Shop`)}</title>
      </Head>
      <Modal />
      <Header />
      <ContentWrap>
        <Component {...pageProps} />
      </ContentWrap>
      <Footer />
    </Fragment>
  )
}

export default wrapper.withRedux(MyApp)

 */