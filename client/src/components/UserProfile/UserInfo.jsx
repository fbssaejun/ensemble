


export default function UserProfile(props) {

  const { userInfo } = props;

  return(
      <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Kanye_West_at_the_2009_Tribeca_Film_Festival_%28cropped%29.jpg/1200px-Kanye_West_at_the_2009_Tribeca_Film_Festival_%28cropped%29.jpg" width="200px" height="200px"/>
          <h2>{userInfo.first_name} {userInfo.last_name}</h2>
          <h2>Username: {userInfo.username}</h2>
          <h2>Email: {userInfo.email}</h2>
      </div>
  );
}
