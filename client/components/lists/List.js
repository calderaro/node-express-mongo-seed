"use strict";
import React from "react";
export default	React.createClass({
	render: function(){
		console.log(this.props.rows);
		return(
			<ul>
				{
					this.props.rows.map((row) => <li key={row._id}>{ row.name}</li>)
				}
			</ul>
		)
	}
})