import React, { useState , useEffect} from 'react';
import useFetchpost from "../hooks/useFetchpost"
import Navbar from './navbar';

import {  FaEye , FaEyeSlash } from "react-icons/fa";

import "../stylesheets/signup.css"

function Signup() {

  const [Name,setName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Role, setRole] = useState("Student");
  const [valmail,setvalmail] = useState(false);
  const [valpassword,setvalpassword] = useState(false);
  const [cpass,setcpass] = useState(false);
  const [showpwd,setshowpwd] = useState(false);

  const [postrequest, data, isPending, error] = useFetchpost();
  
  const handleSubmit =  (e) => {
    e.preventDefault();
    var formdata = {
      name : Name,
      mailId : email,
      password : password,
      role : Role
    }
    postrequest("http://localhost:8081/validate/SignUp",formdata)
  };

  var validateemail = (email) =>{
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setvalmail(!pattern.test(email))
  }

  var validatepassword = () =>{
    if (password.length < 4) setvalpassword(true);
    else if (!/[A-Z]/.test(password)) setvalpassword(true);
    else if (!/[!@#$%^&*?]/.test(password)) setvalpassword(true);
    else setvalpassword(false);
    console.log(valpassword);
  }

  useEffect(() => {
    console.log(valpassword);
  }, [valpassword]);

  var validateConfirmpassword = (pwd) =>{
    setcpass(pwd !== password);
  }

  return (
    <div>
      <Navbar/>
      <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" onChange={(e)=>setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="mailId" onChange={ (e)=>{
            const mail = e.target.value;
            setEmail(mail)
            validateemail(mail);
             }} required />
             {valmail && <small id='wrong'>Invalid email</small> }
        </div>
        <div>
          <label>Password:</label>
          <div id="eyesection">
          <input type={showpwd ? "text" : "password"} name="password" onChange={(e)=>{
            const pwd = e.target.value;
            setPassword(pwd);
            validatepassword(pwd);
          }} required />
          <span onClick={()=>setshowpwd(!showpwd)} id='signupshowpwd'>{showpwd ? <FaEye/> : <FaEyeSlash/>}</span>
          </div>
        </div>
        <div>
          <label>Confirm Password:</label>
        <div id="eyesection">
          <input type={showpwd ? "text" : "password"} name="password" onChange={(e)=>{
            const pwd = e.target.value;
            setcpass(pwd);
            validateConfirmpassword(pwd);
          }} required/>
          <span onClick={()=>setshowpwd(!showpwd)} id='signupshowcpwd'>{showpwd ? <FaEye/> : <FaEyeSlash/>}</span>
          </div>
            {cpass && <small id='wrong'>Password did not match</small> }
            {cpass && valpassword && <br></br>}
            {console.log(valpassword)}
          {valpassword && <small id='wrong'>Password must have atleast one Uppercase letter , minimum of length 5 and must have a special character !@#$%^&*?</small> }
        </div>
        <div>
          <label>Role:</label>
          <select name="role" value={Role} onChange={ (e)=> setRole(e.target.value) } required>
            <option value="Student">Student</option>
            <option value="Entrepreneur">Entrepreneur</option>
            <option value="Investor">Investor</option>
          </select>
        </div>
        <button type="submit" disabled={valmail || valpassword}>Signup</button>
        {data !== null && (
        <>
          {error && <p className="error-message">Error: {error}</p>}
          {isPending && <p className="pending-message">Error Occured while Signing in...</p>}
        </>
      )}
      </form>
    </div>
    </div>
  );
}

export default Signup;
