import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  gap: 2rem;
`;

const SpinnerWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
`;

const SpinnerRing = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid transparent;
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  
  &:nth-child(2) {
    border-top-color: var(--primary-dark);
    animation-delay: -0.3s;
    animation-duration: 1.5s;
  }
  
  &:nth-child(3) {
    border-top-color: #ffb81a;
    animation-delay: -0.6s;
    animation-duration: 2s;
  }
`;

const LoadingText = styled(motion.div)`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-align: center;
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Dot = styled(motion.div)`
  width: 8px;
  height: 8px;
  background: var(--primary-color);
  border-radius: 50%;
  animation: ${pulse} 1.4s ease-in-out infinite both;
  
  &:nth-child(1) { animation-delay: -0.32s; }
  &:nth-child(2) { animation-delay: -0.16s; }
  &:nth-child(3) { animation-delay: 0s; }
`;

const LoadingSpinner = ({ message = "Loading SPEEDLINK..." }) => {
  return (
    <LoadingContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SpinnerWrapper>
        <SpinnerRing />
        <SpinnerRing />
        <SpinnerRing />
      </SpinnerWrapper>
      
      <LoadingText
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {message}
      </LoadingText>
      
      <LoadingDots>
        <Dot />
        <Dot />
        <Dot />
      </LoadingDots>
    </LoadingContainer>
  );
};

export default LoadingSpinner;
