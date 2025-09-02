import React from 'react';
import { Link } from 'react-router-dom';
import { FaWifi, FaTv, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  color: white;
  padding: 3rem 0 1rem;
  position: relative;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    color: var(--secondary-color);
    margin-bottom: 1rem;
    font-size: 1.2rem;
    font-weight: 700;
  }
  
  p, a {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    margin-bottom: 0.5rem;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--secondary-color);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transition: all 0.3s ease;
    
    &:hover {
      background: var(--secondary-color);
      transform: translateY(-2px);
    }
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <h3>SPEEDLINK</h3>
            <p>Your trusted partner for high-speed broadband and digital cable TV services. Experience seamless connectivity and entertainment.</p>
            <SocialLinks>
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <h3>Services</h3>
            <Link to="/broadband">High-Speed Broadband</Link>
            <Link to="/cable-tv">Digital Cable TV</Link>
            <Link to="/support">24/7 Support</Link>
            <Link to="/customer-portal">Customer Portal</Link>
          </FooterSection>

          <FooterSection>
            <h3>Contact Info</h3>
            <p><FaPhone /> +91 62959 32396</p>
            <p><FaEnvelope /> support@speedlink.com</p>
            <p><FaMapMarkerAlt /> Katwa, West Bengal</p>
          </FooterSection>

          <FooterSection>
            <h3>Quick Links</h3>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/support">Support</Link>
            <Link to="/contact">Contact</Link>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <p>&copy; 2024 SPEEDLINK. All rights reserved. | Designed with ❤️ for our customers</p>
        </FooterBottom>
      </FooterContent>

      {/* Floating WhatsApp Button */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 1000,
        background: '#25D366',
        color: 'white',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        boxShadow: '0 8px 25px rgba(37, 211, 102, 0.4)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textDecoration: 'none'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.1)';
        e.target.style.boxShadow = '0 12px 35px rgba(37, 211, 102, 0.6)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = '0 8px 25px rgba(37, 211, 102, 0.4)';
      }}
      onClick={() => window.open('https://wa.me/916295932396', '_blank')}
      >
        <FaWhatsapp />
      </div>
    </FooterContainer>
  );
};

export default Footer; 