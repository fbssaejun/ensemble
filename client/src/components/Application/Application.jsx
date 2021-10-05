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
          <span className="band-info">
            Applying for: <span className="application-desc">{title}</span> <br/>
            Instrument: <span className="application-desc">{instrument}</span> <br/>
            Spot Description: <span className="application-desc">{description}</span><br/>
            My message: <span className="application-desc">{message}</span>
          </span>
        </span>
      </Link>
    </div>
  );
}


