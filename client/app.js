"use strict";
import React from "react";
import { render } from "react-dom";
import { Router, Route, IndexRoute } from "react-router";

import Login from "./components/general/Login";
import Nav from "./components/Nav";
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
  if(!localStorage.getItem('jwt')) {
    replaceState({ nextPathname: nextState.location.pathname }, '/login');
  }
}
function handleOnLogout(nextState, replaceState) {
  localStorage.clear();
  replaceState({}, '/login');
}
render((
  <Router>
    <Route path="/" component={App} onEnter={requireAuth}>


      <Route path='/logout' onEnter={handleOnLogout} />
    </Route>
  <Route path="/login" component={Login} />
    
  </Router>
), document.querySelector('.app'));