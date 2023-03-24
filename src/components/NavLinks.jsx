import React from 'react'
import { NavLink } from 'react-router-dom';
import navLinks from '../utils/navLinks';
const NavLinks = ({closeSidebar}) => {
  return (
    <div className='nav-links'>
      {navLinks.map((link) => {
        const { text, path, id } = link;
        return (
          <NavLink
            to={path}
            className={({ isActive }) => {
              return isActive ? 'nav-link active' : 'nav-link';
            }}
            key={id}
            onClick={() => closeSidebar()}
            end
          >
            <span className='icon'>{<link.icon />}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
}

export default NavLinks