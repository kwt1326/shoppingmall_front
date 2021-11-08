import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import loadable from '@loadable/component';

// pages
const Home = loadable(() => import('./pages/home'))
const Login = loadable(() => import('./pages/login'));
const SignUp = loadable(() => import('./pages/signup'));
const Mypage = loadable(() => import('./pages/mypage'));
const Cart = loadable(() => import('./pages/cart'));
const ProductList = loadable(() => import('./pages/productList'));
const ProductDetail = loadable(() => import('./pages/productDetail'));

const Router = () => (
  <Switch>
    <Route exact path="/" render={props => <Home {...props} />} />
    <Route path="/home" render={props => <Home {...props} />} />
    <Route path="/login" render={props => <Login {...props} />} />
    <Route path="/signup" render={props => <SignUp {...props} />} />
    <Route path="/mypage" render={props => <Mypage {...props} />} />
    <Route path="/cart" render={props => <Cart {...props} />} />
    <Route path="/product/list/:category/:page" render={props => <ProductList {...props} />} />
    <Route path="/product/detail/:id" render={props => <ProductDetail {...props} />} />
  </Switch>
)

export default withRouter(Router)