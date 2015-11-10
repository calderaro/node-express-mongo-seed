import {createActions} from "reflux";
import axios from "axios";

const userActions = createActions({
  "loadUsers": { asyncResult: true },
});


userActions.loadUsers.listen(function() {
  axios({
    url: "/users",
    method: 'GET',
    headers: {"token": localStorage.getItem("jwt")},
  })
  .then(this.completed)
  .catch(this.failed);
});

export default userActions