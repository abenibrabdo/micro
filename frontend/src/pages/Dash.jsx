import React, { useEffect, useState } from 'react';
import { url } from '../const';

const Dashboard = () => {
    const [taskCount, setTaskCount] = useState(0);
    const [subtaskCount, setSubtaskCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
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
        return <div>Loading...</div>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', width: '200px' }}>
                <h3>Task Count</h3>
                <p>{taskCount}</p>
            </div>
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', width: '200px' }}>
                <h3>Subtask Count</h3>
                <p>{subtaskCount}</p>
            </div>
        </div>
    );
};

export default Dashboard;
