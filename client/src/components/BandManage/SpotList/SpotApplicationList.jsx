import axios from "axios"
import { useEffect, useState } from "react"
import SpotApplicationListItem from './SpotApplicationListItem'

import './SpotApplicationList.scss';


export default function SpotApplicationList(props) {
  const [applications, setApplications] = useState([]);
  const [acceptedUser, setAcceptedUser] = useState({});
  const { spotId, spots, setSpots } = props;

  const updateSpots = () => {
    if (Object.keys(acceptedUser).length !== 0) {
      const newSpots = [...spots];
      for(let i = 0; i < newSpots.length; i++) {
        if (newSpots[i].id === acceptedUser.spotId) {
          newSpots[i].user_id = acceptedUser.userId;
          newSpots[i].profile_image = acceptedUser.profile_image;
        }
      }
      setSpots(newSpots);
    }
  }

  useEffect(() => {
    axios.get(`/api/applications/owner/${spotId}`).then((results) => {
      setApplications(results.data);
    })
  }, [])

  const applicationArr = applications.map((application) => {
    return <SpotApplicationListItem setAcceptedUser={setAcceptedUser} application={application}/>
  })

  return (
    <div className="spot-application-list-container">
      <h2>Spot applications</h2>
      <div className="spot-application-list">
        {applicationArr.length === 0 && <h5>No Applications Yet!</h5>}
        {applicationArr}
      </div>
      <button onClick={(event)=> {
        event.preventDefault();
        updateSpots();
      }} className="confirm-applications-button">confirm</button>
    </div>
  )
}