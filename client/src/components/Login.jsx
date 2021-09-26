import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { chainPropTypes } from '@mui/utils';
import './Login.scss'

export default function Login(props) {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState(undefined);
  const history = useHistory();
  
  const loginCheck = (event) => {
    event.preventDefault();
    if (userEmail === "") {
      setError(prev => "Please enter a valid email")
      return
    } 
    if (userPassword === "") {
      setError(prev => "Please enter a password")
      return
    }
    axios.post('/login', {email : userEmail, password: userPassword})
    .then(response => {
      if (!response.data.length) {
        setError(prev => "Invalid Credentials");
      } else {
        props.setState((prev) => ({ ...prev, currentUser: response.data[0].id }));
        setError(prev => undefined)
        history.push('/');
      }
    }).catch(e => console.log(e))
  }

  return(
    <form onSubmit={loginCheck}>
      <div className="form-group-login">
        <h2>Login</h2>
        <input type="text" placeholder="Enter email" onChange={({ target }) => setUserEmail(target.value)}/> <br/>
        <input type="password" placeholder="Enter password" onChange={({ target }) => setUserPassword(target.value)}/> <br/>
        <button type="submit"><Link to="/login"></Link>Sign In</button>
      </div>
      <ul className="animation-area box-area">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      {error && (
        <div className="error">
          <h4>{error}</h4>
        </div>
        )}
    </form>     
      
  );

}