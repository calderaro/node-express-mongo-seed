import {createStore} from "reflux";
import userActions from "../actions/userActions";

export default createStore({
  listenables: userActions,
  init(){
    this.state = { 
      users: [],
      headers: ["ID","NOMBRE","TIPO"],
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      height: 'auto', 
    };
  },
  onLoadUsersCompleted: function(result) {
    let users = result.data.map((user) => ({ ID: user._id, NOMBRE: user.name, TIPO: user.type }));
    this.state.users = users;
    this.trigger(this.state);
  },
  onLoadUsersFailed: function() {
    console.log("load failed");
  }
});