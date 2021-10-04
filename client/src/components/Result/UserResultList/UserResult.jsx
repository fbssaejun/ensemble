import { Link } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea'

export default function UserResult(props) {

  
  return (
      <Card className="single-user-result" sx={{ maxWidth: 300 }}>
         <CardActionArea component={Link}  to={`/users/${props.userId}`} >
          <CardContent>
            <Avatar alt={props.firstName} src={props.profile_image ? props.profile_image : "/"} sx={{ width: 70, height: 70 }} />
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