import axios from "axios"
import { useEffect, useState } from "react"
import SpotApplicationListItem from './SpotApplicationListItem'

import './SpotApplicationList.scss';

export default function SpotApplicationList(props) {
  const [applications, setApplications] = useState([]);
  const [changed, setChanged] = useState(false);
  const { spotId } = props;

  useEffect(() => {
    axios.get(`/api/applications/owner/${spotId}`).then((results) => {
      setApplications(results.data);
    })
  }, [])

  const applicationArr = applications.map((application) => {
    return <SpotApplicationListItem application={application}/>
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
      }} className="confirm-applications-button">confirm</button>
    </div>
  )
}