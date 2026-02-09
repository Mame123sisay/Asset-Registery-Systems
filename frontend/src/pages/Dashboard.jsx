import React, { useEffect, useState } from 'react';
import { client } from '../api/client';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard() {
  const [conditionStats, setConditionStats] = useState([]);
  const [departmentStats, setDepartmentStats] = useState([]);

  useEffect(() => {
    async function fetchStats() {
      const condRes = await client.get('/api/assets/stats/condition',{
           headers:{
          Authorization:`Bearer ${localStorage.getItem('pos-token')}`
        }
      });
      const deptRes = await client.get('/api/assets/stats/department',{
           headers:{
          Authorization:`Bearer ${localStorage.getItem('pos-token')}`
        }
      });
      setConditionStats(condRes.data);
      setDepartmentStats(deptRes.data);
    }
    fetchStats();
  }, []);

  const conditionData = {
    labels: conditionStats.map(s => s._id),
    datasets: [
      {
        label: 'Assets by Condition',
        data: conditionStats.map(s => s.count),
        backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#F44336']
      }
    ]
  };

  const departmentData = {
    labels: departmentStats.map(s => s.name),
    datasets: [
      {
        label: 'Assets by Department',
        data: departmentStats.map(s => s.count),
        backgroundColor: ['#2196F3', '#FF5722', '#9C27B0', '#009688']
      }
    ]
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Assets by Condition</h2>
        <Bar data={conditionData} />
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Assets by Department</h2>
        <Pie data={departmentData} />
      </div>
    </div>
  );
}
