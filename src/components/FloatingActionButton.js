import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaComments, FaArrowUp, FaTimes } from 'react-icons/fa';

const FABContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
`;

const MainButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(255, 102, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 35px rgba(255, 102, 0, 0.6);
  }

  &:active {
    transform: scale(0.95);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const ActionButton = styled(motion.button)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  color: var(--text-primary);
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 4px 15px var(--shadow-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
    transform: scale(1.1);
  }
`;

const ButtonLabel = styled(motion.div)`
  position: absolute;
  right: 70px;
  background: var(--card-bg);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 4px 15px var(--shadow-color);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  opacity: 0;
  pointer-events: none;
`;

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCall = () => {
    window.location.href = 'tel:+916295932396';
  };

  const handleChat = () => {
    // Implement chat functionality or redirect to support
    window.location.href = '/support';
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <FABContainer>
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ActionButton
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Scroll to top"
            >
              <FaArrowUp />
            </ActionButton>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <ActionButton
                onClick={handleChat}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Chat with us"
              >
                <FaComments />
              </ActionButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <ActionButton
                onClick={handleCall}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Call us now"
              >
                <FaPhone />
              </ActionButton>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <MainButton
        onClick={toggleMenu}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={isOpen ? "Close menu" : "Quick actions"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaTimes />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaPhone />
            </motion.div>
          )}
        </AnimatePresence>
      </MainButton>
    </FABContainer>
  );
};

export default FloatingActionButton;
