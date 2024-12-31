import React from 'react';
import styles from './About.module.css';
import { FiUsers, FiSearch, FiBell, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();
  return (
    <div className={styles.aboutContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <h1>About Community Service Finder</h1>
        <p>Empowering volunteers and organizations to connect seamlessly.</p>
      </section>

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <h2>Our Mission</h2>
        <p>
          We aim to build stronger communities by bridging the gap between volunteers and service opportunities.  
          With personalized matching and instant communication, we make volunteering simple and impactful.
        </p>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <h2>Key Features</h2>
        <div className={styles.featureCards}>
          <div className={styles.featureCard}>
            <FiUsers className={styles.icon} />
            <h3>Volunteer Matching</h3>
            <p>Find opportunities tailored to your skills and interests.</p>
          </div>
          <div className={styles.featureCard}>
            <FiSearch className={styles.icon} />
            <h3>Opportunity Posting</h3>
            <p>Organizations can post and manage their volunteering opportunities easily.</p>
          </div>
          <div className={styles.featureCard}>
            <FiBell className={styles.icon} />
            <h3>Notification System</h3>
            <p>Stay updated with real-time alerts for new opportunities.</p>
          </div>
          <div className={styles.featureCard}>
            <FiCheckCircle className={styles.icon} />
            <h3>Profile Management</h3>
            <p>Update your skills and preferences for better matching.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      {!token &&
      <section className={styles.ctaSection}>
        <h2>Ready to Make a Difference?</h2>
        <p>Join our platform today and start contributing to your community.</p>
        <button onClick={()=>{navigate('/signup')}} className={styles.ctaButton}>Get Started</button>
      </section>}
    </div>
  );
};

export default AboutPage;
