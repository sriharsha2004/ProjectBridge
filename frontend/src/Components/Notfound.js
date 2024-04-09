import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/notfound.css';


const Notfound = () => {

  return (
    <div className="not-found-container">
      <h2 className="not-found-heading">
        <span className="digit">4</span>
        <span className="digit">0</span>
        <span className="digit">4</span>
      </h2>
      <p className="not-found-message">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="not-found-button">Go Back</Link>
      <p className="additional-content">
        If you believe this is an error, please <Link to="#" className="contact-link">contact us</Link>.
      </p>
    </div>
  );
}

export default Notfound;
