import axios from "axios";
import { Fragment, useState } from "react";
import "./ApplicationForm.scss"

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
        <label className="band-application-label" for="message">Send your application to the band leader!</label>
        <textarea className="band-application-message" id="message" placeholder="Enter your application message" onChange={({ target }) => setMessage(target.value)} />
        <div className="band-appplication-button-container">
          <button className="band-application-button second" >Apply</button>
          <button className="band-application-button third" type="button" onClick={() => handleClose()}>Cancel</button>
        </div>
      </form>
    </Fragment>
  );
}