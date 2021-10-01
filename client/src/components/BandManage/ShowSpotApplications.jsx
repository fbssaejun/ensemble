import axios from "axios"
import { useEffect, useState } from "react"
import SpotApplication from './SpotApplication'

export default function ShowSpotApplications(props) {
  const [applications, setApplications] = useState([]);
  const { spotId } = props;
  console.log(spotId)

  useEffect(() => {
    axios.get(`/api/applications/owner/${spotId}`).then((results) => {
      console.log(results)
      setApplications(results.data);
    })
  }, [])

  const applicationArr = applications.map((application) => {
    return <SpotApplication application={application}/>
  })

  return (
    <div>
      <h1>show spot applications</h1>
      {applicationArr}
    </div>
  )
}