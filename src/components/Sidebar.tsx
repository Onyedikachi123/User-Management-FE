import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
// import { useAppSelector } from '../hooks/hooks'; // Import useAppSelector hook

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  // const users = useAppSelector((state) => state.users.users); // Access users from Redux store

  return (
    <div className={`bg-gray-800 ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 h-full`}>
      <div className="p-4"></div>
      <ul className="mt-4">
        <li className="group py-2 hover:bg-gray-700 transition-colors duration-200 relative">
          <Link to="/" className="flex items-center">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            {collapsed && <span className="absolute left-full ml-2 bg-black text-white text-sm px-3 py-1 rounded hidden group-hover:block">Home</span>}
            {!collapsed && 'Home'}
          </Link>
        </li>
        {/* {users.map((user) => (
          <li key={user.id} className="group py-2 hover:bg-gray-700 transition-colors duration-200 relative">
            <Link to={`/userdetail/${user.id}`} className="flex items-center">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              {collapsed && <span className="absolute left-full ml-2 bg-black text-white text-sm px-3 py-1 rounded hidden group-hover:block">{user.name}</span>}
              {!collapsed && user.name}
            </Link>
          </li>
        ))} */}
        {/* <li className="group py-2 hover:bg-gray-700 transition-colors duration-200 relative">
          <Link to="/add-user" className="flex items-center">
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
            {collapsed && <span className="absolute left-full ml-2 bg-black text-white text-sm px-3 py-1 rounded hidden group-hover:block">Add User</span>}
            {!collapsed && 'Add User'}
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
