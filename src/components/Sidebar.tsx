
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation();

  return (
    <div className={`bg-white ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 h-full border`}>
     <h3 className="p-4 font-bold">Pashione</h3>
      <ul className="mt-4">
        <li className={`group py-2 ${collapsed ? 'flex justify-center' : 'pl-4'} ${location.pathname === '/' ? 'bg-blue-500' : ''} rounded-xl transition-colors duration-200 relative shadow`}>
          <Link to="/" className={`flex items-center text-gray-800 ${location.pathname === '/' ? 'text-white' : 'hover:text-gray-800'} no-underline`}>
            <FontAwesomeIcon icon={faHome} className={`${collapsed ? 'mr-0' : 'mr-2'}`} />
            {collapsed && <span className="absolute left-full ml-2 bg-black text-white text-sm px-3 py-1 rounded hidden group-hover:block">Home</span>}
            {!collapsed && 'Home'}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
