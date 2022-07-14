import React from "react";
import lojo from "./logo.png";
import { Link ,useNavigate} from "react-router-dom";

export default function Navbar() {
  let Navigate=useNavigate();
  
  const logout =()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    
    Navigate('/login')
  }
  
  return (
    <>
      <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
        <div className="container-fluid">
          <img
            src={lojo}
            className="logo"
            alt="logo"
            height="70px"
            width="70px"
          ></img>
          <Link className="navbar-brand" to="/">
            R-Notes
          </Link>
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
          >
            <span className="toggler-icon top-bar"></span>
            <span className="toggler-icon middle-bar"></span>
            <span className="toggler-icon bottom-bar"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              
            </ul>
            
            {!localStorage.getItem('name')?<h4 className="d-none"></h4>:<h5 className="text-light mr-3"><i class="fas fa-user-circle"></i> Hello {localStorage.getItem('name')}</h5>}
            
            {!localStorage.getItem('token')?<form className="d-flex">
              <Link role="button" to="/login" className="btn btn-primary ">
                Login
              </Link>
              <Link role="button" to="/signup" className="btn btn-primary mx-2">
                Sign Up
              </Link>
            </form>
            :<button onClick={logout} className="btn btn-primary">Logout</button>}
            
          </div>
        </div>
      </nav>
    </>
  );
}
