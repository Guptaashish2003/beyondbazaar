"use client"
import React from 'react';
import { ChartsHeader, SparkLine } from '@/components/Admin';

const Line = () =>{ 
    const lineLabl = ["January", "February", "March", "April", "May", "June", "July"];
    const lineData = [
     {
       label: "Dataset 1",
       data: [89, 86, 3, 67, 68, 53, 93],
       
     },
     // for more line 
     // {
     //   label: 'Dataset 2',
     //   data: [24,92,72,28,92,57,78],
     //   borderColor: 'rgb(53, 162, 235)',
     //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
     // },
   ]
    return(
  <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
    <ChartsHeader category="Line" title="Inflation Rate" />
    <div className="w-full">
      <SparkLine label={lineLabl} data={lineData} />
    </div>
  </div>
);}

export default Line;