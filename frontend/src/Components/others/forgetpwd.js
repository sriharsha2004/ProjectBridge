import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import "../../stylesheets/signin.css" ;

const Forgetpwd = () => {

    const [mail,setmail] = useState();
    const [valmail,setvalmail] = useState(false);

    var validateemail = (mail) =>{
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setvalmail(!pattern.test(mail))
      }

    var handleSubmit = () =>{
        axios.post("http://localhost:8081/forgetpwd/sendverificationmail" , { mail })
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })

    }

    return (
        <div className='signin-container'>
            <h2>Forget Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                <label>Enter your mail Id</label>
                <input type="email" value={mail} onChange={(e) => {
                    const mail = e.target.value;
                    setmail(mail)
                    validateemail(mail);
                }} required />
                {valmail && <small id='wrong'>Invalid email</small> }
                </div>
                <br />
                {<button type="submit" disabled={valmail} >Reset password</button>}
            </form>
        </div>
    );
}

export default Forgetpwd;
