"use client"
import React from 'react'
import { ChartsHeader, Stacked as StackedChart } from '@/components/Admin';
export default function page() {
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
    <ChartsHeader category="Stacked" title="Revenue Breakdown" />
    <div className="w-full">
      <StackedChart data={stackedData} label={lineLabl} />
    </div>
  </div>
  )
}
