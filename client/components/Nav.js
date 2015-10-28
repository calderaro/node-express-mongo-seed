"use strict";
import React from "react";
import { Link } from "react-router";
import navcss from "../styles/nav.css";
export default	React.createClass({
	render: () => {
		return(
			<nav>
				<div> 
					<div className="menuBtn"></div>
					<div className="logo"></div>
				</div>
				<div> 
					<div className="alerts"></div>
					<div className="userPhoto"></div>
				</div>
			</nav>
		)
	}
})