

import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export default function UserProfile(props) {

  const testImage = "https://cdn2.bulbagarden.net/upload/4/49/Ash_Pikachu.png"
  const centerAdjust = {
    display: "flex",
    "direction": "column",
    "align-items": "center",
  }

  return(
      <Card>
        <CardHeader
          avatar={<Avatar alt="Profile Pic" src={testImage} sx={{ width: 140, height: 140 }} />}
        />
        <CardContent profile>
          <Typography gutterBottom variant="h6" component="div">
            CEO / CO-FOUNDER
          </Typography>
          <Typography gutterBottom variant="h4" component="div">
            Alec Thompson
          </Typography>
          {/* <p className={props.description}>
            Don{"'"}t be scared of the truth because we need to restart the
            human foundation in truth And I love you like Kanye loves Kanye
            I love Rick Owens’ bed design but the back is...
          </p> */}
        </CardContent>
      </Card>
  );
}
