import { Fragment } from 'react';
import ReactPlayer from "react-player";
export default function Home () {
  
  return (
    <Fragment>

      <div className="vimeo-video">
        <video width="100%" height="500" controls >
          <source src="../../public/home-video.mp4" type="video/mp4"/>
        </video>
      </div>


      <div>
        <div >
          hello
        </div>
        <div>
          hello
        </div>
      </div>


      <div>
        <h2>Content2</h2>
      </div>


      <div>
        <h2>Content3</h2>
      </div>


      <div>
        <h2>Content4</h2>
      </div>


      <div>
        <h2>Slideshow?</h2>
      </div>


      <footer>
        <h1>Footer</h1>
      </footer>

    </Fragment>
  )
}