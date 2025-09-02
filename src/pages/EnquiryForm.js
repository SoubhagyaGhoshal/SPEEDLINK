import React from 'react';
import { FaArrowLeft, FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  padding: 2rem 0;
`;

const ContactContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;

const ContactHeader = styled.div`
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  color: white;
  padding: 3rem 2rem;
  text-align: center;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const ContactTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #ffffff, #fbbf24);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ContactSubtitle = styled.p`
  opacity: 0.95;
  font-size: 1.25rem;
  line-height: 1.6;
  max-width: 500px;
  margin: 0 auto;
`;

const ContactContent = styled.div`
  padding: 3rem 2rem;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ContactCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
    border-color: var(--secondary-color);
  }
`;

const ContactIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--secondary-color), #e68a00);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2rem;
  color: white;
`;

const ContactMethod = styled.h3`
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const ContactInfo = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const CallButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, var(--secondary-color), #e68a00);
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 40px rgba(245, 158, 11, 0.3);
    color: white;
    text-decoration: none;
  }
`;

const MessageSection = styled.div`
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const MessageTitle = styled.h2`
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const MessageText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 0;
`;

const EnquiryForm = () => {
  return (
    <PageContainer>
      <div className="container">
        <ContactContainer>
          <ContactHeader>
            <BackButton to="/broadband">
              <FaArrowLeft />
              Back to Broadband
            </BackButton>
            <ContactTitle>Call Us Directly</ContactTitle>
            <ContactSubtitle>Get in touch with us instantly for any questions about our services</ContactSubtitle>
          </ContactHeader>

          <ContactContent>
            <ContactGrid>
              <ContactCard>
                <ContactIcon>
                  <FaPhone />
                </ContactIcon>
                <ContactMethod>Call Us</ContactMethod>
                <ContactInfo>Speak directly with our customer service team</ContactInfo>
                <CallButton href="tel:+916295932396">
                  <FaPhone />
                  +91 98765 43210
                </CallButton>
              </ContactCard>

              <ContactCard>
                <ContactIcon>
                  <FaWhatsapp />
                </ContactIcon>
                <ContactMethod>WhatsApp</ContactMethod>
                <ContactInfo>Send us a message on WhatsApp for quick responses</ContactInfo>
                <CallButton href="https://wa.me/916295932396" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp />
                  WhatsApp Us
                </CallButton>
              </ContactCard>

              <ContactCard>
                <ContactIcon>
                  <FaEnvelope />
                </ContactIcon>
                <ContactMethod>Email</ContactMethod>
                <ContactInfo>Send us an email for detailed inquiries</ContactInfo>
                <CallButton href="mailto:support@speedlink.com">
                  <FaEnvelope />
                  support@speedlink.com
                </CallButton>
              </ContactCard>

              <ContactCard>
                <ContactIcon>
                  <FaMapMarkerAlt />
                </ContactIcon>
                <ContactMethod>Visit Us</ContactMethod>
                <ContactInfo>Visit our office for in-person assistance</ContactInfo>
                <CallButton href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                  <FaMapMarkerAlt />
                  View Location
                </CallButton>
              </ContactCard>
            </ContactGrid>

            <MessageSection>
              <MessageTitle>Why Call Us Directly?</MessageTitle>
              <MessageText>
                Get instant answers to your questions, personalized service recommendations, 
                and immediate assistance with your broadband and cable TV needs. 
                Our expert team is available to help you choose the perfect plan and 
                get your connection set up quickly.
              </MessageText>
            </MessageSection>
          </ContactContent>
        </ContactContainer>
      </div>

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
    </PageContainer>
  );
};

export default EnquiryForm;
