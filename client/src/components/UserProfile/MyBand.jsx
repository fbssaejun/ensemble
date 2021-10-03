
export default function MyBand(props) {

  return (
    <div className="profile-band">
      <img src={props.image}/>
      <h4>{props.name}</h4>
      <h6>{props.description}</h6>
    </div>
  )
}