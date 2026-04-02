import { Link } from "react-router-dom"
import NoteContext from "../context/NoteContext"
import { useContext } from "react"
const Navbar = () => {
    const context=useContext(NoteContext);
    const {logoutUser,isLoggedIn}=context;
  return (
    <div className="bg-black w-full text-white flex justify-between absolute top-0 z-1">
      <div className="p-2">
        <Link to="/">Home</Link>&nbsp; &nbsp;
        {isLoggedIn && <Link to="/fetchNotes">MyNotes</Link>}
      </div>
      <div className="p-2">
        {!isLoggedIn?<Link to="/login">Log-in</Link>
        :<button className="cursor-pointer" onClick={logoutUser}>logout</button>}
      </div>
    </div>
  )
}

export default Navbar
