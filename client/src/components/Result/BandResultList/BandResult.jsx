import axios from 'axios';
import { useState, Fragment, useEffect } from 'react';
import SpotList from './SpotList'


export default function BandResult(props) {
  const [spots, setSpots] = useState([]);
  const { bandId } = props;

  //axios get all the spots for this band
  useEffect(() => {
    axios.get(`/api/spots/bands/${bandId}`).then((results) => {
      console.log("what we got back in band result:", results)
      setSpots(() => [...results.data]);
    }).catch((e)=>{console.log("wtf error", e)})
  }, [])
 

  
  return (
    <Fragment>
      <h1>{props.name}</h1>
      <SpotList spots={spots} currentUser={props.currentUser}></SpotList>
    </Fragment>
  
  );
}