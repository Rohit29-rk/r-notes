import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [cred, setCred] = useState({ email: "", password: "" });
  let Navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://r-notes.herokuapp.com/api/auth/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: cred.email, password: cred.password }),
    });
    const json = await response.json();
    console.log(json);
    
    if(json.sucess){
      //redirect
      localStorage.setItem('token',json.authtoken);
      props.salert("Logged in Successfully","success")
      Navigate('/');
      
    }
    else{
      props.salert("Invalid Details","danger")
    }
    const respons = await fetch("https://r-notes.herokuapp.com/api/auth/getuser", {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
        
      },
      
    });
    const jso= await respons.json();
    console.log(jso.name);
    localStorage.setItem('name',jso.name);
  };
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };
  return (
    <div className="container mt-3">
      <h2 className="text-center my-3">Login To Use R-Notes</h2>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            value={cred.email}
            onChange={onChange}
            type="email"
            name="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          ></input>
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">
            Password
          </label>
          <input
            value={cred.password}
            onChange={onChange}
            type="password"
            className="form-control"
            id="password"
            name="password"
          ></input>
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
