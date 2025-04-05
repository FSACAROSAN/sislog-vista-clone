
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Ene', Clientes: 5, Items: 25, UIDs: 65 },
  { name: 'Feb', Clientes: 7, Items: 30, UIDs: 75 },
  { name: 'Mar', Clientes: 6, Items: 28, UIDs: 72 },
  { name: 'Abr', Clientes: 8, Items: 32, UIDs: 85 },
  { name: 'May', Clientes: 10, Items: 30, UIDs: 90 },
  { name: 'Jun', Clientes: 12, Items: 35, UIDs: 110 },
];

const ActivityChart: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Actividad Mensual</h3>
      <p className="text-sm text-gray-600 mb-4">Resumen de actividad en los últimos 6 meses</p>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Clientes" fill="#0097cc" barSize={10} />
            <Bar dataKey="Items" fill="#ff7f41" barSize={10} />
            <Bar dataKey="UIDs" fill="#00a67d" barSize={10} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityChart;
