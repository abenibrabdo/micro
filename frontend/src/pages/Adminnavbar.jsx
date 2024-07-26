import React from 'react'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";

const AdminNavbar = ({toggleSidebar, isSidebarOpen}) => {
  return (
    <div className="sm:flex px-4 py-2 bg-slate-800 justify-between border-b-2 border-slate-700 hidden">
      <div>
        {isSidebarOpen ? (
          <AiOutlineMenuFold
            className="text-3xl text-white cursor-pointer"
            onClick={toggleSidebar}
          />
        ) : (
          <AiOutlineMenuUnfold
            className="text-3xl text-white cursor-pointer"
            onClick={toggleSidebar}
          />
        )}
      </div>
      <div>
        <h1 className="text-3xl text-white"></h1>
      </div>
    </div>
  )
}

export default AdminNavbar
