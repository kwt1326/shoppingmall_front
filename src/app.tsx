import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import GlobalWrap from './components/GlobalWrap';
import ContentWrap from './components/ContentWrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Modal from './components/Modal';
import reducer from './store/reducers';

// pages
import Home from './pages/Home';

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
          <Switch>
            <Route exact path="/home" render={props => <Home {...props} />} />
          </Switch>
        </ContentWrap>
        <Footer />
      </GlobalWrap>
    </Provider>
  )
}

export default withRouter(App)
