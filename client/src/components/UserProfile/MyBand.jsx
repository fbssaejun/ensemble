import { Link } from 'react-router-dom'

export default function MyBand(props) {

  return (
  <Link to={`/bands/${props.id}`} className="profile-band">
    <div >
      <img src={props.image}/>
      <h4>{props.name}</h4>
      <h6>{props.description}</h6>
    </div>
  </Link>
  )
}