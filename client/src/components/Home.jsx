import { requirePropFactory } from "@mui/material";
import { Fragment } from "react";
import ReactPlayer from "react-player";
import "./Home.scss";
import trumpet from './trumpet.jpeg'

export default function Home() {
  return (
    <Fragment className="home-component">
      <div className="vimeo-video">
        <ReactPlayer 
        url='https://vimeo.com/619592171/e80bf00b7f' 
        playing="true"
        loop="true"
        volume="0"
        width="100%"
        />
         {/* <video width="100%" height="500" controls >
          <source src="../../public/home-video.mp4" type="video/mp4"/>
        </video>  */}
      </div>


      <div>
        <h2>Featured Bands</h2>
      </div>


      <div className="home-container">
        <div className="picture">
          <img src={trumpet} alt="trumpet"/>
        </div>
        <div className="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer scelerisque elit quis diam venenatis, ac auctor metus lobortis. Ut posuere porttitor velit vel condimentum. Sed ac arcu vitae elit porta pulvinar nec non eros. Curabitur efficitur lacus sed interdum ultricies. Phasellus suscipit varius tortor, a ullamcorper libero tempor quis. 
        </div>
      </div>


      <div className="home-container">
        <div className="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer scelerisque elit quis diam venenatis, ac auctor metus lobortis. Ut posuere porttitor velit vel condimentum. Sed ac arcu vitae elit porta pulvinar nec non eros. Curabitur efficitur lacus sed interdum ultricies. Phasellus suscipit varius tortor, a ullamcorper libero tempor quis. 
        </div>
        <div className="picture">
          picture
        </div>
      </div>


      <div className="home-container">
        <div className="picture">
          picture
        </div>
        <div className="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer scelerisque elit quis diam venenatis, ac auctor metus lobortis. Ut posuere porttitor velit vel condimentum. Sed ac arcu vitae elit porta pulvinar nec non eros. Curabitur efficitur lacus sed interdum ultricies. Phasellus suscipit varius tortor, a ullamcorper libero tempor quis. 
        </div>
      </div>


      <div className="home-container">
        <div className="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer scelerisque elit quis diam venenatis, ac auctor metus lobortis. Ut posuere porttitor velit vel condimentum. Sed ac arcu vitae elit porta pulvinar nec non eros. Curabitur efficitur lacus sed interdum ultricies. Phasellus suscipit varius tortor, a ullamcorper libero tempor quis. 
        </div>
        <div className="picture">
          picture
        </div>
      </div>

    </Fragment>
  );
}
