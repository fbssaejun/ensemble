import { useState, useEffect } from 'react';


export default function FormSpot(props) {
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [instrumentId, setInstrumentId] = useState("");
  const [description, setDescription] = useState("");



  useEffect(() => {
    props.onUpdate(props.index, {...props.spot,  title,  username,  instrumentId, description})
  }, [title, username, instrumentId, description])

  return(
    <div className="form-group-spot">
      <h2>New Spot</h2>
      <input type="text" placeholder="Title" onChange={({ target }) => setTitle(target.value)}/> <br/>
      <input type="text" placeholder="Username" onChange={({ target }) => setUsername(target.value)}/> <br/>
      <input type="text" placeholder="Instrument" onChange={({ target }) => setInstrumentId(target.value)}/> <br/>
      <textarea type="text" placeholder="Description" onChange={({ target }) => setDescription(target.value)}/> <br/>
      <button type="button" onClick={props.onDelete}>Delete</button>
    </div>
  )
}