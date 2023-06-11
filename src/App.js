import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useState } from 'react';
import Navbar from './Components/Navbar';
import AddNote from './Components/AddNote';
import View from './Components/View';
import NoteState from './Context/notes/NoteState';
import Alert from './Components/Alert';
import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<AddNote showAlert={showAlert} />} />
            <Route exact path="/view" element={<View showAlert={showAlert} />} />
            <Route exact path="/login" element={<LogIn showAlert={showAlert} />} />
            <Route exact path="/signup" element={<SignUp showAlert={showAlert} />} />
          </Routes>
        </div>
      </Router>
    </NoteState >
  );
}

export default App;
