import { Link } from 'react-router-dom';


export default function Login(props) {

  return(
    <form>
      <div class="form-group">
        <input type="text" placeholder="Enter email"/>
        <button><Link to="/login">Login</Link></button>
      </div>
    </form>
  );

}