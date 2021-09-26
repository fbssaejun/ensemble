import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


export default function CreateBandForm(props) {
  const [bandName, setBandName] = useState("");
  const [bandDesc, setBandDesc] = useState("");
  const [bandFeatured, setBandFeatured] = useState(false);
  const [bandImage, setBandImage] = useState("");
  const history = useHistory();

  const submitForm = (event) => {
    event.preventDefault();

    axios.post('/bands/new', {
      leader_id: props.currentUser,
      name: bandName,
      description: bandDesc,
      band_image: bandImage,
      featured: bandFeatured
    })
    .then(response => {
      const newBandId = response.data.result.id;
      history.push(`/bands/${newBandId}`)
    }).catch(e => console.log(e))

  }

  return(
    <form onSubmit={submitForm}>
      <div className="form-group-band">
        <h2>Create a new Band</h2>
        <input type="text" placeholder="Enter name of band" onChange={({ target }) => setBandName(target.value)}/> <br/>
        <textarea rows="10" cols="50" type="text" placeholder="Enter a band description" onChange={({ target }) => setBandDesc(target.value)}/> <br/>        
        <input type="text" placeholder="Link to picture" onChange={({ target }) => setBandImage(target.value)}/> <br/>
        <input type="checkbox" checked={bandFeatured} id="featuredCheck" onChange={() => setBandFeatured(!bandFeatured)}/>
        <label for="featuredCheck">Feature Band?</label> <br />
        <button type="submit">Create band</button>
      </div>
    </form>
  );

}