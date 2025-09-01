import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaComments, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  background: var(--bg-secondary);
  padding: 2rem 0;
`;

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
`;

const FormHeader = styled.div`
  background: var(--secondary-color);
  color: white;
  padding: 2rem;
  text-align: center;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 1rem;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const FormTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const FormSubtitle = styled.p`
  opacity: 0.9;
  font-size: 1.1rem;
`;

const FormContent = styled.div`
  padding: 3rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary);
  
  &::after {
    content: '*';
    color: var(--secondary-color);
    margin-left: 0.25rem;
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--secondary-color);
    box-shadow: 0 0 0 3px rgba(243, 156, 18, 0.1);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--secondary-color);
    box-shadow: 0 0 0 3px rgba(243, 156, 18, 0.1);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--secondary-color);
    box-shadow: 0 0 0 3px rgba(243, 156, 18, 0.1);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: var(--secondary-color);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: #d97706;
    transform: translateY(-1px);
  }

  &:disabled {
    background: var(--text-light);
    cursor: not-allowed;
    transform: none;
  }
`;

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    pincode: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert('Thank you! Your enquiry has been submitted successfully. We will get back to you within 24 hours.');
      setIsSubmitting(false);
    }, 2000);
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() !== '');
  };

  return (
    <PageContainer>
      <div className="container">
        <FormContainer>
          <FormHeader>
            <BackButton to="/broadband">
              <FaArrowLeft />
              Back to Broadband
            </BackButton>
            <FormTitle>Enquire Now</FormTitle>
            <FormSubtitle>Get in touch with us for any questions about our services</FormSubtitle>
          </FormHeader>

          <FormContent>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel>Full Name</FormLabel>
                <FormInput
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Email Address</FormLabel>
                <FormInput
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Mobile Number</FormLabel>
                <FormInput
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  placeholder="Enter 10-digit mobile number"
                  maxLength="10"
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Pincode</FormLabel>
                <FormInput
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="Enter 6-digit pincode"
                  maxLength="6"
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Service Interested In</FormLabel>
                <FormSelect
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Service</option>
                  <option value="broadband">Broadband</option>
                  <option value="cable-tv">Cable TV</option>
                  <option value="both">Both Services</option>
                  <option value="other">Other</option>
                </FormSelect>
              </FormGroup>

              <FormGroup>
                <FormLabel>Message</FormLabel>
                <FormTextarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your requirements or any questions you have..."
                  required
                />
              </FormGroup>

              <SubmitButton 
                type="submit" 
                disabled={!isFormValid() || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div style={{ width: '20px', height: '20px', border: '2px solid white', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaCheck />
                    Submit Enquiry
                  </>
                )}
              </SubmitButton>
            </form>
          </FormContent>
        </FormContainer>
      </div>
    </PageContainer>
  );
};

export default EnquiryForm; 