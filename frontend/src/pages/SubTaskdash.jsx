import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { url } from '../const';
import axios from 'axios';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import TimeAgo from 'react-timeago';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const SubTaskdash = () => {

    const tableRef2 = useRef(null);
    
const [tasks, setTasks] = useState([])
const [loading, setLoading] = useState([])
    const navigate = useNavigate();

    const fetchSubTasks = async () => {
        try {
            console.log(url,'url')
            const response = await axios.get(`${url}/task/api/subtasks`);
            setTasks(response.data);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
useEffect(() => {
    

    fetchSubTasks();
}, []);

    const updateSubTaskStatus = async (taskId, newStatus,status) => {
        try {
            if(status === "in-progress"){
                
            const response = await axios.put(`${url}/task/api/subtasks/status`, {
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
            fetchSubTasks();
                
            }
            else{
                toast.error('already completed ', {
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
    
    const handleDeleteSubTask = async (subtaskId) => {
        try {
            await axios.delete(`${url}/task/api/subtasks/${subtaskId}`);

            toast.success('deleted successfully', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
          
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            fetchSubTasks();
        } catch (err) {
            console.log(err);
        }
    };


    

const exportToPDF = () => {
    const doc = new jsPDF();
    
    const tableElement = tableRef2.current;
  
    const headers = Array.from(tableElement.querySelectorAll('thead th')).map(header => header.innerText);
  
    const rows = Array.from(tableElement.querySelectorAll('tbody tr')).map(row =>
      Array.from(row.querySelectorAll('td')).map(cell => cell.innerText)
    );
  
    doc.autoTable({
      head: [headers],
      body: rows,
      margin: { top: 20 },
      styles: {
        fontSize: 10,
        cellPadding: 1,
      },
    });
  
    doc.save(`sub-task-report-${new Date().toISOString()}.pdf`);
  };

  return (
    <div className='flex flex-col'>


<div className='flex flex-col sm:flex-row items-center justify-between p-5'> 
    <div><h1 className='text-2xl font-bold'>SubTasks</h1></div>
    <div className='flex gap-2'>
    <button className='bg-gray-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={exportToPDF}>Export to PDF</button>
        <button onClick={() => navigate('/create-subtask')} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Create SubTask</button></div>
</div>



<div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300" ref={tableRef2}>
                <thead >
                    <tr className="bg-gray-800 text-white">
                        <th className="py-2 px-4 border-b">Task</th>
                        <th className="py-2 px-4 border-b">Role</th>
                        <th className="py-2 px-4 border-b">Subtask Title</th>
                        <th className="py-2 px-4 border-b">Description</th>
                        <th className="py-2 px-4 border-b">Status</th>
                        <th className="py-2 px-4 border-b">Due Date</th>
                        <th className="py-2 px-4 border-b">CreatedAt</th>
                        <th colSpan={2} className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks?.map(task => (
                        <tr key={task?._id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">{task?.taskId?.title}</td>
                            <td className="py-2 px-4 border-b">{task?.taskId?.userRole}</td>
                            <td className="py-2 px-4 border-b">{task?.title}</td>
                            <td className="py-2 px-4 border-b">{task?.description}</td>
                            <td className="py-2 px-4 border-b">{task?.status}</td>
                            <td className="py-2 px-4 border-b">{format(new Date(task.dueDate), 'MMMM dd, yyyy')}</td>
                            <td className="py-2 px-4 border-b"> <TimeAgo date={task.createdAt} /></td>
                            <td className="py-2 px-4 border-b *:mx-2 *:my-1">
                                <button onClick={() => updateSubTaskStatus(task?._id, 'completed', task?.status)} className="bg-blue-500 text-white px-2 py-1 rounded-md">completed</button>
                                <button onClick={() => handleDeleteSubTask(task?._id)}  className="bg-red-500 text-white px-2 py-1 rounded-md">delete</button>
                            
                            </td>
                        </tr>
                    ))}
                    {tasks.length <= 0 && <tr><td colSpan={5} className='py-2 px-4 font-bold'>no data</td></tr>}
                </tbody>
            </table>
        </div>

    </div>
  )
}

export default SubTaskdash