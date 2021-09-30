import axios from 'axios';
import { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function Navbar(props) {
  const { userId } = useParams();
  const [userInst, setUserInst] = useState();
  const [userGenre, setUserGenre] = useState();
  const [allInst, setAllInst] = useState();

  useEffect(() => {


    Promise.all([
      axios.get(`/api/users/${userId}/edit`),
      axios.get('/api/instruments'),
      axios.get('/api/genres')
    ])
    
    .then(results => {
      setUserInst([...results.data.instResult])
      setUserGenre([...results.data.genreResult])
    })

    
    .then(results => {
      setAllInst([...results.data])
    })


  },[]);


  return (
    <Fragment>
      <h1> Abot You </h1>
      <h3>{JSON.stringify(userInst)}</h3>
      <h3>{JSON.stringify(userGenre)}</h3>
      {userInst && <Autocomplete
        multiple
        id="tags-outlined"
        options={allInst}
        getOptionLabel={(option) => option.name}
        defaultValue={[...userInst]}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="Your Instruments"
            placeholder="What Do You Play?"
          />
        )}
      />}
    </Fragment>

  );


}