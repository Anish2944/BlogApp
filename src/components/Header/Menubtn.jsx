// MenuButton.js

import React, { useState } from 'react';
import LogOutBtn from './LogOutBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
const MenuButton = ({ navItems, navigate, authStatus }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative duration-200">
      <button 
        className={`${menuOpen ? '-rotate-90 transition' : ''}block px-3 py-2 text-text focus:outline-none`}
        onClick={toggleMenu}
      >
        <FontAwesomeIcon icon={faBars} size='xl' />
      </button>
      {menuOpen && (
        <div className="absolute right-0 mt-2 bg-background rounded shadow-lg">
          <ul className="py-2 ">
            {navItems.map((item) => (
                item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => {
                    toggleMenu();
                    navigate(item.slug);
                  }}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                >
                  {item.name}
                </button>
              </li>) : null
            ))}
            {authStatus && (
              <li>
                <LogOutBtn />
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MenuButton;
