import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskDash from './TaskDash';
import { url } from '../const';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TaskForm = () => {

    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [description, setDescription] = useState('');
    const [userRole, setUserRole] = useState('teammember'); 
   // const [projectId, setProjectId] = useState('');
   // const [userId, setUserId] = useState('');
    const [project, setProject] = useState([]);
    const[projectTitle , setprojectTitle] = useState('');


    const navigate = useNavigate();


    const fetchProject = async () => {
        try {
            console.log(url,'url')
            const response = await axios.get(`${url}/project/api/projects`);
            setProject(response.data);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
useEffect(() => {
    

    fetchProject();
}, []);


    
const [loading, setLoading] = useState(false)

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(`${url}/task/api/tasks`, {
                title,
            
                dueDate,
                description,
                userRole,
                projectTitle
            });
            console.log('Task created:', response.data);
            // Reset form fields after successful creation
            setTitle('');
            setDueDate('');
            setDescription('');
            setUserRole('teammember');
            

            toast.success('created successfully', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
          
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            setTimeout(() => {
                
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Error creating task:', error);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Create Task</h2>
            <form onSubmit={handleCreateTask} className="space-y-4">
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="teammember">Team Member</option>
                    <option value="projectmanager">Project Manager</option>
                </select>

                <select
                id="task-select"
                value={projectTitle}
                onChange={(e) => setprojectTitle(e.target.value)}
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
                <option value="">Select a project</option>
                {project?.map((pro) => (
                    <option key={pro._id} value={pro?.title}>
                        {pro?.title}
                    </option>
                ))}
            </select>

{/*
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
*/}
                <button
                    type="submit"
                    className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                    disabled={loading}
                >
                     {loading ? 'creating...' : 'Create Task'}
                </button>
            </form>
            
        </div>
    );
};

export default TaskForm;
