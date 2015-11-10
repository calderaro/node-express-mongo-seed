"use strict";
import React from "react";
import userActions from "../actions/userActions";
import usersStore from "../stores/usersStore";

const Table = require('material-ui/lib/table/table');
const TableBody = require('material-ui/lib/table/table-body');
const TableFooter = require('material-ui/lib/table/table-footer');
const TableHeader = require('material-ui/lib/table/table-header');
const TableHeaderColumn = require('material-ui/lib/table/table-header-column');
const TableRow = require('material-ui/lib/table/table-row');
const TableRowColumn = require('material-ui/lib/table/table-row-column');

export default React.createClass({
  getInitialState(){
    return { users: [], headers: [] };
  },
  componentWillMount() {
    userActions.loadUsers();
  },
  componentDidMount() {
    this._unsubscribe = usersStore.listen(this._updateState);
  },
  componentWillUnmount() {
    this._unsubscribe();
  },
  _updateState(newState) {
    this.setState(newState);
  },
  render(){ 
    let headers = this.state.headers.map((header) => (
      <TableHeaderColumn tooltip={header}>{header}</TableHeaderColumn>
    ))
    let rows = this.state.users.map((user, key) => (
      <TableRow>
        <TableRowColumn>{user.ID}</TableRowColumn>
        <TableRowColumn>{user.NOMBRE}</TableRowColumn>
        <TableRowColumn>{user.TIPO}</TableRowColumn>
      </TableRow>
    ))
    return (
      <div>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
          onRowSelection={this._onRowSelection}>
          <TableHeader enableSelectAll={this.state.enableSelectAll}>
            <TableRow>
              {headers}
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}>
            {rows}
          </TableBody>
        </Table>
      </div>
    )
  }
})