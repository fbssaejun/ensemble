import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import MyBandList from './MyBandList';

export default function BandManage(props) {
  const [myBands, setMyBands] = useState([]);

  const { currentUser } = props;

  useEffect(() => {
    axios.get(`/api/bands/users/${currentUser.id}`).then((results) => {
      setMyBands(results.data)
    })
  }, [])
  
  const leaderBands = myBands.filter((band) => {
    return band.leader_id === currentUser.id;
  })

  return (
    <Fragment>
      {/* <MyBand> -> <SpotsList> -> <Spot> */ }
      <MyBandList bands={leaderBands} currentUser={currentUser} /> 
      {/* This is for spots, with the band name  -> <BandIAmIn> -> <Spot> */}
      {/* <MyBandList /> */}
    </Fragment>
  );
}