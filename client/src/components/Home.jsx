import { Fragment, useEffect, useState, useRef } from "react";
import "./Home.scss";
import trumpet from "./trumpet.jpeg";
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

// import ReactPlayer from "react-player";
// import homeVideo from "./home-video.mp4";

export default function Home(props) {

  // const colors = ["Oasis", "Guns N roses"];
  const delay = 2500;

  const [featuredBands, setFeaturedBands] = useState([])
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const history = useHistory();


  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {


    axios.get('/api/bands/featured').then((results) => {
      setFeaturedBands(results.data)
    });

    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === featuredBands.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <Fragment className="home-component">
      {/* <div className="vimeo-video">
   
         <video width="100%" height="500" controls autoplay>
          <source src={homeVideo} type="video/mp4"/>
        </video> 
      </div> */}

      <div className="main">
        <h2>Featured Bands</h2>
        <div className="slideshow">
          <div
            className="slideshowSlider"
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
          >
            {featuredBands.map((bands, index) => (
              <Fragment>
              <button
                className="slide"
                key={index}        
                onClick={() => {
                  history.push(`/bands/${bands.id}`)
                }}         
              >
              <div>
                <img src={bands.band_image} width="450px" height="250px"/>
                <h2>{bands.name}</h2>
                <h3>{bands.description}</h3>
              </div>
              </button>
              </Fragment>
            ))}
          </div>

          <div className="slideshowDots">
            {featuredBands.map((_, idx) => (
              <div
                key={idx}
                className={`slideshowDot${index === idx ? " active" : ""}`}
                onClick={() => {
                  setIndex(idx);
                }}
              ></div>
            ))}
          </div>
        </div>
        <div className="explore-text">
          <h6>Looking for a band?</h6>
          <p><b>Explore and join according to your favorite genre, instrument and people</b></p>
        </div>
      </div>

      <div className="home-container">


        <div className="picture">
          <img src='http://static1.squarespace.com/static/57019c4c04426228e6c546cd/570553bab6aa608150e7cb4d/595eefa59de4bb6895d95c0a/1508549120830/Tomorrrowland.jpg?format=1500w' alt="trumpet" width="200em;" />
        </div>
        <div className="content">
          <span className="content-text">Search for bands and their members from a wide range of genre and instruments</span>
          <button className="about-button">
            <span><Link to={`/search`}>Search For Bands</Link></span>
          </button>       
        </div>
      </div>

      <div className="home-container">
        <div className="content">
          <span className="content-text">Create a band of your own and form your own dream band</span>
          <button className="about-button">
            <span><Link to={`/bands/new`}>Create A Band</Link></span>
          </button>        
          </div>
        <div className="picture">
          <img src='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2017%2F08%2Fgettyimages-824754832-2000.jpg' alt="trumpet" width="200em;" />
        </div>
      </div>

      <div className="home-container">
        <div className="picture">
          <img src='https://townsquare.media/site/295/files/2018/10/Band-Names.jpg' alt="trumpet" width="200em;" />
        </div>
        <div className="content">
          <span className="content-text">View your bands, edit and invite people to your band</span>
          <button className="about-button">
            <span><Link to={`/bands/manage`}>My Bands</Link></span>
          </button>        
        </div>
      </div>

      <div className="home-container">
        <div className="content">
          <span className="content-text">Apply for bands that you would like to participate in, and check your status</span>
          <button className="about-button">
            <span><Link to={`/users/${props.currentUser.id}/app`}>My Applications</Link></span>
          </button>
            </div>
        <div className="picture">
          <img src='https://api.theunsignedguide.com/content/image/TheUnsignedGuide/Festival%20stage.jpg' alt="trumpet" width="200em;" />
        </div>
      </div>
  
    </Fragment>
  );
}
