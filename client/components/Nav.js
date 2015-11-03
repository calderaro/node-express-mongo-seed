"use strict";
import React from "react";
import { Link } from "react-router";
import navcss from "../styles/nav.css";
import list from "./lists/List";

export default	React.createClass({
	getInitialState: function() {
    	return {bar: false};
  	},
	toggleMenu: function() {
		let bar = this.state.bar;
		this.setState({bar: !bar});
	},
	render: function(){
		return(
			<nav>
				<div className="top">
					<div> 
						<div className="menuBtn" onClick={this.toggleMenu} ></div>
						<div className="logo"></div>
					</div>
					<div> 
						<div className="alerts"></div>
						<div className="userPhoto"></div>
					</div>
				</div>
				<div className={ this.state.bar ? "sideBarOpen" : "sideBarClosed"} onClick={this.toggleMenu} >
					<div className="bar"  onClick={(e) => { e.stopPropagation() } }>
						<ul>
							<Link to="/pedidos"><li>Pedidos</li></Link>
							<Link to="/pedidos"><li>Clientes</li></Link>
							<Link to="/pedidos"><li>Estadisticas</li></Link>
							<Link to="/pedidos"><li>Usuarios</li></Link>
						</ul>
					</div>
				</div>
			</nav>
		)
	}
})