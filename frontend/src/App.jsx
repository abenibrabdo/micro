import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskForm from './pages/Mytax';
import TaskDash from './pages/TaskDash';
import SubTaskForm from './pages/SubTask';
import Navbar from './pages/Navbar';
import Dashboard from './pages/Dash';
import { useState } from 'react';
import AdminNavbar from './pages/Adminnavbar';
import AdminSidebar from './pages/Sidebar';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div>
      <Navbar />

      <div className='flex flex-row gap-0'>
        {sidebarOpen && <AdminSidebar />}
        <div className='flex flex-col w-full'>
          <AdminNavbar toggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} />

          <Routes>
            <Route path='/' element={<TaskDash />} />
            <Route path='/createtask' element={<TaskForm />} />
            <Route path='/create-subtask' element={<SubTaskForm />} />
            <Route path='/dash' element={<Dashboard />} />
          </Routes>
        </div>
      </div>
      
      <ToastContainer />
    </div>
  );
}

export default App;
