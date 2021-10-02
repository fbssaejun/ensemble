import './Application.scss'
import classnames from 'classnames';
import {Link} from 'react-router-dom';

export default function Application (props) {
  const { bandName, bandId, description, title, instrument, message, acceptedStatus } = props;
  
  const statusClassName = classnames('application-status', {
    'application-status--pending' : acceptedStatus === null,
    'application-status--accepted' : acceptedStatus,
    'application-status--rejected' : acceptedStatus!== null && !acceptedStatus
  })
  const bandURL = `/bands/${bandId}`;
  return (
    <div className="user-application">
      <span className={statusClassName}></span>
      <Link to={bandURL}>
        <span className="info-container">
          <h1 className="band-name">{bandName}</h1>
          <h2>Applying for spot: {title}</h2>
          <h3>Instrument: {instrument}</h3>
          <h3>Spot Description: {description}</h3>
          <h3>My application message: {message}</h3>
        </span>
      </Link>
    </div>
  );
}


