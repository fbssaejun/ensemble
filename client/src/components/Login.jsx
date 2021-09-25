import axios from 'axios';
import { Link } from 'react-router-dom';
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

  axios.post()

  return(
    <form onSubmit={loginCheck}>
      <div class="form-group">
<<<<<<< HEAD
        <input type="text" placeholder="Enter id"/>
        <button><Link to="/login">Login</Link></button>
=======
        <input type="text" placeholder="Enter id" onChange={({ target }) => setUserId(target.value)}/>
        <button type="submit"><Link to="/login">Login</Link></button>
>>>>>>> 1f344b5e3864ee6a3025c341c79766d13b6b1a51
      </div>
    </form>
  );

}