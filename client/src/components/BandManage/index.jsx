/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import LeaderBandList from './LeaderBandList';
import MyBandList from './MyBandList';

import './BandManage.scss';

export default function BandManage(props) {
  const [cachedBands, setCachedBands] = useState([]);

  const { currentUser } = props;

  useEffect(() => {
    axios.get(`/api/bands/users/${currentUser.id}`).then((results) => {
      setCachedBands(results.data)
    })
  }, [])

  
  return (
    <div className="all-band-lists-container">
      <span>
        <LeaderBandList cachedBands={cachedBands} setCachedBands={setCachedBands} currentUser={currentUser} />
      </span>
      <span>
        <MyBandList cachedBands={cachedBands} setCachedBands={setCachedBands} currentUser={currentUser} />
      </span>
    </div>
  );
}