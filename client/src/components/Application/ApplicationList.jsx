import axios from "axios";
import Application from "./Application";
import { useState, useEffect, Fragment} from 'react';
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
  <Fragment>
  {applications.length ?   
    <Fragment>
      <div className="application-list-container">
        {applicationArr}
      </div>
    </Fragment>
  :
    <Fragment>
      <div className="application-list-container">
      <p className="profile-desc">You don't have any applications</p>
      </div>
    </Fragment>
  }
  </Fragment>
  );

}