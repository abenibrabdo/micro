import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { url } from '../const';
import { useNavigate } from 'react-router-dom';
import SubTaskdash from './SubTaskdash';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import TimeAgo from 'react-timeago';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
const TaskDash = () => {
const [tasks, setTasks] = useState([])
const [loading, setLoading] = useState([])
const tableRef = useRef(null);
const navigate = useNavigate();

const fetchTasks = async () => {
        try {
            console.log(url,'url')
            const response = await axios.get(`${url}/task/api/tasks`);
            setTasks(response.data);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
useEffect(() => {
    

    fetchTasks();
}, []);

const updateTaskStatus = async (taskId, newStatus, status) => {
    try {
        if(status === "in-progress"){
        const response = await axios.put(`${url}/task/api/tasks/status`, {
            taskId,
            status: newStatus,
        });
        toast.success('updated successfully', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
      
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        fetchTasks();}
        else{
            toast.error('Task is already completed', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
      
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
    } catch (error) {
        console.error('Error updating task status:', error);
    }
};

const handleDeleteTask = async (taskId) => {
    try {
        await axios.delete(`${url}/task/api/tasks/${taskId}`);

        toast.success('🦄 deleted successfully', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
      
            draggable: true,
            progress: undefined,
            theme: "colored",
            });

        fetchTasks();
    } catch (err) {
        console.log(err);
    }
};



const exportToPDF = () => {
  const doc = new jsPDF();
  
  // Capture the table data
  const tableElement = tableRef.current;

  // Extract the table headers
  const headers = Array.from(tableElement.querySelectorAll('thead th')).map(header => header.innerText);

  // Extract the table rows
  const rows = Array.from(tableElement.querySelectorAll('tbody tr')).map(row =>
    Array.from(row.querySelectorAll('td')).map(cell => cell.innerText)
  );

  // Use jsPDF to create the table
  doc.autoTable({
    head: [headers],
    body: rows,
    margin: { top: 20 },
    styles: {
      fontSize: 10,
      cellPadding: 1,
    },
  });

  doc.save(`task-report-${new Date().toISOString()}.pdf`);
};
  return (
    <div className='flex flex-col min-h-screen bg-slate-200 mx-auto p-5'>

<div className='flex flex-col sm:flex-row items-center justify-between p-5'> 
    <div><h1 className='text-3xl font-bold'>Task Dashboard</h1></div>
    
    <div className='flex gap-2'><button className='bg-gray-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={exportToPDF}>Export to PDF</button>
    <button onClick={() => navigate('/createtask')} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Create Task</button></div>
</div>

<div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300" ref={tableRef} >
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th className="py-2 px-4 border-b">Project Title</th>
                        <th className="py-2 px-4 border-b">Title</th>
                        <th className="py-2 px-4 border-b">Description</th>
                        <th className="py-2 px-4 border-b">Status</th>
                        <th className="py-2 px-4 border-b">Due Date</th>
                        <th className="py-2 px-4 border-b">CreatedAt</th>
                        <th className="py-2 px-4 border-b">User Role</th>
                        <th colSpan={2} className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks?.map(task => (
                        <tr key={task?._id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">{task?.projectTitle}</td>
                            <td className="py-2 px-4 border-b">{task?.title}</td>
                            <td className="py-2 px-4 border-b">{task?.description}</td>
                            <td className="py-2 px-4 border-b">{task?.status}</td>
                            <td className="py-2 px-4 border-b">{format(new Date(task.dueDate), 'MMMM dd, yyyy')}</td>
                            <td className="py-2 px-4 border-b"> <TimeAgo date={task.createdAt} /></td>
                            <td className="py-2 px-4 border-b">{task?.userRole}</td>
                            <td className="py-2 px-4 border-b *:mx-2 *:my-1">
                                <button onClick={() => updateTaskStatus(task?._id, 'completed', task?.status)} className="bg-blue-500 text-white px-2 py-1 rounded-md">completed</button>
                                <button onClick={() => handleDeleteTask(task?._id)} className="bg-red-500 text-white px-2 py-1 rounded-md">delete</button>
                            
                            </td>
                        </tr>
                       
                    ))}
                    
                    {tasks.length <= 0 && <tr><td colSpan={5} className='py-2 px-4 font-bold'>no data</td></tr>}
                </tbody>
            </table>
        </div>
        

<SubTaskdash />

    </div>
  )
}

export default TaskDash

        