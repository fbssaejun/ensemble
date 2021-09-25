import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Fragment } from 'react';

export default function UserProfile(props) {
  const { userId } = useParams();


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
    </Fragment>
  ) 
}