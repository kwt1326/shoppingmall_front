import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./app";

const AppRoot = () => <Router><App /></Router>

const renderRoot = () => ReactDOM.hydrate(<AppRoot />, document.getElementById('react-root'));

renderRoot();

if (process.env.NODE_ENV === 'development' && (module as any).hot) {
  (module as any).hot.accept('./app', renderRoot)
}