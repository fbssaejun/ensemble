import axios from "axios";
import { useState, Fragment } from "react";

export default function ApplicationForm(props) {
  const [message, setMessage] = useState("");
  const { spotId, currentUser } = props;

  const submitApplication = (event) => {
    event.preventDefault();
    axios.post(`/api/applications/${spotId}`, {message, userId:currentUser.id}).then((results)=>{
      console.log(results.data.message);
    })
  }
  return(
    <Fragment>
      <h1>THIS IS CURRENT USER: {currentUser.id}</h1>
      <form onSubmit={submitApplication}>
        <button type="button" onClick={props.onClick}>X</button>
        <label for="message">Why do you want to apply?</label>
        <textarea id="message" placeholder="Enter your application message" onChange={({ target }) => setMessage(target.value)} />
        <button >Apply</button>
        <button type="button" onClick={props.onClick}>Cancel</button>
      </form>

    </Fragment>
  );
}