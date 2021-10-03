import axios from "axios";
import { Fragment, useState } from "react";

export default function ApplicationForm(props) {
  const [message, setMessage] = useState("");
  const { spotId, currentUser, handleClose, displaySuccess } = props;

  const submitApplication = (event) => {
    event.preventDefault();
    axios.post(`/api/applications/${spotId}`, {message, userId:currentUser.id}).then((results)=>{
      console.log(results.data.message);
      displaySuccess()
      handleClose()
    })
  }

  return(
    <Fragment>
      <form onSubmit={submitApplication}>
        <button type="button" onClick={() => handleClose()}>X</button>
        <label for="message">Why do you want to apply?</label>
        <textarea id="message" placeholder="Enter your application message" onChange={({ target }) => setMessage(target.value)} />
        <button>Apply</button>
        <button type="button" onClick={() => handleClose()}>Cancel</button>
      </form>
    </Fragment>
  );
}