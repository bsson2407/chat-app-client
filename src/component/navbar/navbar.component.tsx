import React from 'react';
import Avatar from './avatar/avatar.component';
import NavbarBottom from './navbar-bottom/navbar-bottom.component';
import NavbarTop from './navbar-top/navbar-top.component';
import './navbar.styles.scss';
const Navbar = () => {
  return (
    <div className="navbar">
      <Avatar />
      <NavbarTop />
      <NavbarBottom />
    </div>
  );
};

export default Navbar;
