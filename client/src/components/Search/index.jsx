import { useEffect } from "react"


export default function Search(props) {

  return(
    <form>
      <input type="text" placeholder="Find your Band" />
      <button>Submit</button> <br/>
      <select name="instruments">
        <option value="1">Guitar</option>
        <option value="2">Flute</option>
        <option value="3">Bass</option>
        <option value="4">Vocal</option>
      </select>
      <select name="genre">
        <option value="1">Jazz</option>
        <option value="2">Rock</option>
        <option value="3">Blues</option>
        <option value="4">Stuff</option>
      </select>
    </form>
  )

}