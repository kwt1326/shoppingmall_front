import React, { Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import wrapper from './store';
import Modal from './components/Modal';
import Header from './components/Header';
import Footer from './components/Footer';
import ContentWrap from './components/ContentWrap';
import Home from './pages/Home';
import reducer from './store/reducers';
import './assets/styles/globals.scss'


function App() {
  const store = createStore(reducer);

  return (
    <Provider store={store}>
      <Modal />
      <Header />
      <ContentWrap>
        <Switch>
          <Route exact path="/home" render={props => <Home {...props} />} />
        </Switch>
      </ContentWrap>
      <Footer />
    </Provider>
  )
}

export default withRouter(App)
