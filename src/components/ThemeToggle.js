import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSun, FaMoon, FaPalette } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggleContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ThemeButton = styled(motion.button)`
  background: ${props => props.theme === 'light' 
    ? 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)' 
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  color: ${props => props.theme === 'light' ? '#1a1a1a' : '#ffffff'};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
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

const ThemeMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: ${props => props.theme === 'light' ? '#ffffff' : '#1a1a1a'};
  border: 1px solid ${props => props.theme === 'light' ? '#e0e0e0' : '#333333'};
  border-radius: 12px;
  padding: 0.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  z-index: 1000;
  min-width: 200px;
`;

const ThemeOption = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: ${props => props.theme === 'light' ? '#333333' : '#ffffff'};
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background: ${props => props.theme === 'light' ? '#f5f5f5' : '#2a2a2a'};
    transform: translateX(4px);
  }

  &.active {
    background: ${props => props.theme === 'light' ? '#e3f2fd' : '#1e3a5f'};
    color: ${props => props.theme === 'light' ? '#1976d2' : '#64b5f6'};
  }
`;

const ThemeIcon = styled.div`
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
`;

const ThemeLabel = styled.span`
  font-size: 0.9rem;
`;

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

const ThemeToggle = ({ currentTheme = 'dark', onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { id: 'dark', name: 'Dark Theme', icon: <FaMoon />, description: 'Easy on the eyes' },
    { id: 'light', name: 'Light Theme', icon: <FaSun />, description: 'Clean and bright' },
    { id: 'auto', name: 'Auto Theme', icon: <FaPalette />, description: 'Follows system' }
  ];

  const handleThemeChange = (themeId) => {
    if (onThemeChange && typeof onThemeChange === 'function') {
      onThemeChange(themeId);
    }
    setIsOpen(false);
  };

  const getCurrentThemeIcon = () => {
    const theme = themes.find(t => t.id === currentTheme);
    return theme ? theme.icon : <FaMoon />;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.theme-toggle')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <ThemeToggleContainer className="theme-toggle">
      <ThemeButton
        theme={currentTheme}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme menu"
      >
        {getCurrentThemeIcon()}
      </ThemeButton>

      <AnimatePresence>
        {isOpen && (
          <>
            <Backdrop
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <ThemeMenu
              theme={currentTheme}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {themes.map((theme) => (
                <ThemeOption
                  key={theme.id}
                  theme={currentTheme}
                  className={currentTheme === theme.id ? 'active' : ''}
                  onClick={() => handleThemeChange(theme.id)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ThemeIcon>{theme.icon}</ThemeIcon>
                  <div style={{ textAlign: 'left' }}>
                    <ThemeLabel style={{ display: 'block', fontWeight: 600 }}>
                      {theme.name}
                    </ThemeLabel>
                    <ThemeLabel style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                      {theme.description}
                    </ThemeLabel>
                  </div>
                </ThemeOption>
              ))}
            </ThemeMenu>
          </>
        )}
      </AnimatePresence>
    </ThemeToggleContainer>
  );
};

export default ThemeToggle;
