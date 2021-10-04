import Avatar from '@mui/material/Avatar';

export default function filledSpot(props) {
  const { filledSpots } = props

  const filledSpotsAvatar = filledSpots.map((obj) => {
    return(
      <div className="filled-avatar">
        <Avatar
          alt={obj.name}
          src={obj.profile_image}
          sx={{ width: 50, height: 50 }}
          name="avatar"
          id="avatar"
        />
        <span className="avatar-name">{"test name"} </span>
      </div>
    )
  })

  return (
    <div className="filled-spot-container">
      {filledSpots && filledSpotsAvatar}
    </div>
  )

}