import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

const renderRoot = () => ReactDOM.hydrate(<App />, document.getElementById('react-root'));

renderRoot();

if (process.env.NODE_ENV === 'development' && (module as any).hot) {
  (module as any).hot.accept('./app', renderRoot)
}