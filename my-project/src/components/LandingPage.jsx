import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  const scrollToList = () => {
    document.getElementById('here').scrollIntoView({ behavior: 'smooth' });
    // window.location.reload();
  };

  return (
    <div className="landing-page">
      <div className="hero-section">
        <h1 className="landing-title">Find Your Perfect Protein For Less</h1>
        <p className="landing-subtitle">Discover the best protein products tailored just for you</p>
        <button className="landing-button" onClick={scrollToList}>Explore Now</button>
      </div>
    </div>
  );
};

export default LandingPage;