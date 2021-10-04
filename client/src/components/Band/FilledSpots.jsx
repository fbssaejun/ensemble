import Avatar from '@mui/material/Avatar';

export default function filledSpot(props) {
  const { filledSpots } = props

  const filledSpotsAvatar = filledSpots.map((obj) => {
    return(
      <div className="inst-avatar">
        <Avatar
          alt={obj.name}
          src={obj.profile_image}
          sx={{ width: 50, height: 50 }}
          name="avatar"
          id="avatar"
        />
        <p>{obj.name}</p>
      </div>
    )
  })

  return (
    <div className="filled-spot-container">
      {filledSpots && filledSpotsAvatar}
    </div>
  )

}