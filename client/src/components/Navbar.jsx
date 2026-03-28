import { Link } from "react-router-dom"
const Navbar = () => {
  return (
    <div className="bg-black w-full text-white flex justify-between absolute top-0">
      <div className="p-2">
        <Link className="" to="/">Home</Link>
      </div>
      <div className="p-2">
        <Link className="" to="/login">Login</Link>
      </div>
    </div>
  )
}

export default Navbar
