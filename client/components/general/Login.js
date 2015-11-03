"use strict";
import React from "react";
import req from "superagent";
import logincss from "../../styles/login.css";

export default	React.createClass({
	getInitialState(){
		return{
			err: ""
		}
	},
	handleSubmit(event) {
	    event.preventDefault()

	    const username = this.refs.username.value
	    const userpass = this.refs.userpass.value

		req
	    .post('/login')
	   	.send({ username, userpass })
	   	.end((err, res) => {
	   		if(err){
	   			this.setState({err: res.body});
	   			return;
	   		}
	   		localStorage.setItem("jwt", res.body);

	    	const { location, history } = this.props

	    	if (location.state && location.state.nextPathname) {
	    		history.replaceState(null, location.state.nextPathname)
	    	} else {
	    		history.replaceState(null, '/pedidos')
	    	}
		});
  	},
	render(){
		return(
			<div className="loginForm"  onSubmit={this.handleSubmit} >
				<form className="pure-form">
					<input type="text" ref="username" />
					<input type="password" ref="userpass" />
					<div className="errmsg">{this.state.err}</div>
					<input type="submit" className="pure-button pure-button-primary" />
				</form>
			</div>
		)
	}
})