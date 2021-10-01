import { Fragment, useEffect, useState } from 'react';
import SpotList from './SpotList';
import EditBandForm from './EditBandForm';
import axios from 'axios';


export default function MyBand(props) {
  const [spots, setSpots] = useState([]);
  const [showEditBandForm, setShowEditBandForm] = useState(false);
  const { name, description, image, bandId, currentUser, featured, bands } = props;

  console.log("inside my band", bands)
  useEffect(()=> {
    axios.get(`/api/spots/bands/${bandId}`).then((results) => {
      console.log("my band:", results.data)
      setSpots(results.data)
    })
  }, [])

  return (
    <Fragment>
      
      <h2>Band: {name}</h2>
      <button onClick={() => setShowEditBandForm((prev) => !prev)}>edit band</button>
      {showEditBandForm && <EditBandForm setCachedBands={props.setCachedBands} onClose={() => setShowEditBandForm((prev) => !prev)} bandInfo={props}></EditBandForm>}
      <SpotList bandId={bandId} currentUser={currentUser} spots={spots} setSpots={setSpots}/>
      

    </Fragment>
    
  )
}
