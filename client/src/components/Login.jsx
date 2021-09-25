import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { chainPropTypes } from '@mui/utils';

export default function Login(props) {
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const [error, setError] = useState(undefined);
  const history = useHistory();
  
  const loginCheck = (event) => {
    event.preventDefault();
    axios.post('/login', {email : userEmail, password: userPassword})
    .then(response => {
      if (!response.data.length) {
        setError(prev => "bleh");
        console.log("No user")
      } else {
        props.setState((prev) => ({ ...prev, currentUser: response.data[0].id }));
        setError(prev => undefined)
        history.push('/');
      }
    }).catch(e => console.log(e))
  }

  return(
    <form onSubmit={loginCheck}>
      <div className="form-group">
        <input type="text" placeholder="Enter email" onChange={({ target }) => setUserEmail(target.value)}/> <br/>
        <input type="text" placeholder="Enter password" onChange={({ target }) => setUserPassword(target.value)}/> <br/>
        <button type="submit"><Link to="/login"></Link>Sign In</button>
      </div>
      {error && (
        <div className="error">
          <h4> Wrong Credentials </h4>
        </div>
        )}
    </form>     
      
  );

}