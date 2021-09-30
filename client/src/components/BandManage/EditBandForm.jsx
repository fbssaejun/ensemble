import axios from "axios";
import { Fragment, useState } from "react"
export default function EditBandForm(props) {

  const { name, description, image, bandId, featured, cachedBands } = props.bandInfo;
  const [nameVal, setNameVal] = useState(name);
  const [descrVal, setDescrVal] = useState(description);
  const [imageVal, setImageVal] = useState(image);
  const [featuredVal, setFeaturedVal] = useState(featured)

  console.log("inside edit band form", cachedBands)
  const submitEditForm = (event) => {
    event.preventDefault();

    axios.patch(`/api/bands/${bandId}`, {name: nameVal, description: descrVal, band_image: imageVal, featured: featuredVal}).then((results) => {
      console.log(results)
    })
  }

  const deleteBand = (bandId) => {
    axios.delete(`/api/bands/${bandId}`).then((results) => {
      const newBands = cachedBands.filter((band) => band.id !== results.data.result.rows[0].id)
      props.setCachedBands((prev) => [...newBands])
    });
  }
  
  return(
    <Fragment>
      <h1>edit band form</h1>
      <button onClick={props.onClose}>X</button>
      <form onSubmit={submitEditForm}>
        <input value={nameVal} onChange={({target})=>setNameVal(target.value)}></input>
        <input value={descrVal} onChange={({target}) => setDescrVal(target.value)}></input>
        <input value={imageVal} onChange={({target}) => setImageVal(target.value)}></input>
        <input type="checkbox" checked={featuredVal} onChange={() => setFeaturedVal((prev) => !prev)}></input>
        <button>Submit</button>
        <button onClick={(event) => {
          event.preventDefault();
          deleteBand(bandId);
         }
        }>Delete</button>
      </form>
      
    </Fragment>
  )
}