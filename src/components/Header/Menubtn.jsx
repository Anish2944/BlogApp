// MenuButton.js

import React, { useState } from 'react';
import LogOutBtn from './LogOutBtn';
import { useDispatch } from "react-redux";
import {toggleTheme} from '../../store/themeSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
const MenuButton = ({ navItems, navigate, authStatus }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const toggelHandle = () => {
    dispatch(toggleTheme());
  }

  return (
    <div className="relative duration-200">
      <button 
        className={`${menuOpen ? '-rotate-90 transition-all duration-1000' : ''}block px-3 py-2 text-text focus:outline-none`}
        onClick={toggleMenu}
      >
        <FontAwesomeIcon icon={faBars} size='xl' />
      </button>
      {menuOpen && (
        <div className="absolute animate-slideUp right-0 mt-2 bg-background rounded shadow-lg">
          <ul className="py-2 ">
            {navItems.map((item) => (
                item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => {
                    toggleMenu();
                    navigate(item.slug);
                  }}
                  className="block px-4 py-2 text-text2 hover:bg-gray-300 w-full text-left"
                >
                  {item.name}
                </button>
              </li>) : null
            ))}
             <button onClick={toggelHandle} className="inline-block hover:bg-gray-300 text-text2 text-left px-6 py-2 duration-200" >Theme</button>

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
