import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../const';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const SubTaskForm = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [description, setDescription] = useState('');
    const [taskId, setTaskId] = useState('');
    const [loading, setLoading] = useState(false);
    

    const navigate = useNavigate();

    const fetchTasks = async () => {
        try {
            setLoading(true);
            console.log(url, 'url');
            const response = await axios.get(`${url}/task/api/tasks`);
            setTasks(response.data);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        } finally {
           setLoading(false) 
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreateSubTask = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(`${url}/task/api/subtasks`, {
                title,
                dueDate,
                description,
                taskId
            });
            console.log('Task created:', response.data);
            // Reset form fields after successful creation
            setTitle('');
            setDueDate('');
            setDescription('');
            setTaskId('');

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
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="max-w-lg mx-auto p-6 bg-slate-200 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Create SubTask</h2>
            
        
                <form onSubmit={handleCreateSubTask} className="space-y-4">
                    <input
                        type="text"
                        placeholder="SubTask Title"
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
                        placeholder="SubTask Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    
                    <select
                        id="task-select"
                        value={taskId}
                        onChange={(e) => setTaskId(e.target.value)}
                        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Select a task</option>
                        {tasks?.map((task) => (
                            <option key={task._id} value={task._id}>
                                {task.title}
                            </option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                        disabled={loading}
                    >
                        {loading ? 'Creating ...' : 'Create SubTask '}
                    </button>
                </form>
            
        </div>
    );
};

export default SubTaskForm;
