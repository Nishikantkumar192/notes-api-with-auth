import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/NoteState";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AuthForm from "./components/authForm";
import ShowMyNotes from "./pages/ShowMyNotes";
function App() {

  return (

    <NoteState>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<AuthForm/>}/>
          <Route exact path="/fetchNotes" element={<ShowMyNotes/>}/>
        </Routes>
      </Router>
    </NoteState>
  )
}

export default App
