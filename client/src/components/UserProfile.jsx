import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function UserProfile(props) {
  const [state, setState] = useState();
  const { userId } = useParams();

  useEffect(() => {
    axios.get(`/api/users/${userId}`).then((all) => {
      const user = all.data;
      setState((prev) => ({...prev, user: user}))
    })
  }, []);

  return !state ? (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  ) : (
    <h1>
      {state.user.city}
    </h1>
  ) 
}