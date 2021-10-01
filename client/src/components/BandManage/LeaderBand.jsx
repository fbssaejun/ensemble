/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState } from 'react';
import SpotList from './SpotList';
import EditBandForm from './EditBandForm';
import axios from 'axios';


export default function LeaderBand(props) {
  const [spots, setSpots] = useState([]);
  const [showEditBandForm, setShowEditBandForm] = useState(false);
  const { name, description, image, bandId, currentUser, featured, cachedBands, setCachedBands } = props;

  useEffect(()=> {
    axios.get(`/api/spots/bands/${bandId}`).then((results) => {
      setSpots(results.data)
    })
  }, [])


  return (
    <Fragment>
      
      <h2>Band Name: {name}</h2>
      <button onClick={() => setShowEditBandForm((prev) => !prev)}>edit band</button>
      {showEditBandForm && 
        <EditBandForm 
          setCachedBands={setCachedBands} 
          onClose={() => setShowEditBandForm((prev) => !prev)} 
          bandInfo={props} 
        />}
      <SpotList bandId={bandId} currentUser={currentUser} spots={spots} setSpots={setSpots}/>
      

    </Fragment>
    
  )
}
