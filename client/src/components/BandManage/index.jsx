import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import LeaderBandList from './LeaderBandList';

export default function BandManage(props) {
  const [cachedBands, setCachedBands] = useState([]);

  const { currentUser } = props;

  useEffect(() => {
    axios.get(`/api/bands/users/${currentUser.id}`).then((results) => {
      setCachedBands(results.data)
    })
  }, [])
  
  const leaderBands = cachedBands.filter((band) => {
    return band.leader_id === currentUser.id;
  })

  return (
    <Fragment>
      {/* <MyBand> -> <SpotsList> -> <Spot> */ }
      <LeaderBandList cachedBands={cachedBands} setCachedBands={setCachedBands} bands={leaderBands} currentUser={currentUser} />
      {/* This is for spots, with the band name  -> <BandIAmIn> -> <Spot> */}
      {/* <MyBandList /> */}
    </Fragment>
  );
}