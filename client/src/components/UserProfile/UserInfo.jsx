import  defaultUser from './default-user-image.png'
import Avatar from '@mui/material/Avatar';

export default function UserProfile(props) {

  const { userInfo } = props;

  console.log(userInfo)

  return(
      <div>
        {/* {userInfo.profile_image ? 
         <img src={userInfo.profile_image} width="200px" height="200px"/>
         :
         <img src={defaultUser} width="200px" height="200px"/>
        } */}
          <Avatar alt={userInfo.first_name} src={userInfo.profile_image ? userInfo.profile_image : "/"} sx={{ width: 200, height: 200 }} />
          <h4>{userInfo.first_name} {userInfo.last_name}</h4>
          <h4>Username: {userInfo.username}</h4>
          <h4>Email: {userInfo.email}</h4>
      </div>
  );
}
