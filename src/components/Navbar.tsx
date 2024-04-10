import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

interface NavbarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ collapsed, setCollapsed }) => {
  return (
    <header className="bg-blue-500 text-white p-2 flex justify-between items-center">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="text-white text-lg"
      >
        <FontAwesomeIcon icon={collapsed ? faBars : faTimes} />
      </button>
    </header>
  );
};

export default Navbar;
