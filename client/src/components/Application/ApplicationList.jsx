import axios from "axios";
import Application from "./Application";
import { useState, useEffect, } from 'react';
import { useParams } from 'react-router-dom';

export default function ApplicationList (props) {
  const [applications, setApplications] = useState([]);
  const { userId } = useParams();
  console.log("whats userId:", userId)
  useEffect(() => {
    axios.get(`/api/applications/${userId}`).then((results) => {
      console.log("application get back", results);
      setApplications(() => [...results.data]);
    })

  }, [])

  const applicationArr = applications.map((application) => {
    return <Application 
      key={application.id}
      bandName={application.band_name} 
      description={application.description}
      title={application.title}
      instrument={application.instrument}
      message={application.message}
      acceptedStatus={application.accepted_status}
    />
  })

  return (
    <div>
      {applicationArr}
    </div>
  );
}