
import { Route, Routes } from 'react-router-dom'
import './App.css'

import {ToastContainer} from 'react-toastify'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import TaskForm from './pages/Mytax';
import TaskDash from './pages/TaskDash';
import SubTaskForm from './pages/SubTask';
import Navbar from './pages/Navbar';



function App() {

  return (
    <>
      <div>

      <Navbar/>
      <Routes>
       
       <Route exact path='/' element={<TaskDash/>} />
       <Route exact path='/createtask' element={<TaskForm/>} />
       <Route exact path='/create-subtask' element={<SubTaskForm/>} />
       
       </Routes>

        </div>
        <ToastContainer/>
    </>
  )
}

export default App
