import axios from "axios";
import Application from "./Application";

export default function ApplicationList () {

  useEffect(() => {
    axios.get(`/api/applications/${userId}`)

  }, [])

  return (
    
  );
}