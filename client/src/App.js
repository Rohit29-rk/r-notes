import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Notestate from "./context/notes/NotesState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";


function App() {
  const [alert, setAlert] = useState(null);
  const salert= (message,type)=>{
    setAlert({
      msg: message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },2000);
  }
  return (
    <>
      <Notestate>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home  salert={salert}/>} />
              
              <Route exact path="/login" element={<Login salert={salert} />} />
              <Route exact path="/signup" element={<Signup salert={salert} />} />
            </Routes>
          </div>
        </Router>
      </Notestate>
    </>
  );
}

export default App;
