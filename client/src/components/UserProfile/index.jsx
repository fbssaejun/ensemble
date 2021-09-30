import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useEffect, useState, Fragment } from 'react';
import MyBandList from './MyBandList';
import axios from 'axios';

export default function UserProfile(props) {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState({});


  useEffect(() => {
    //axios get all user info
    axios.get(`/api/users/${userId}`).then((results) => {

      setUserInfo(results.data)
    })
  },[])

  const getUser = (users) => {
    for(const user of users) {
      if (user.id === Number(userId)) {
        return user;
      }
    }
  }

  const user = getUser(props.users)

  return !user ? (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  ) : (
    <Fragment>
      <h1>{user.first_name} {user.last_name}</h1>   
      <h1>{user.city}</h1>
      <MyBandList userId={userId} />
    </Fragment>
  ) 
}