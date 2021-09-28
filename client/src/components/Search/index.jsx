import axios from "axios";
import { useEffect, useState } from "react";
import Options from './Options';


export default function Search(props) {
  const [selectedInst, setSelectedInst] = useState("0");
  const [selectedGenre, setSelectedGenre] = useState("0");
  const [searchTerm, setSearchTerm] = useState("");
  const [genres, setGenres] = useState([]);
  const [instruments, setInstruments] = useState([]);


  useEffect(() => {
    Promise.all([
      axios.get("/api/genres"),
      axios.get("/api/instruments")
    ])
    .then((all) => {
      const genres = all[0].data
      const instruments = all[1].data
      setGenres(genres)
      setInstruments(instruments)
    })
  }, [])


  const searchField = (event)=>{
    
    event.preventDefault()
    console.log("selected instrument:", selectedInst);
    console.log("selected genre:", selectedGenre);

    const params = {
      term: searchTerm
    }

    axios.get("/api/search/", { params })

  };



  const processedInst = instruments.map((instrument)=> {
    return <Options key={instrument.id} value={instrument.id} name={instrument.name} />
  })

  const processedGenre = genres.map((genre)=> {
    return <Options key={genre.id} value={genre.id} name={genre.name} />
  })
 

  return(
    <form onSubmit={searchField}>
      <input type="text" placeholder="Find your Band" onChange={({ target }) => setSearchTerm(target.value)}/>
      <select id="instruments" onChange={({ target }) => setSelectedInst(target.value)}>
        <option value="0">All</option>
        {processedInst}
      </select>
      <select id="genre" onChange={({ target }) => setSelectedGenre(target.value)}>
        <option value="0">All</option>
        {processedGenre}
      </select>
      <button type="submit">Submit</button> <br/>
    </form>
  )

}

