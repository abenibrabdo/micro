import React, { useEffect, useState } from 'react';
import { url } from '../const';

import Lottie from "lottie-react";
import loadingAnimation from '../lottie/myloadding.json'; 
const Dashboard = () => {
    const [taskCount, setTaskCount] = useState(0);
    const [subtaskCount, setSubtaskCount] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                setLoading(true);
                const taskResponse = await fetch(`${url}/task/api/tasks/count`);
                const taskData = await taskResponse.json();
                setTaskCount(taskData.count);

                const subtaskResponse = await fetch(`${url}/task/api/subtasks/count`);
                const subtaskData = await subtaskResponse.json();
                setSubtaskCount(subtaskData.count);
            } catch (error) {
                console.error('Error fetching counts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCounts();
    }, []);

    if (loading) {
        return <div className="text-center h-[120px] w-[200px] text-xl"><Lottie animationData={loadingAnimation} height={100} width={150} /></div>;
    }

    return (
        <div className="flex flex-wrap justify-around p-5 bg-slate-200 min-h-screen *:text-xl">
            <div className="border max-h-[120px] border-green-300 p-5 rounded-lg w-48 shadow-md bg-gradient-to-r from-slate-500 *:text-white to-slate-800 flex flex-col gap-2 items-center">
                <h3 className="text-lg font-semibold">Task Count</h3>
                <p className="text-2xl">{taskCount > 0 ?  taskCount : 0}</p>
            </div>
            <div className="border max-h-[120px] bg-gradient-to-r from-fuchsia-500 to-cyan-500 *:text-white border-gray-300 p-5 rounded-lg w-48 shadow-md bg flex flex-col items-center">
                <h3 className="text-lg font-semibold">Subtask Count</h3>
                <p className="text-2xl">{subtaskCount > 0? subtaskCount : 0}</p>
            </div>
        </div>
    );
};

export default Dashboard;
