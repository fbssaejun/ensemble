import Avatar from '@mui/material/Avatar';
import IconButton from "@mui/material/IconButton";
import { useHistory } from 'react-router-dom';

export default function FilledSpot(props) {
  const { filledSpots } = props
  const history = useHistory();

  const filledSpotsAvatar = filledSpots.map((obj) => {
    return(
      <div className="filled-avatar">
        <IconButton onClick={() => {
          history.push(`/users/${obj.user_id}`)
        }}>
          <Avatar
            alt={obj.name}
            src={obj.profile_image}
            sx={{ width: 50, height: 50 }}
            name="avatar"
            id="avatar"
          />
        </IconButton>
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