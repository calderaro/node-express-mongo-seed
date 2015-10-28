"use strict";
import React from "react";
import { render } from "react-dom";
import { Router, Route, Link } from "react-router";
import Nav from "./components/Nav";
import Mercancias from "./components/Mercancias";
import maincss from "./styles/main.css";


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

render((
  <Router>
    <Route path="/" component={App}>
      <Route path="mercancias" component={Mercancias} />
      <Route path="pedidos" component={Mercancias} />
    </Route>
  </Router>
), document.querySelector('.app'))