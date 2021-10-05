/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
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

      <div className="manage-bands-container">
        <LeaderBandList cachedBands={cachedBands} setCachedBands={setCachedBands} currentUser={currentUser} />
      </div>
      
      <div className="involved-bands-container">
        <MyBandList cachedBands={cachedBands} setCachedBands={setCachedBands} currentUser={currentUser} />
      </div>

    </div>
  );
}