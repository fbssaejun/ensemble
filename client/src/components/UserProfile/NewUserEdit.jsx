import { useState, Fragment } from 'react';
import axios from "axios";

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';


export default function NewUserEdit(props) {

  const { userId, userInst, setUserInst, userGenre, setUserGenre, 
  allInst, allGenre, defaultInst, defaultGenre, handleClose } = props;


  const preSelected = (userOptions, allOptions) => {
    const retArr = [];

    // First, take the userOptions array (which is an
    // array of objects with id and name of item)
    // and convert it to an object with id as the key.

    const userOptionsObj = userOptions.reduce(
    (obj, item) => Object.assign(obj, { [item.id]: item.name }), {});

    // Then, use for loop to check which of allOptions is already
    // in the userOptionsObj by looking for the id value.

    for (const item of allOptions) {
      if(userOptionsObj[item.id]) {
        retArr.push(item)
      }
    }

    return retArr;

  };
  
  const submitOptions = (event) => {
    event.preventDefault();

    axios.post(`/api/users/${userId}/edit`, {userInst, userGenre})
    .then(results => {
      handleClose()
    })
  }

  return (
    <Fragment>
      <br />
        <form onSubmit={submitOptions}>
          <Stack spacing={2} sx={{ width: 300 }}>
            <h3> Your Instruments </h3>
            <Autocomplete
              multiple
              onChange={(event, value) => setUserInst(value)}
              id="tags-outlined"
              options={allInst}
              getOptionLabel={(option) => option.name}
              defaultValue={preSelected(defaultInst, allInst)}
              Instruments
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Instruments"
                  placeholder="Add More Instruments"
                />
              )}
            />
            <h3> Your Genres </h3>
            <Autocomplete
              multiple
              onChange={(event, value) => setUserGenre(value)}
              id="tags-outlined"
              options={allGenre}
              getOptionLabel={(option) => option.name}
              defaultValue={preSelected(defaultGenre, allGenre)}
              Genres
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Genres"
                  placeholder="Add More Genres"
                />
              )}
            />
          </Stack>
          <button className="edit-button">Submit</button>             
      </form>
    </Fragment>
  );
}