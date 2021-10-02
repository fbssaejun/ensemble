import axios from "axios";
import { useState } from "react"

import './EditBandForm.scss'

export default function EditBandForm(props) {

  const { name, description, image, bandId, featured, cachedBands, setCachedBands } = props.bandInfo;
  const [nameVal, setNameVal] = useState(name);
  const [descrVal, setDescrVal] = useState(description);
  const [imageVal, setImageVal] = useState(image);
  const [featuredVal, setFeaturedVal] = useState(featured)

  const submitEditForm = () => {
    // event.preventDefault();

    axios.patch(`/api/bands/${bandId}`, {name: nameVal, description: descrVal, band_image: imageVal, featured: featuredVal}).then((results) => {
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
  
  return(
    <div className="edit-band-form">
      <h1>edit band form</h1>
      <button onClick={props.onClose}>X</button>
      <form>
        <input placeholder="Enter new band name" value={nameVal} onChange={({target}) => setNameVal(target.value)}></input>
        <input placeholder="Enter new description" value={descrVal} onChange={({target}) => setDescrVal(target.value)}></input>
        <input placeholder="Enter new image URL" value={imageVal} onChange={({target}) => setImageVal(target.value)}></input>
        <label> Featured
          <input type="checkbox" checked={featuredVal} onChange={() => setFeaturedVal((prev) => !prev)}></input>
        </label>
        <button type="button" onClick={(event) => {
          event.preventDefault();
          submitEditForm()
        }}>Submit</button>
        <button onClick={(event) => {
          event.preventDefault();
          deleteBand(bandId);
         }
        }>Delete</button>
      </form>
      
    </div>
  )
}