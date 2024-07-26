import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import from react-router-dom
import { sidebarItems } from './sidebarData';

const AdminSidebar = () => {
  const location = useLocation(); // Get the current location from react-router

  return (
    <div className='hidden sm:flex sm:flex-col max-w-[200px] min-h-screen bg-gradient-to-r from-slate-800 to-gray-900 border-r-slate-600 border-r-2'>
      <div className="bg-green-400 p-4">
        <h1 className="text-1xl font-bold text-white">Tasks</h1>
      </div>
      <div className="flex flex-col">
        <ul className='p-2'>
          {sidebarItems?.map((item, index) => (
            <li
              key={index}
              className={` ${location?.pathname === item.link ? 'bg-gradient-to-r from-teal-200 to-sky-500 rounded-lg' : ''}`}
            >
              <Link to={item.link} className='flex gap-2 p-2 text-lg items-center hover:bg-gray-400 hover:rounded-lg'>
                
                <span className='text-white'>{item?.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
