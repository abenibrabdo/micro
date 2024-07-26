// Navbar.js
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 border-b-2 border-yellow-200">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-xl font-bold">Task Management </div>
        <button className="bg-red-200 text-black px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
         <a href="http://localhost:4000/status">Monitoring Tool</a> 
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
