import ReactPlayer from 'react-player';
import { Fragment } from 'react';

export default function Home () {

  return (
    <Fragment>
      <h1>Blank Homepage</h1>
      <div className="vimeo-video">
        <ReactPlayer 
        url="https://vimeo.com/616081425/f02e50a688" 
        playing
        controls
        volume="0"
        loop />
      </div>
      <div>
        <h2>Content1</h2>
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