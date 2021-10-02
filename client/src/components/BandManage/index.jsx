/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { Fragment, useEffect, useMemo, useState } from 'react';
import LeaderBandList from './LeaderBandList';
import MyBandList from './MyBandList';

export default function BandManage(props) {
  const [cachedBands, setCachedBands] = useState([]);

  const { currentUser } = props;

  useEffect(() => {
    axios.get(`/api/bands/users/${currentUser.id}`).then((results) => {
      setCachedBands(results.data)
    })
  }, [])

  
  return (
    <Fragment>
      <LeaderBandList cachedBands={cachedBands} setCachedBands={setCachedBands} currentUser={currentUser} />
      <MyBandList cachedBands={cachedBands} setCachedBands={setCachedBands} currentUser={currentUser} />
    </Fragment>
  );
}