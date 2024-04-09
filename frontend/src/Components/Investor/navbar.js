import React from 'react';
import { Link } from 'react-router-dom';

import "../../stylesheets/navbar.css"

const Navbar = () => {
    return (
        <div>
            <nav>
            <ul>
                <li><Link to="/InvestorHome">Investment Opportunities</Link></li>
                <li><Link to="/Invests">Your Investments</Link></li>
                <li><Link to="/Signin" id="logout">Logout</Link></li>
            </ul>
            </nav>
        </div>
    );
}

export default Navbar;
