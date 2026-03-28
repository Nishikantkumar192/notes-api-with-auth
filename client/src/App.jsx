import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/NoteState";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
function App() {

  return (

    <NoteState>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
        </Routes>
      </Router>
    </NoteState>
  )
}

export default App
