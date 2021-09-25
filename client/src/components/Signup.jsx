import { Link } from 'react-router-dom';


export default function Register(props) {

  return(
    <form>
      <div className="form-group">
        <input type="text" placeholder="Enter email"/>
        <button><Link to="/signup">Sign Up</Link></button>
      </div>
    </form>
  );

}