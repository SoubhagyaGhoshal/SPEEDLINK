import React from 'react';
import { Link } from 'react-router-dom';
import { FaWifi, FaTv, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #02050c;
  color: #cfcfcf;
  padding: 4rem 0 1rem;
  position: relative;
  border-top: 1px solid #1a1a1a;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const FooterSection = styled.div`
  h3 {
    color: #fff;
    margin-bottom: 1.25rem;
    font-size: 1.1rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.75rem;
  }
  
  a {
    color: #9ca3af;
    text-decoration: none;
    transition: all 0.2s ease;
    font-size: 0.95rem;
    
    &:hover {
      color: var(--secondary-color);
      padding-left: 4px;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    transition: all 0.3s ease;
    color: #fff;
    
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
  color: #6b7280;
  font-size: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const LegalLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;

  a {
    color: #6b7280;
    text-decoration: none;
    &:hover { color: var(--secondary-color); }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <h3>Services</h3>
            <ul>
              <li><Link to="/broadband">High Speed Broadband</Link></li>
              <li><Link to="/cable-tv">Digital Cable TV</Link></li>
              <li><Link to="/ott">OTT Platforms</Link></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/buy-connection-form">New Connection</Link></li>
              <li><Link to="/broadband">Upgrade Plan</Link></li>
              <li><Link to="/support">Track Order</Link></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Corporate</h3>
            <ul>
              <li><Link to="/">About Us</Link></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Support</h3>
            <ul>
              <li><Link to="/support">Contact Us</Link></li>
              <li><Link to="/support">FAQs</Link></li>
              <li><Link to="/support">Locate Us</Link></li>
              <li><Link to="/support">Feedback</Link></li>
            </ul>
            <SocialLinks>
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="#" aria-label="YouTube"><FaTv /></a>
            </SocialLinks>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <LegalLinks>
            <Link to="/terms">Legal Disclaimer</Link>
            <Link to="/terms">Terms of usage</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </LegalLinks>
          <p>&copy; {new Date().getFullYear()} SPEEDLINK. All Rights Reserved.</p>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 