import React, { useEffect , useState} from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import "../stylesheets/home.css"
import useGetRole from '../hooks/useGetRole';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [getToken,r] = useGetRole();

  const navigate = useNavigate();

  useEffect(()=>{
    getToken("http://localhost:8081/verifytoken")
        if(r != undefined){
          console.log(r);
          if (r === "Student") navigate("/StudentHome");
          else if (r === "Entrepreneur") navigate("/EntrepreneurHome")
          else if (r === "Investor") navigate("/InvestorHome")
        }
  },[r])

  return (
    <div className="home-container">
        <Navbar/>
      <header>
        <h1>Welcome to ProjectBridge</h1>
        <p>A platform connecting entrepreneurs, students, and investors</p>
      </header>
      <section className="features">
        <div className="feature">
          <h2>For Entrepreneurs</h2>
          <p>ProjectBridge empowers entrepreneurs to showcase their innovative ideas and collaborate with students to bring their projects to life. From concept development to seeking investment, we provide the tools and resources to help you succeed in the competitive startup ecosystem.</p>
          <Link to="/SignUp">Explore Entrepreneurship Opportunities</Link>
        </div>
        <div className="feature">
          <h2>For Students</h2>
          <p>As a student, ProjectBridge offers you a unique opportunity to gain hands-on experience by working on real-world projects alongside entrepreneurs. Whether you're interested in technology, business, or social innovation, our platform connects you with meaningful projects and mentorship opportunities to help you grow professionally.</p>
          <Link to="/SignUp">Explore Student Opportunities</Link>
        </div>
        <div className="feature">
          <h2>For Investors</h2>
          <p>Invest in the future with ProjectBridge. Our platform connects you with high-potential startups and innovative projects seeking funding. From early-stage ventures to established businesses, discover opportunities to diversify your portfolio and support groundbreaking ideas that drive positive change.</p>
          <Link to="/SignUp">Explore Investment Opportunities</Link>
        </div>
      </section>
      <section className="about">
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
      <Link to="/aboutus" className="learn-more">Learn More About Us</Link>
    </div>
  </div>
</section>


    </div>
  );
}

export default Home;
