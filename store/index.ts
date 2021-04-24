import { createStore, applyMiddleware, Middleware, StoreEnhancer, AnyAction } from 'redux';
import { MakeStore, createWrapper } from 'next-redux-wrapper';
import reducer from '../store/reducers';

const bindMiddleware = (middleware: Middleware[]): StoreEnhancer => {
  if (process.env.NODE_ENV !== 'production') {
      const { composeWithDevTools } = require('redux-devtools-extension');
      return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
}

const makeStore: any = () => { // MakeStore<{}, AnyAction> # type error
  const store = createStore(reducer, {}, bindMiddleware([]));
  return store
}

const wrapper = createWrapper<{}>(makeStore, { debug: false });

export default wrapper;