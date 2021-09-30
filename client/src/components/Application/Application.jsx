
export default function Application (props) {
  const { bandName, description, title, instrument, message, acceptedStatus } = props;

  return (
    <div>
      <h1>{bandName}</h1>
      <h2>{title}</h2>
      <h3>{instrument}</h3>
      <h3>{message}</h3>
      <h3>{description}</h3>
      <h4>{acceptedStatus}</h4>
    </div>
  );

}


