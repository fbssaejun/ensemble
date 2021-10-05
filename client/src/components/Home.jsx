import { Fragment, useEffect, useState, useRef } from "react";
import "./Home.scss";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

import homeVideo from "./home-video.mp4";

export default function Home(props) {
  const delay = 2500;

  const [featuredBands, setFeaturedBands] = useState([]);
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const history = useHistory();

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    axios.get("/api/bands/featured").then((results) => {
      setFeaturedBands(results.data);
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
      <div className="ensemble-video">
        <video id="bgvideo" autoplay="autoplay" loop muted>
          <source src={homeVideo} type="video/mp4" />
        </video>
      </div>

      <a href="/search" className="begin-search">
        Begin your Search
      </a>

      <div class="arrow bounce">
        <span className="scroll-down">Scroll Down</span>
        <a class="fa fa-arrow-down fa-2x" href="#featured"></a>
      </div>

      <div className="main" id="featured">
        <div className="slideshow">
          <h2>Featured Bands</h2>
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
                    history.push(`/bands/${bands.id}`);
                  }}
                >
                  <div>
                    {!bands.band_image ? (
                      <img
                        src="https://media.istockphoto.com/vectors/fiddler-vector-id452097777?k=20&m=452097777&s=612x612&w=0&h=tEiPg3SQNeclfnvT24V7NFusHxe0291xOKZPBg1Sq-8="
                        width="1000px"
                        height="500px"
                      />
                    ) : (
                      <img
                        src={bands.band_image}
                        width="1000px"
                        height="500px"
                      />
                    )}
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
          <h2>Looking for a band?</h2>
          <h7>
            Explore and join according to your favorite genre, instrument and
            people
          </h7>
        </div>
      </div>

      <div className="home-container">
        <div className="picture">
          <img
            src="http://static1.squarespace.com/static/57019c4c04426228e6c546cd/570553bab6aa608150e7cb4d/595eefa59de4bb6895d95c0a/1508549120830/Tomorrrowland.jpg?format=1500w"
            alt="trumpet"
            width="200em;"
          />
        </div>
        <div className="content">
          <span className="content-text">
            Search for bands and their members from a wide range of genre and
            instruments
          </span>
          <button className="about-button">
            {props.currentUser ? (
              <span>
                <Link to={`/search`}>Search For Bands</Link>
              </span>
            ) : (
              <Link to={`/auth`}>Search For Bands</Link>
            )}
          </button>
        </div>
      </div>

      <div className="home-container">
        <div className="content">
          <span className="content-text">
            Create a band of your own and form your dream band
          </span>
          <button className="about-button">
            {props.currentUser ? (
              <span>
                <Link to={`/bands/new`}>Create A Band</Link>
              </span>
            ) : (
              <Link to={`/auth`}>Create A Band</Link>
            )}
          </button>
        </div>
        <div className="picture">
          <img
            src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2017%2F08%2Fgettyimages-824754832-2000.jpg"
            alt="trumpet"
            width="200em;"
          />
        </div>
      </div>

      <div className="home-container">
        <div className="picture">
          <img
            src="https://townsquare.media/site/295/files/2018/10/Band-Names.jpg"
            alt="trumpet"
            width="200em;"
          />
        </div>
        <div className="content">
          <span className="content-text">
            View your bands, edit and invite people to your band
          </span>
          <button className="about-button">
            {props.currentUser ? (
              <span>
                <Link to={`/bands/manage`}>My Bands</Link>
              </span>
            ) : (
              <Link to={`/auth`}>My Bands</Link>
            )}
          </button>
        </div>
      </div>

      <div className="home-container">
        <div className="content">
          <span className="content-text">
            Apply for bands that you would like to participate in
          </span>
          <button className="about-button">
            {props.currentUser ? (
              <span>
                <Link to={`/users/${props.currentUser.id}`}>
                  My Applications
                </Link>
              </span>
            ) : (
              <Link to={`/auth`}>My Applications</Link>
            )}
          </button>
        </div>
        <div className="picture">
          <img
            src="https://api.theunsignedguide.com/content/image/TheUnsignedGuide/Festival%20stage.jpg"
            alt="trumpet"
            width="200em;"
          />
        </div>
      </div>
    </Fragment>
  );
}
