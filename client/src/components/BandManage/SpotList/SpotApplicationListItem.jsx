import axios from "axios";
import { useState } from "react";
import classnames from 'classnames';

export default function SpotApplicationListItem(props) {
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
      const newStatus = results.data.result.rows[0].accepted_status;
      setAcceptedStatus(newStatus);
    })
  }

  const statusClassName = classnames('application-status', {
    'application-status--pending' : acceptedStatus === null,
    'application-status--accepted' : acceptedStatus,
    'application-status--rejected' : acceptedStatus!== null && !acceptedStatus
  })

  return (
    <div className="band-application">
      <span className={statusClassName}></span>
      <Link to={bandURL}>
        <span className="info-container">
          <h1 className="band-name">{bandName}</h1>
          <h5 className="band-info">
            Applying for spot: {title} <br/>
            Instrument: {instrument} <br/>
            Spot Description: {description} <br/>
            My message: {message}
          </h5>
        </span>
      </Link>
    </div>
    // <div>
    //   <h1>applicant: {application.username}</h1>
    //   <h1>message: {application.message}</h1>
    //   <h1>accepted status: {statusCheck(acceptedStatus)}</h1>
    //   <button onClick={(event) => {
    //     event.preventDefault();
    //     applicationUpdate(true)}}>Accept</button>
    //   <button onClick={(event) => {
    //     event.preventDefault();
    //     applicationUpdate(false)}}>Reject</button>
    // </div>
  )
}