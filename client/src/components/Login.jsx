import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import './Login.scss'

export default function Login(props) {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState(undefined);
  const history = useHistory();
  
  const loginCheck = (event) => {
    event.preventDefault();
    if (userEmail === "") {
      setError("Please enter a valid email")
      return
    } 
    if (userPassword === "") {
      setError("Please enter a password")
      return
    }
    axios.post('/api/login', {email : userEmail, password: userPassword})
    .then(response => {
      if (!response.data.length) {
        setError("Invalid Credentials");
      } else {
        props.setState((prev) => ({ ...prev, currentUser: {id: response.data[0].id, username: response.data[0].username} }));
        setError(undefined)
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