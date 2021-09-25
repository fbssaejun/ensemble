import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { chainPropTypes } from '@mui/utils';

export default function Login(props) {
  // const [state, setState] = useState();
  // const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  
  const loginCheck = (event) => {
    event.preventDefault();
    axios.post('/login', {user_id : userId})
    .then(response => {
      if (!response.data.length) {
        console.log("No user")
      } else {
        props.setState((prev) => ({ ...prev, currentUser: response.data[0].id }));
      }
    }).catch(e => console.log(e))
  }

  return(
    <form onSubmit={loginCheck}>
      <div class="form-group">
        <input type="text" placeholder="Enter id" onChange={({ target }) => setUserId(target.value)}/>
        <button type="submit"><Link to="/login">Login</Link></button>
      </div>
    </form>
  );

}