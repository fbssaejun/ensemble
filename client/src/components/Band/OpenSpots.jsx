import Avatar from '@mui/material/Avatar';

export default function openSpot(props) {
  const { openSpots } = props

  const openSpotsAvatar = openSpots.map((obj) => {
    return(
      <div className="open-avatar">
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
    <div className="open-spot-container">
      {openSpots && openSpotsAvatar}
    </div>
  )

}