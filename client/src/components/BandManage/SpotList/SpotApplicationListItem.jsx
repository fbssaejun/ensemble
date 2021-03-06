import axios from "axios";
import { useState } from "react";
import classnames from 'classnames';
import { Link } from "react-router-dom";

import './SpotApplicationListItem.scss';

export default function SpotApplicationListItem(props) {
  const { application, setAcceptedUser } = props;
  const [acceptedStatus, setAcceptedStatus] = useState(application.accepted_status);

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

  const bandURL = `/bands/${application.band_id}`;

  return (
    <div className="band-application">
      <span className={statusClassName}></span>
      <Link to={bandURL}>
        <div className="app-info-and-buttons">
          <span className="info-container">
            <h1 className="user-name">{application.username}</h1>
            <h5 className="user-info">
              Applying for spot: {application.spot_title} <br/>
              Instrument: {application.instrument_name} <br/>
              My message: {application.message}
            </h5>
          </span>
          <span className="acc-rej-buttons">
            <button className="app-button--accept second" onClick={(event) => {
              event.preventDefault();
              setAcceptedUser({spotId: application.spot_id, userId: application.user_id, profile_image: application.profile_image});
              applicationUpdate(true)}}>Accept</button>
            <button className="app-button--reject third" onClick={(event) => {
              event.preventDefault();
              applicationUpdate(false)}}>Reject</button>
          </span>
        </div>
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