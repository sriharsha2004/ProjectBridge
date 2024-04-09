import React from 'react';
import { Link } from 'react-router-dom';
import "../stylesheets/navbar.css"


function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Signin">SignIn</Link></li>
        <li><Link to="/SignUp">SignUp</Link></li>
        <li><Link to="/aboutus">About Us</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
