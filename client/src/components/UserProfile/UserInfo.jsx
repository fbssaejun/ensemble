


export default function UserProfile(props) {

  const { userInfo } = props;

  return(
      <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Kanye_West_at_the_2009_Tribeca_Film_Festival_%28cropped%29.jpg/1200px-Kanye_West_at_the_2009_Tribeca_Film_Festival_%28cropped%29.jpg" width="200px" height="200px"/>
          <h4>{userInfo.first_name} {userInfo.last_name}</h4>
          <h4>Username: {userInfo.username}</h4>
          <h4>Email: {userInfo.email}</h4>
      </div>
  );
}
