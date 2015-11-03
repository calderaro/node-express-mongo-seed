"use strict";
import React from "react";
import { render } from "react-dom";
import { Router, Route, Link } from "react-router";
import { createHistory } from 'history'
import Login from "./components/general/Login";
import Nav from "./components/Nav";
import Mercancias from "./components/Mercancias";

import maincss from "./styles/main.css";
import purecss from "purecss/build/pure.css";

let App = React.createClass({
  render: function (){ 
    return (
      <div>
        <Nav />
        {this.props.children}
      </div>
    )
  }
})
function requireAuth(nextState, replaceState) {
  if (!localStorage.getItem('jwt')) {
    replaceState({ nextPathname: nextState.location.pathname }, '/login');
  }
}
render((
  <Router>
    <Route component={App} onEnter={requireAuth} >
      <Route path="/pedidos" component={Mercancias} />
      <Route path="/clientes" component={Mercancias} />
      <Route path="/estadisticas" component={Mercancias} />
      <Route path="/usuarios" component={Mercancias} />
    </Route>
    <Route path="/login" component={Login} />
  </Router>
), document.querySelector('.app'))