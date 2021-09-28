import { Fragment } from "react"

export default function MyBand(props) {

  
  return (
    <Fragment>
      <h4>{props.name}</h4>
      <button onClick={props.onDelete}>Delete</button>
    </Fragment>
  )
}