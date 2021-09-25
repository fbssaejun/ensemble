import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Login(props) {

  axios.post()

  return(
    <form>
      <div class="form-group">
        <input type="text" placeholder="Enter id"/>
        <button><Link to="/login">Login</Link></button>
      </div>
    </form>
  );

}