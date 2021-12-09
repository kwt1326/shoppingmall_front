import React from 'react';
import { withRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import GlobalWrap from './components/GlobalWrap';
import ContentWrap from './components/ContentWrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Modal from './components/Modal';

import loadable from '@loadable/component';

const Router = loadable(() => import('./route'));

import reducer from './store/reducers';

// style(global)
import './assets/styles/globals.scss'

function App() {
  const store = createStore(reducer);

  return (
    <Provider store={store}>
      <Modal />
      <GlobalWrap>
        <Header />
        <ContentWrap>
          <Router />
        </ContentWrap>
        <Footer />
      </GlobalWrap>
    </Provider>
  )
}

export default withRouter(App)
