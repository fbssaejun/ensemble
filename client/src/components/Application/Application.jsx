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
          <p className="band-name">{bandName}</p>
          <h5 className="band-info">
            Applying for: <span >{title}</span> <br/>
            Instrument: <span>{instrument}</span> <br/>
            Spot Description: <span>{description}</span><br/>
            My message: <span>{message}</span>
          </h5>
        </span>
      </Link>
    </div>
  );
}


