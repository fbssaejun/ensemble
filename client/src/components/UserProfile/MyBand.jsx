import { Link } from 'react-router-dom'

export default function MyBand(props) {

  return (
  <Link to={`/bands/${props.id}`} className="profile-band">
    <div >
      {props.image ? 
      <img src={props.image}/>
      :
      <img className="default-band-image" src="https://media.istockphoto.com/vectors/fiddler-vector-id452097777?k=20&m=452097777&s=612x612&w=0&h=tEiPg3SQNeclfnvT24V7NFusHxe0291xOKZPBg1Sq-8="/>
      }
      <h4>{props.name}</h4>
      <h6>{props.description}</h6>
    </div>
  </Link>
  )
}