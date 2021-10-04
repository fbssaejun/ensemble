import axios from "axios";
import { useState, useEffect } from "react"
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import './EditBandForm.scss'

export default function EditBandForm(props) {

  const { name, description, image, bandId, featured, cachedBands, setCachedBands } = props.bandInfo;
  const [nameVal, setNameVal] = useState(name);
  const [descrVal, setDescrVal] = useState(description);
  const [imageVal, setImageVal] = useState(image);
  const [featuredVal, setFeaturedVal] = useState(featured)

  const [allGenre, setAllGenre] = useState([]);
  const [bandGenre, setBandGenre] = useState([]);
  const [defaultGenre, setDefaultGenre] = useState([]);

  useEffect(() => {

    Promise.all([
      axios.get(`/api/bands/${bandId}/edit`),
      axios.get('/api/genres')
    ])
    .then((all) => {
      const bandGenreInfo = all[0].data;
      const genre = all[1].data;

      setDefaultGenre([...bandGenreInfo]);
      setBandGenre([...bandGenreInfo])
      setAllGenre([...genre]);

      console.log("genre", genre)
      console.log("bandGenre", bandGenreInfo)
      console.log("bandID", bandId)

    })


  },[]);


  const submitEditForm = () => {
    // event.preventDefault();

    axios.patch(`/api/bands/${bandId}`, {
        name: nameVal,
        description: descrVal,
        band_image: imageVal,
        featured: featuredVal,
        bandGenre: bandGenre
        }).then((results) => {
      const updatedBand = results.data.result.rows[0];
      let updatedBandIndex = 0;
      for (let i=0; i < cachedBands.length; i++) {
        if (cachedBands[i].id === updatedBand.id) {
          updatedBandIndex = i;
        }
      }
      const newBands = [...cachedBands]
      newBands.splice(updatedBandIndex, 1, updatedBand);
      setCachedBands(() => newBands);
    })
  }

  const deleteBand = (bandId) => {
    axios.delete(`/api/bands/${bandId}`).then((results) => {
      const newBands = cachedBands.filter((band) => band.id !== results.data.result.rows[0].id)
      setCachedBands(() => newBands);
    });
  }


  const preSelected = (bandOptions, allOptions) => {
    const retArr = [];

    // First, take the bandOptions array (which is an
    // array of objects with id and name of item)
    // and convert it to an object with id as the key.

    const bandOptionsObj = bandOptions.reduce(
    (obj, item) => Object.assign(obj, { [item.id]: item.name }), {});

    // Then, use for loop to check which of allOptions is already
    // in the bandOptionsObj by looking for the id value.

    for (const item of allOptions) {
      if(bandOptionsObj[item.id]) {
        retArr.push(item)
      }
    }

    return retArr;

  };

  
  return(
    <div className="edit-band-container">
      <div className="edit-band-form-close-button">
        <span></span>
        <button className="delete-button" onClick={props.onClose}>X</button>
      </div>
      <h2 className="edit-form-title">Change Band Info</h2>
      <form className="edit-band-form-inputs">
        <label>Band Name</label>
        <input placeholder="Enter new band name" value={nameVal} onChange={({target}) => setNameVal(target.value)}></input>
        <label>Description</label>
        <input placeholder="Enter new description" value={descrVal} onChange={({target}) => setDescrVal(target.value)}></input>
        <label>Image URL</label>
        <input placeholder="Enter new image URL" value={imageVal} onChange={({target}) => setImageVal(target.value)}></input>
        <label>Band Genre</label>
        {(allGenre.length !== 0) && <Autocomplete
            multiple
            onChange={(event, value) => setBandGenre(value)}
            id="tags-outlined"
            sx={{ minWidth: "100%" }}
            options={allGenre}
            getOptionLabel={(option) => option.name}
            defaultValue={preSelected(defaultGenre, allGenre)}
            Genres
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Add More Genres"
              />
            )}
          />
          }

          <label htmlFor="check"> Featured </label><br/>
          <div id="container">
          <input id="featured" type="checkbox" name="check" checked={featuredVal} onChange={() => setFeaturedVal((prev) => !prev)}></input>
          <label for="check"><div></div></label>
        </div>


        {/* <div id="container">
          <input type="checkbox" name="check" checked={bandFeatured} onChange={() => setBandFeatured(!bandFeatured)}/>
          <label for="check"><div></div></label>
        </div> */}

        <div className="band-form-bottom-buttons">
          <span><button type="button" 
            className="edit-band-button second"
            onClick={(event) => {
            event.preventDefault();
            submitEditForm()
          }}>Submit</button></span>
          <span><button 
            className="edit-band-button third"
            onClick={(event) => {
            event.preventDefault();
            deleteBand(bandId);
          }
          }>Delete</button></span>
        </div>
      </form>
    </div>
  )
}