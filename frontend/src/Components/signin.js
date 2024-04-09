import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import useFetchpost from '../hooks/useFetchpost';
import Navbar from './navbar';

import {  FaEye , FaEyeSlash } from "react-icons/fa";

import "../stylesheets/signin.css"

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Role, setRole] = useState("Student");
  const [showpwd,setshowpwd] = useState(false);
  const [valmail,setvalmail] = useState(false);

  const navigate = useNavigate();
  const [postrequest , data , isPending , error ] = useFetchpost();
  
  localStorage.clear();

  const forgetpwd = () =>{
    navigate("/forget-password");
  }
  
  const handleSubmit = async (e) => {    
    e.preventDefault();

    const formdata = {
      mailId : email,
      password : password,
      role : Role
    }

    postrequest("http://localhost:8081/validate/SignIn",formdata);
  };

  var validateemail = (email) =>{
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setvalmail(!pattern.test(email))
  }

  return (
    <div>
      <Navbar/>
    <div className="signin-container">
      <h2>Signin</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => {
            const mail = e.target.value;
            setEmail(mail)
            validateemail(mail);
          }} required />
          {valmail && <small id='wrong'>Invalid email</small> }
        </div>
        <div>
          <label>Password:</label>
          <div id='eyesection'>
            <input type={showpwd ? "text": "password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
            <span onClick={()=>setshowpwd(!showpwd)} id='showpwd'>{showpwd ? <FaEye/> : <FaEyeSlash/>}</span>
          </div>
          <span id='forget'><small onClick={forgetpwd}>Forget password?</small></span>
        </div>
        <div>
          <label>Role:</label>
          <select name="role" value={Role} onChange={ (e)=> setRole(e.target.value) } required>
            <option value="Student">Student</option>
            <option value="Entrepreneur">Entrepreneur</option>
            <option value="Investor">Investor</option>
          </select>
        </div>
        <button type="submit">Signin</button>
        {data !== null && (
        <>
          {error && <p className="error-message">Error: {error}</p>}
          {/* {isPending && <a className="pending-message" >Sign up first to login ...</a>} */}
          {isPending && <Link className="pending-message" to="/SignUp">Sign up first to login ...</Link>}
        </>
      )}
      </form>
    </div>
    </div>
  );
}

export default Signin;
