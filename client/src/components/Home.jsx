import { Fragment, useEffect, useState, useRef } from "react";
import "./Home.scss";
import trumpet from "./trumpet.jpeg";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// import ReactPlayer from "react-player";
// import homeVideo from "./home-video.mp4";

export default function Home() {

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
                <img src={bands.band_image} width="20px" height="20px"/>
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
          <p><b>Explore and join according to your favorite genre, instrument and people!</b></p>
        </div>
      </div>

      <div className="home-container">


        <div className="picture">
          <img src={trumpet} alt="trumpet" width="200em;" />
        </div>
        <div className="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          scelerisque elit quis diam venenatis, ac auctor metus lobortis. Ut
          posuere porttitor velit vel condimentum. Sed ac arcu vitae elit porta
          pulvinar nec non eros. Curabitur efficitur lacus sed interdum
          ultricies. Phasellus suscipit varius tortor, a ullamcorper libero
          tempor quis.
        </div>
      </div>

      <div className="home-container">
        <div className="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          scelerisque elit quis diam venenatis, ac auctor metus lobortis. Ut
          posuere porttitor velit vel condimentum. Sed ac arcu vitae elit porta
          pulvinar nec non eros. Curabitur efficitur lacus sed interdum
          ultricies. Phasellus suscipit varius tortor, a ullamcorper libero
          tempor quis.
        </div>
        <div className="picture">
          <img src={trumpet} alt="trumpet" width="200em;" />
        </div>
      </div>

      <div className="home-container">
        <div className="picture">
          <img src={trumpet} alt="trumpet" width="200em;" />
        </div>
        <div className="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          scelerisque elit quis diam venenatis, ac auctor metus lobortis. Ut
          posuere porttitor velit vel condimentum. Sed ac arcu vitae elit porta
          pulvinar nec non eros. Curabitur efficitur lacus sed interdum
          ultricies. Phasellus suscipit varius tortor, a ullamcorper libero
          tempor quis.
        </div>
      </div>

      <div className="home-container">
        <div className="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          scelerisque elit quis diam venenatis, ac auctor metus lobortis. Ut
          posuere porttitor velit vel condimentum. Sed ac arcu vitae elit porta
          pulvinar nec non eros. Curabitur efficitur lacus sed interdum
          ultricies. Phasellus suscipit varius tortor, a ullamcorper libero
          tempor quis.
        </div>
        <div className="picture">
          <img src={trumpet} alt="trumpet" width="200em;" />
        </div>
      </div>
    </Fragment>
  );
}
