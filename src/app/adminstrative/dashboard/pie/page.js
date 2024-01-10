"use client"
import React from 'react';

import { ChartsHeader, PieChart } from '@/components/Admin';

const Pie = () =>{ 
    const lineLabl = ["January", "February", "March", "April", "May", "June", "July"];
const pieData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
        {
        label: '# of Votes',
        data: [12, 19, 3],
        backgroundColor: [
            '#7352ff',
            '#ff5c8e',
            '#333',
            
        ],
        borderColor: [
            '#7352ff',
            '#ff5c8e',
            '#333',
        ],
        borderWidth: 1,
        },
    ],
    };
    return(
    
  <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
    <ChartsHeader category="Pie" title="Project Cost Breakdown" />
    <div className="w-full">
      <PieChart id="chart-pie" label={lineLabl} data={pieData} legendVisiblity height="full" />
    </div>
  </div>
);
}
export default Pie;
