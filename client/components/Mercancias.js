"use strict";
import React from "react";
import List from "./lists/List";
import req from "superagent";
export default React.createClass({
	getInitialState: function() {
    	return {bar: false, rows: []};
  	},
  	componentDidMount: function(){
  		req
		.get('/users')
		.set("token", localStorage.getItem("jwt"))
		.end((err, res) => {
		    if(err) return console.log(err);
		    this.setState({rows: res.body})
		});
  	},
	render: function() {
		return (
			<div className="container1">
				<List rows={this.state.rows} />		
			</div>
		)
	}
})