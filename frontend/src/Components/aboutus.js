import React from 'react';
import Navbar from './navbar';
import "../stylesheets/home.css"

function AboutUs() {
  return (
    <section className="about">
      <Navbar/>
      <div className="about-container">
        <div className="about-section">
          <h2>About ProjectBridge</h2>
          <p>ProjectBridge is more than just a platform—it's a community of innovators, collaborators, and changemakers. Our mission is to democratize entrepreneurship, education, and investment, making opportunities accessible to all who dare to dream big. With ProjectBridge, the possibilities are endless.</p>
        </div>
        <div className="about-section">
          <h2>About Us</h2>
          <p>Welcome to our project! Our platform aims to connect entrepreneurs, students, and investors to collaborate on innovative projects and ideas. Here's how our platform works:</p>
          <ul className="features-list">
            <li className="feature-item">Entrepreneurs can upload projects they're working on.</li>
            <li className="feature-item">Students can view and submit ideas for specific projects.</li>
            <li className="feature-item">Entrepreneurs can review and select the best ideas for their projects.</li>
            <li className="feature-item">Entrepreneurs can then request investment from investors for their projects.</li>
            <li className="feature-item">Investors can accept or reject investment requests from entrepreneurs.</li>
            <li className="feature-item">Accepted investment requests become visible to all stakeholders.</li>
          </ul>
          <p>Our platform aims to foster collaboration and innovation by bringing together individuals with diverse skills and ideas. We believe that by connecting entrepreneurs, students, and investors, we can help turn great ideas into successful projects.</p>
          <p>Our team is composed of passionate individuals dedicated to making a positive impact through technology. We have backgrounds in various fields, including software development, entrepreneurship, and finance, and we're excited to bring our expertise together to create this platform.</p>
          <p>Thank you for being a part of our community!</p>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
