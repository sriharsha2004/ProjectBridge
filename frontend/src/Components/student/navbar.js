import React from 'react';
import { Link } from 'react-router-dom';
import "../../stylesheets/navbar.css"

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/StudentHome">Projects</Link></li>
        <li><Link to="/studentIdeas">My Ideas</Link></li>
        <li><Link to="/studentTieups">Your Tieups</Link></li>
        <li><Link to="/Signin" id="logout">Logout</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
