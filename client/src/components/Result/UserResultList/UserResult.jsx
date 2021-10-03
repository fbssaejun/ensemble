import { Link } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea'

export default function UserResult(props) {
  const testImage = 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Slash%2C_Guitarist_of_Guns_N%27_Roses_in_2017.jpg';
  return (
      <Card className="single-user-result" sx={{ maxWidth: 300 }}>
         <CardActionArea component={Link}  to={`/users/${props.userId}`} >
          <CardContent>
            <Avatar alt={props.firstName} src={props.profile_image ? props.profile_image : testImage} sx={{ width: 70, height: 70 }} />
            <Typography gutterBottom variant="h5" component="div">
              {props.firstName} {props.lastName}
            </Typography>
            <Typography gutterBottom variant="h7" component="div">
              AKA {props.username}
            </Typography>
          </CardContent>
        </ CardActionArea>
      </Card>
  );

}