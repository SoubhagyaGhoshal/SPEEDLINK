// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import styled, { createGlobalStyle } from "styled-components";
import "typeface-poppins";

/* ---------- Global Theme (GTPL-style) ---------- */
const GlobalTheme = createGlobalStyle`
  :root{
    --primary-color: #ff6600;       /* bright orange */
    --primary-dark: #e65c00;        /* darker orange */
    --bg-dark: #000000;             /* page/nav black */
    --bg-card: #111111;             /* card/drops */
    --text-primary: #ffffff;        /* white */
    --text-secondary: #cfcfcf;      /* gray text */
    --border: #222222;              /* borders */
    --hover-glow: rgba(255,102,0,.1);
    --shadow-sm: 0 2px 10px rgba(0,0,0,.35);
    --shadow-md: 0 6px 22px rgba(0,0,0,.45);
    --shadow-lg: 0 12px 40px rgba(0,0,0,.6);
  }
  body { color: var(--text-primary); background:#000; }
`;

/* ----------------------------- Main Nav Styles ----------------------------- */
const Nav = styled.nav`
  background: var(--bg-dark);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0,0,0,0.6);
  font-family: 'Poppins', sans-serif;
  transition: box-shadow 0.3s ease;

  &.scrolled { box-shadow: 0 4px 14px rgba(0,0,0,0.9); }
`;

const NavContainer = styled.div`
  max-width: 1200px; margin: 0 auto; padding: 0 15px;
`;

const NavMain = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  height: 75px; padding: 10px 0;
`;

const Logo = styled(Link)`
  font-weight: 800; color: #fff; font-size: 2rem; letter-spacing: 0.5px;
  text-transform: uppercase; text-decoration: none; &:hover { color: #fff; }
`;

const Hamburger = styled.button`
  display: none; background: transparent; border: 0; color: #fff;
  font-size: 1.5rem; cursor: pointer;
  @media (max-width: 1024px) { display: block; margin-left: auto; }
`;

const NavMenu = styled.nav`
  display: flex; align-items: center; margin-left: auto; gap: .25rem;

  @media (max-width: 992px) {
    position: fixed; left: ${({ $open }) => ($open ? 0 : "-100%")}; top: 75px;
    flex-direction: column; background: var(--bg-dark);
    width: 100%; height: calc(100vh - 75px);
    padding: 1rem; transition: left .3s ease; overflow-y: auto; z-index: 2000;
    align-items: flex-start; gap: 0; margin: 0;
    > a { width: 100%; margin: 0; padding: 0; }
  }
`;

/* Router v6 active class */
const NavItem = styled(NavLink).attrs(() => ({ className: undefined }))`
  color: #fff; text-decoration: none; font-weight: 600; padding: 1.8rem 1.2rem;
  font-size: .95rem; text-transform: uppercase; display: flex; align-items: center; gap: .5rem;
  border-bottom: 3px solid transparent; letter-spacing: .5px; transition: all .25s ease;
  &.active, &:hover {
    color: var(--primary-color);
    border-bottom-color: var(--primary-color);
    background: var(--hover-glow);
  }
  @media (max-width: 992px) {
    padding: .9rem 0; width: 100%; border-bottom: 1px solid var(--border);
    justify-content: space-between;
  }
`;

const Cta = styled(Link)`
  margin-left: .5rem;
  background: var(--primary-color);
  color: #0b1727;
  text-decoration: none;
  font-weight: 900;
  letter-spacing: .3px;
  padding: .7rem 1.1rem;
  border-radius: 10px;
  transition: transform .15s ease, box-shadow .2s ease, background .2s ease;
  box-shadow: 0 10px 22px rgba(255,102,0,.25);

  &:hover { background: var(--primary-dark); transform: translateY(-1px); }

  @media (max-width: 992px) {
    width: 100%;
    text-align: center;
    margin: .75rem 0 0;
  }
`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeClass = ({ isActive }) => (isActive ? "active" : "");

  return (
    <>
      <GlobalTheme />
      <Nav className={isScrolled ? "scrolled" : ""}>
        <NavContainer>
          <NavMain>
            <Logo to="/">SPEEDLINK</Logo>

            <Hamburger aria-label="Toggle menu" onClick={() => setMenuOpen(o => !o)}>
              {menuOpen ? <FaTimes /> : <FaBars />}
            </Hamburger>

            <NavMenu $open={menuOpen} aria-label="Main navigation">
              <NavItem to="/" end className={activeClass}>Home</NavItem>
              <NavItem to="/broadband" className={activeClass}>Broadband</NavItem>
              <NavItem to="/cable-tv" className={activeClass}>Cable TV</NavItem>
              <NavItem to="/support" className={activeClass}>Support</NavItem>
            </NavMenu>
          </NavMain>
        </NavContainer>
      </Nav>
    </>
  );
};

export default Navbar;
