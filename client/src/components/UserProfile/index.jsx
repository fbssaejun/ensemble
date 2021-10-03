import { useParams } from 'react-router-dom';
import { useEffect, useState, Fragment } from 'react';
import MyBandList from './MyBandList';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import UserInfo from './UserInfo'

import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import './UserProfile.scss'

export default function UserProfile(props) {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState();


  useEffect(() => {
    axios.get(`/api/users/${userId}`).then((results) => {
      console.log(results.data)
      setUserInfo(results.data)
    })
  },[])

  return(
    <div className="user-profile-content">
      <Grid container alignItems="center" direction="row-reverse" spacing={4} columns={40}>
        <Grid item xs={25}>
          <MyBandList userId={userId} />
        </Grid>
        <Grid direction="column" item xs={15}>
          <UserInfo/>
        </Grid>
        <Grid item xs={25}>
          <h1>kek</h1>
        </Grid>
        <Grid item xs={15}>
          <h1>kek</h1>
        </Grid>
      </Grid>
    </div>

    // <div className="user-profile-content">
    //   {userInfo && <h1>{userInfo.first_name} {userInfo.last_name}</h1>}
    //   <MyBandList userId={userId} />
    // </div>) 
  )
}