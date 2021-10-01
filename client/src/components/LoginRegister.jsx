import { useEffect, useState, Fragment } from 'react';
import './LoginRegister.scss';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';





export default function LoginRegister(props) {


  // Login States
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  // Signup States
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPassConf, setNewPassConf] = useState("");


  const history = useHistory();

  useEffect(() => {
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    const signUpButton = document.getElementById('signUp');
  
  
    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });
  
    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });

  }, [])

  const loginCheck = (event) => {
    event.preventDefault();
    axios.post('/api/login', {email : userEmail, password: userPassword})
    .then(response => {
      if (!response.data.length) {
        console.log("Invalid Credentials");
      } else {
        sessionStorage.setItem("id", response.data[0].id);
        sessionStorage.setItem("username", response.data[0].username);
        props.setState((prev) => ({ ...prev, currentUser: {id: Number(sessionStorage.getItem('id')), username: sessionStorage.getItem('username')} }));
        history.push('/');
      }
    }).catch(e => console.log(e))
  }

  const createNewUser = (event) => {
    event.preventDefault();

    if (newPass !== newPassConf) {
      console.log("Password does not match. New user not created");
      return
    }

    axios.post('/api/signup', {
      firstName, lastName, newUsername, newEmail, newPass
    })
    .then((response) => {
      props.setState((prev) => ({ ...prev, currentUser: {id: response.data[0].id, username: newUsername} }));
      sessionStorage.setItem("id", response.data[0].id);
      sessionStorage.setItem("username", response.data[0].username);
      history.push(`/`);
    })

  }

  return (
      <div class="container" id="container">
        <div class="form-container sign-up-container">
          <form onSubmit={createNewUser}>
            <h1>Create Account</h1>
            <div class="social-container">
              <a href="#" className="social"><i class="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i class="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i class="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
              <input type="text" placeholder="First Name" onChange={({ target }) => setFirstName(target.value)} />
              <input type="text" placeholder="Last Name" onChange={({ target }) => setLastName(target.value)} />
              <input type="text" placeholder="Username" onChange={({ target }) => setNewUsername(target.value)} />
              <input type="email" placeholder="Email" onChange={({ target }) => setNewEmail(target.value)} />
              <input type="password" placeholder="Password" onChange={({ target }) => setNewPass(target.value)} />
              <input type="password" placeholder="Password Confirmation" onChange={({ target }) => setNewPassConf(target.value)} />
            <button className="signin-signup">Sign Up</button>
          </form>
        </div>
        <div class="form-container sign-in-container">
          <form onSubmit={loginCheck}>
            <h1>Sign in</h1>
            <div class="social-container">
              <a href="#" className="social"><i class="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i class="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i class="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" onChange={({ target }) => setUserEmail(target.value)} />
            <input type="password" placeholder="Password" onChange={({ target }) => setUserPassword(target.value)} />
            <a href="#">Forgot your password?</a>
            <button className="signin-signup">Sign In</button>
          </form>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button class="ghost" id="signIn" className="signin-signup">Sign In</button>
            </div>
            <div class="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button class="ghost" id="signUp" className="signin-signup">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
  );
}