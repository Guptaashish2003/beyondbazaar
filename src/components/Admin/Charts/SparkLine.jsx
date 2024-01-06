import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
export default function SparkLine({title="",label,color,width,height,data,...props}) {
  data[0].borderColor = color
  data[0].backgroundColor = "white"
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

   const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
        position: 'left',
      },
      
    },
  };
  
  const LineData = {
    labels: label,
    datasets: data,
  };
  return (
    <div {...props}>
      <Line
        options={options}
        data={LineData}
      />
    </div>
  );
}
