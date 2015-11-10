"use strict";
import React from "react";
import { render } from "react-dom";
import { Router, Route, IndexRoute, Link } from "react-router";

import Login from "./components/general/Login";
import maincss from "./styles/main.css";

const AppBar = require('material-ui/lib/app-bar');
const Avatar = require('material-ui/lib/avatar');
const LeftNav = require('material-ui/lib/left-nav');
const Menu = require('material-ui/lib/menus/menu');
const MenuItem = require('material-ui/lib/menus/menu-item');
const MenuDivider = require('material-ui/lib/menus/menu-divider');
const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');
const Card = require('material-ui/lib/card/card');
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

let App = React.createClass({
  toggleLeftNav(){
    this.refs.leftNavChildren.toggle();
  },
  render(){ 
    return (
      <div>
        <AppBar
          title="Pruebas"
          iconClassNameRight="muidocs-icon-navigation-expand-more" 
          onLeftIconButtonTouchTap={this.toggleLeftNav} />
        <LeftNav ref="leftNavChildren" docked={false}>
          <MenuItem primaryText="Inicio" linkButton={true} href="#/" />
          <MenuItem primaryText="Usuarios" linkButton={true} href="#/usuarios" />
          <MenuItem primaryText="Underline" />
          <MenuItem primaryText="Strikethrough" />
          <MenuItem primaryText="Superscript" />
          <MenuItem primaryText="Subscript" />
          <MenuDivider />
          <MenuItem primaryText="Paragraph styles" />
          <MenuItem primaryText="Align" />
          <MenuItem primaryText="Line spacing" />
          <MenuItem primaryText="Numbered list" />
          <MenuItem primaryText="List options" />
          <MenuDivider />
          <MenuItem primaryText="Clear formatting" />
        </LeftNav>
        {this.props.children}
      </div>
    )
  }
})

const UsersForm = React.createClass({
  render(){
    return (
      <Tabs>
        <Tab label="Usuarios" >
          (Tab content...)
        </Tab>
        <Tab label="Nuevo" >
          (Tab content...)
        </Tab>
      </Tabs>
    )
  }
});

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

      <Route path="usuarios" component={UsersForm} />
      <Route path='/logout' onEnter={handleOnLogout} />
    </Route>
  <Route path="/login" component={Login} />
    
  </Router>
), document.querySelector('.app'));