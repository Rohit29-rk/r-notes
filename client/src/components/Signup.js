import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [cred, setCred] = useState({ name:"",email: "", password: "" });
  let Navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const response = await fetch("https://r-notes.herokuapp.com//api/auth/createuser", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name:cred.name,email: cred.email, password: cred.password }),
    });
    const json = await response.json();
    console.log(json);
    if(json.sucess){
      //redirect
      localStorage.setItem('token',json.authtoken);
      
      props.salert("Account created Successfully","success")
      Navigate('/login');
      
    }
    else{
      props.salert("Invalid Credentials","danger")
    }
  };
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };
  return (
    <div className="container mt-3">
      <h2 className="text-center my-3">Sign Up To Use R-Notes</h2>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            
            onChange={onChange}
            name="name"
            aria-describedby="emailHelp"
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            
            onChange={onChange}
            name="email"
            aria-describedby="emailHelp"
          ></input>
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            minLength={5}
            onChange={onChange}
            name="password"
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            required
            minLength={5}
            onChange={onChange}
            name="cpassword"
          ></input>
        </div>

        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
