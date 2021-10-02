import axios from "axios";
import Application from "./Application";
import { useState, useEffect, } from 'react';
import { useParams } from 'react-router-dom';

import './ApplicationList.scss'

export default function ApplicationList (props) {
  const [applications, setApplications] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    axios.get(`/api/applications/${userId}`).then((results) => {
      setApplications(() => [...results.data]);
    })

  }, [])

  const applicationArr = applications.map((application) => {
    return <Application 
      key={application.id}
      bandName={application.band_name} 
      bandId={application.band_id}
      description={application.description}
      title={application.title}
      instrument={application.instrument}
      message={application.message}
      acceptedStatus={application.accepted_status}
    />
  })

  return (
    <div className="application-list-container">
      {applicationArr}
    </div>
  );
}