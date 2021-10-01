import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import LeaderBandList from './LeaderBandList';
import MyBandList from './MyBandList';

export default function BandManage(props) {
  const [cachedBands, setCachedBands] = useState([]);

  const { currentUser } = props;
  console.log("current user in band manage", currentUser)

  useEffect(() => {
    axios.get(`/api/bands/users/${currentUser.id}`).then((results) => {
      console.log("what is the user info:", results)
      setCachedBands(results.data)
    })
  }, [])
  
  const leaderBands = cachedBands.filter((band) => {
    console.log("band leader id:", band.leader_id)
    console.log("current user id:", currentUser.id)
    return band.leader_id === currentUser.id;
  })

  console.log("cachedbands:", cachedBands)
  console.log("leader bands:", leaderBands)
  return (
    <Fragment>
      {/* <MyBand> -> <SpotsList> -> <Spot> */ }
      <LeaderBandList cachedBands={cachedBands} setCachedBands={setCachedBands} bands={leaderBands} currentUser={currentUser} />
      {/* This is for spots, with the band name  -> <BandIAmIn> -> <Spot> */}
      <MyBandList />
    </Fragment>
  );
}