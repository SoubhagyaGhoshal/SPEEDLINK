import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: var(--bg-dark);
  color: white;
  padding: 3rem 0 1rem;
  border-top: 3px solid var(--primary-color);
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: white;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 0.5rem;
  
  a {
    color: #9ca3af;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: white;
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  color: #9ca3af;
  font-size: 0.875rem;
  
  svg {
    color: var(--primary-color);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--secondary-color);
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #374151;
  padding-top: 1rem;
  text-align: center;
  color: #9ca3af;
  font-size: 0.875rem;
`;

const CompanyInfo = styled.div`
  margin-bottom: 1rem;
  
  h4 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--secondary-color);
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #9ca3af;
    line-height: 1.6;
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <div className="container">
        <FooterContent>
          <FooterSection>
            <CompanyInfo>
              <h4>SPEEDLINK</h4>
              <p>
                Fast. Reliable. Affordable. SPEEDLINK brings you the best in broadband and digital TV for your home and business.
              </p>
            </CompanyInfo>
            <SocialLinks>
              <SocialLink href="#" aria-label="Facebook"><FaFacebook /></SocialLink>
              <SocialLink href="#" aria-label="Instagram"><FaInstagram /></SocialLink>
            </SocialLinks>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/broadband" style={{ color: 'var(--secondary-color)', fontWeight: 600 }}>Broadband</Link>
              <Link to="/cable-tv" style={{ color: 'var(--secondary-color)', fontWeight: 600 }}>Cable TV</Link>
            </div>
          </FooterSection>

          <FooterSection>
            <h3>Services</h3>
            <FooterLinks>
              <FooterLink>
                <Link to="/broadband">Broadband</Link>
              </FooterLink>
              <FooterLink>
                <Link to="/cable-tv">Cable TV</Link>
              </FooterLink>

              <FooterLink>
                <Link to="/support">Customer Support</Link>
              </FooterLink>
            </FooterLinks>
          </FooterSection>

<FooterSection>
            <h3>Contact Info</h3>
            <ContactInfo>
              <FaPhone />
              <span>+91 6295932396</span>
            </ContactInfo>
            <ContactInfo>
              <FaEnvelope />
                              <span>support@speedlink.com</span>
            </ContactInfo>
            <ContactInfo>
              <FaMapMarkerAlt />
                              <span>SPEEDLINK, Khajurdihi - 713150</span>
            </ContactInfo>
          </FooterSection>

        </FooterContent>

        <FooterBottom>
          <p>&copy; {currentYear} SPEEDLINK. All rights reserved. | Designed with ❤️ for better connectivity</p>
        </FooterBottom>
      </div>
    </FooterContainer>
  );
};

export default Footer; 