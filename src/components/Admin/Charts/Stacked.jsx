import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Stacked({id,data,title,color,label,...props}) {
  data[0].backgroundColor = "#333" 
  if(data.length>1) data[1].backgroundColor = color;
  const options = {
    plugins: {
      title: {
        display: true,
        text: title,
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  console.log(data);
  const stacker = {
    labels:label,
    datasets:data,
  };
  return (
    <Bar {...props} id={id} options={options} data={stacker} />
  )
}
