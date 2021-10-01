import axios from "axios";
import { useState } from "react";

export default function SpotApplication(props) {
  const { application } = props;
  const [acceptedStatus, setAcceptedStatus] = useState(application.accepted_status);
  
  const statusCheck = (status) => {
   switch(status) {
     case false:
      return "Rejected";
     case true:
      return "Accepted";
     default: 
      return "Pending";
   }
  }

  const applicationUpdate = (decision) => {
    axios.patch(`/api/applications/${application.id}`, {
      decision: decision, 
      user_id: application.user_id, 
      spot_id: application.spot_id
    }).then((results) => {
      console.log("after update status", results)
      const newStatus = results.data.result.rows[0].accepted_status;
      setAcceptedStatus(newStatus);
    })
  }


  return (
    <div>
      <h1>applicant: {application.username}</h1>
      <h1>message: {application.message}</h1>
      <h1>accepted status: {statusCheck(acceptedStatus)}</h1>
      <button onClick={(event) => {
        event.preventDefault();
        applicationUpdate(true)}}>Accept</button>
      <button onClick={(event) => {
        event.preventDefault();
        applicationUpdate(false)}}>Reject</button>
    </div>
  )
}