"use client"
import React from 'react';

import { Header } from '@/components/Admin';
import Table from '@/components/Admin/table/Table';

const Customers = () => {


  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
        <Table></Table>
    </div>
  );
};

export default Customers;
