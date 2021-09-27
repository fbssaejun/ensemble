import { useState, useEffect } from 'react';


export default function Spot(props) {
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");


  useEffect(() => {
    props.onUpdate(props.index, {...props.spot, title: title, username: username})
  }, [title, username])

  return(
    <div className="form-group-spot">
      <h2>New Spot</h2>
      <input type="text" placeholder="Title" onChange={({ target }) => setTitle(target.value)}/> <br/>
      <input type="text" placeholder="Username" onChange={({ target }) => setUsername(target.value)}/> <br/>
      <button type="button" onClick={props.onDelete}>Delete</button>
    </div>
  )
}