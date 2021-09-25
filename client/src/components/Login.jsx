import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { chainPropTypes } from '@mui/utils';

export default function Login(props) {
  // const [state, setState] = useState();
  // const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const history = useHistory();
  
  const loginCheck = (event) => {
    event.preventDefault();
    axios.post('/login', {user_id : userId})
    .then(response => {
      if (!response.data.length) {
        console.log("No user")
      } else {
        props.setState((prev) => ({ ...prev, currentUser: response.data[0].id }));
        history.push('/');
      }
    }).catch(e => console.log(e))
  }

  return(
    <form onSubmit={loginCheck}>
      <div class="form-group">
        <input type="text" placeholder="Enter id" onChange={({ target }) => setUserId(target.value)}/>
        <button type="submit"><Link to="/login"></Link>Login</button>
      </div>
    </form>
  );

}