import React from 'react';
import { Link } from 'react-router-dom';
import "../../stylesheets/navbar.css"

const Navbar = () => {
    return (
        <nav>
            <ul>
            <li><Link to="/EntrepreneurHome">Your Projects</Link></li>
            <li><Link to="/EstudentIdeas">Student Responses</Link></li>
            <li><Link to="/Addproject">Add Project</Link></li>
            <li><Link to="/Entrposts">Your Investment Appeals</Link></li>
            <li><Link to="/EntrTieups">Your Tieups</Link></li>
            <li><Link to="/Signin" id='logout'>Logout</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
