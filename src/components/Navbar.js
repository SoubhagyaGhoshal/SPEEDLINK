// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaPhone, FaChevronDown, FaWifi, FaTv, FaWhatsapp } from "react-icons/fa";
import styled, { createGlobalStyle } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import "typeface-poppins";
import SearchBar from "./SearchBar";

/* ---------- Global Theme (SPEEDLINK-style) ---------- */
const GlobalTheme = createGlobalStyle`
  :root{
    --primary-color: #153a71;       /* SPEEDLINK blue */
    --primary-dark: #10294c;        /* darker blue */
    --secondary-color: #f59e0b;     /* SPEEDLINK orange */
    --bg-dark: #000000;             /* page/nav black */
    --bg-card: #111111;             /* card/drops */
    --text-primary: #ffffff;        /* white */
    --text-secondary: #cfcfcf;      /* gray text */
    --border: #222222;              /* borders */
    --hover-glow: rgba(21,58,113,.1);
    --shadow-sm: 0 2px 10px rgba(0,0,0,.35);
    --shadow-md: 0 6px 22px rgba(0,0,0,.45);
    --shadow-lg: 0 12px 40px rgba(0,0,0,.6);
  }
  body { 
    color: var(--text-primary); 
    background: var(--bg-primary);
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;

/* ----------------------------- Main Nav Styles ----------------------------- */
const Nav = styled(motion.nav)`
  background: var(--bg-dark);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: var(--shadow-sm);
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;
  border-bottom: 1px solid var(--border);
`;

const NavContainer = styled.div`
  max-width: 1200px; 
  margin: 0 auto; 
  padding: 0 15px;
`;

const NavMain = styled.div`
  display: flex; 
  justify-content: space-between; 
  align-items: center;
  height: 75px; 
  padding: 10px 0;
`;

const Logo = styled(Link)`
  font-weight: 800; 
  color: #fff; 
  font-size: 2rem; 
  letter-spacing: 0.5px;
  text-transform: uppercase; 
  text-decoration: none; 
  transition: all 0.3s ease;
  
  &:hover { 
    color: var(--secondary-color); 
    transform: scale(1.05);
  }
`;

const NavCenter = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  justify-content: center;
  margin: 0 2rem;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Hamburger = styled.button`
  display: none; 
  background: transparent; 
  border: 0; 
  color: #fff;
  font-size: 1.5rem; 
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--secondary-color);
    transform: scale(1.1);
  }
  
  @media (max-width: 1024px) { 
    display: block; 
    margin-left: auto; 
  }
`;

const NavMenu = styled(motion.nav)`
  display: flex; 
  align-items: center; 
  margin-left: auto; 
  gap: .25rem;

  @media (max-width: 992px) {
    position: fixed; 
    left: ${({ $open }) => ($open ? 0 : "-100%")}; 
    top: 75px;
    flex-direction: column; 
    background: var(--bg-dark);
    width: 100%; 
    height: calc(100vh - 75px);
    padding: 1rem; 
    transition: left .3s ease; 
    overflow-y: auto; 
    z-index: 2000;
    align-items: flex-start; 
    gap: 0; 
    margin: 0;
    border-top: 1px solid var(--border);
    > a { width: 100%; margin: 0; padding: 0; }
  }
`;

const NavItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1.8rem 1.2rem;
  font-weight: 600; 
  font-size: .95rem; 
  text-transform: uppercase; 
  letter-spacing: .5px; 
  transition: all .25s ease;
  cursor: pointer;
  
  &:hover {
    color: var(--secondary-color);
    background: var(--hover-glow);
  }
`;

const NavLinkItem = styled(NavLink).attrs(() => ({ className: undefined }))`
  color: #fff; 
  text-decoration: none; 
  font-weight: 600; 
  padding: 1.8rem 1.2rem;
  font-size: .95rem; 
  text-transform: uppercase; 
  display: flex; 
  align-items: center; 
  gap: .5rem;
  border-bottom: 3px solid transparent; 
  letter-spacing: .5px; 
  transition: all .25s ease;
  
  &.active, &:hover {
    color: var(--secondary-color);
    border-bottom-color: var(--secondary-color);
    background: var(--hover-glow);
  }
  
  @media (max-width: 992px) {
    padding: .9rem 0; 
    width: 100%; 
    border-bottom: 1px solid var(--border);
    justify-content: space-between;
  }
`;

const DropdownIcon = styled.span`
  color: var(--text-secondary);
  transition: transform 0.3s ease;
  
  &.open {
    transform: rotate(180deg);
  }
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--bg-dark);
  border: 1px solid var(--border);
  border-radius: 8px;
  min-width: 200px;
  box-shadow: var(--shadow-lg);
  z-index: 1000;
  overflow: hidden;
  
  @media (max-width: 992px) {
    position: static;
    background: transparent;
    border: none;
    box-shadow: none;
    margin-left: 1rem;
    margin-top: 0.5rem;
  }
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  text-transform: none;
  letter-spacing: normal;
  
  &:hover {
    background: var(--hover-glow);
    color: var(--secondary-color);
  }
  
  @media (max-width: 992px) {
    padding: 0.5rem 0;
    font-size: 0.85rem;
  }
`;

const Cta = styled(Link)`
  margin-left: .5rem;
  background: var(--secondary-color);
  color: #000;
  text-decoration: none;
  font-weight: 900;
  letter-spacing: .3px;
  padding: .7rem 1.1rem;
  border-radius: 10px;
  transition: all .25s ease;
  box-shadow: 0 10px 22px rgba(245,158,11,.25);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover { 
    background: #e68a00; 
    transform: translateY(-2px); 
    box-shadow: 0 12px 25px rgba(245,158,11,.35);
  }

  @media (max-width: 992px) {
    width: 100%;
    text-align: center;
    margin: .75rem 0 0;
    justify-content: center;
  }
`;

const MobileSearchContainer = styled.div`
  display: none;
  width: 100%;
  margin: 1rem 0;
  
  @media (max-width: 992px) {
    display: block;
  }
`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeClass = ({ isActive }) => (isActive ? "active" : "");

  const handleSearch = (result) => {
    if (result.link) {
      window.location.href = result.link;
    }
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  // SPEEDLINK-style navigation structure
  const navItems = [
    {
      name: 'Home',
      link: '/',
      type: 'link'
    },
    {
      name: 'Cable TV',
      type: 'dropdown',
      items: [
        { name: 'Digital Cable TV', link: '/cable-tv', icon: <FaTv /> },
        { name: 'Channel Packs', link: '/cable-tv#packs', icon: <FaTv /> },
        { name: 'HD Channels', link: '/cable-tv#hd', icon: <FaTv /> },
        { name: 'Regional Content', link: '/cable-tv#regional', icon: <FaTv /> }
      ]
    },
    {
      name: 'Broadband',
      type: 'dropdown',
      items: [
        { name: 'High-Speed Plans', link: '/broadband', icon: <FaWifi /> },
        { name: 'Fiber Internet', link: '/broadband#fiber', icon: <FaWifi /> },
        { name: 'Business Plans', link: '/broadband#business', icon: <FaWifi /> },
        { name: 'Coverage Check', link: '/pincodes', icon: <FaWifi /> }
      ]
    }
  ];

  return (
    <>
      <GlobalTheme />
      <Nav 
        className={isScrolled ? "scrolled" : ""}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <NavContainer>
          <NavMain>
            <Logo to="/">SPEEDLINK</Logo>

            <NavCenter>
              <SearchBar theme="dark" onSearch={handleSearch} />
            </NavCenter>

            <NavRight>
              <Cta to="/enquire">
                <FaPhone /> Call Now
              </Cta>

              <Hamburger 
                aria-label="Toggle menu" 
                onClick={() => setMenuOpen(o => !o)}
              >
                {menuOpen ? <FaTimes /> : <FaBars />}
              </Hamburger>
            </NavRight>
          </NavMain>
        </NavContainer>
      </Nav>

      <AnimatePresence>
        {menuOpen && (
          <NavMenu 
            $open={menuOpen} 
            aria-label="Main navigation"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <MobileSearchContainer>
              <SearchBar theme="dark" onSearch={handleSearch} />
            </MobileSearchContainer>
            
            {navItems.map((item, index) => (
              <div key={index}>
                {item.type === 'link' ? (
                  <NavLinkItem to={item.link} className={activeClass}>
                    {item.name}
                  </NavLinkItem>
                ) : (
                  <NavItem onClick={() => toggleDropdown(item.name)}>
                    {item.name}
                    <DropdownIcon className={openDropdown === item.name ? 'open' : ''}>
                      <FaChevronDown />
                    </DropdownIcon>
                    
                    <AnimatePresence>
                      {openDropdown === item.name && (
                        <DropdownMenu
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.items.map((subItem, subIndex) => (
                            <DropdownItem key={subIndex} to={subItem.link} onClick={closeDropdown}>
                              {subItem.icon}
                              {subItem.name}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      )}
                    </AnimatePresence>
                  </NavItem>
                )}
              </div>
            ))}
          </NavMenu>
        )}
      </AnimatePresence>

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
    </>
  );
};

export default Navbar;
