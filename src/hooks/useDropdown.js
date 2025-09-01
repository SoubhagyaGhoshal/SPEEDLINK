import { useState, useEffect, useRef, useCallback } from 'react';

export const useDropdown = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRefs = useRef({});
  const menuButtonRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutside = Object.values(dropdownRefs.current).every(
        (ref) => ref && !ref.contains(event.target)
      );
      
      if (isOutside && !menuButtonRef.current?.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
      } else if (event.key === 'Tab' && activeDropdown) {
        // Handle tab navigation within dropdown
        const currentRef = dropdownRefs.current[activeDropdown];
        if (currentRef) {
          const focusableElements = currentRef.querySelectorAll(
            'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          
          if (focusableElements.length > 0) {
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (event.shiftKey && document.activeElement === firstElement) {
              event.preventDefault();
              lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
              event.preventDefault();
              firstElement.focus();
            }
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeDropdown]);

  const toggleDropdown = useCallback((id) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
    if (activeDropdown) setActiveDropdown(null);
  }, [activeDropdown]);

  const closeAll = useCallback(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, []);

  const isDesktop = () => window.innerWidth > 992;

  return {
    activeDropdown,
    isMobileMenuOpen,
    isScrolled,
    dropdownRefs,
    menuButtonRef,
    toggleDropdown,
    toggleMobileMenu,
    closeAll,
    isDesktop
  };
};
