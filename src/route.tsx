import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

// pages
import Home from './pages/home';
import Login from './pages/login';
import Mypage from './pages/mypage';
import ProductList from './pages/productList';
import ProductDetail from './pages/productDetail';

const Router = () => (
  <Switch>
    <Route exact path="/" render={props => <Home {...props} />} />
    <Route path="/home" render={props => <Home {...props} />} />
    <Route path="/login" render={props => <Login {...props} />} />
    <Route path="/mypage" render={props => <Mypage {...props} />} />
    <Route path="/product/list/:category/:page" render={props => <ProductList {...props} />} />
    <Route path="/product/detail/:id" render={props => <ProductDetail {...props} />} />
  </Switch>
)

export default withRouter(Router)