import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/NoteState";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AuthForm from "./components/authForm";
import ShowMyNotes from "./pages/ShowMyNotes";
import { ToastContainer } from "react-toastify";
import EditNotes from "./pages/EditNotes";
function App() {

  return (
      <Router>
    <NoteState>
        <Navbar/>
        <ToastContainer/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<AuthForm/>}/>
          <Route exact path="/fetchNotes" element={<ShowMyNotes/>}/>
          <Route exact path="/editNotes/:id" element={<EditNotes/>}/>
        </Routes>
    </NoteState>
      </Router>
  )
}

export default App
