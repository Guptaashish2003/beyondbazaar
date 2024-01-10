"use client"
import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { ChartsHeader,Stacked as Barchart } from '@/components/Admin';


const Bar = () => {
    const { currentColor, currentMode } = useSelector((state) => state.theme);
    const lineLabl = ["January", "February", "March", "April", "May", "June", "July"];
    const stackedData = [
      {
        label: 'Dataset 1',
        data: [47,62,93,72,25,17,10],
      },
      {
        label: 'Dataset 2',
        data: [41,22,63,92,75,77,10],
      }
    ]
  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <ChartsHeader category="Bar" title="Olympic Medal Counts - RIO" />
      <div className=" w-full">
      <Barchart data={stackedData} label={lineLabl} />

      </div>
    </div>
  );
};

export default Bar;
