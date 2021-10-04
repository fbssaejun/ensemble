import Avatar from '@mui/material/Avatar';
import IconButton from "@mui/material/IconButton";
import OpenSpotsItem from './OpenSpotsItem'

export default function NewOpenSpot(props) {
  const { openSpots, currentUser } = props


  const openSpotsAvatar = openSpots.map((spot) => {
    return(
      <OpenSpotsItem spot={spot} currentUser={currentUser} />
    )
  })

  return (
    <div className="open-spot-container">
      {openSpots && openSpotsAvatar}
    </div>
  )

}