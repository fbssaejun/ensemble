import axios from "axios"
import { useEffect, useState } from "react"
import SpotApplicationListItem from './SpotApplicationListItem'

export default function SpotApplicationList(props) {
  const [applications, setApplications] = useState([]);
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
    <div>
      <h1>show spot applications</h1>
      {applicationArr}
    </div>
  )
}