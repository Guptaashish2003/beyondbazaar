"use client"
import React,{useState,useEffect} from 'react';
import { Header } from '@/components/Admin';
import Table from '@/components/Admin/table/Table';
import { createColumnHelper, } from "@tanstack/react-table";
import Actions from '@/components/Admin/Action';
import { useGetDataProtected } from '@/redux/api/useGetData';
import Loading from '@/app/loading'


const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor((row) => row._id, {
    id: "_id",
    Aggregated: ({ value }) => `${value} Names`,
    cell: (info) => <i>{info.getValue()} </i>,
    header: () => <span>id</span>,
  }),
  columnHelper.accessor((row) => row.promocode, {
    accessorKey: "promocode",
    cell: (info) => info.getValue(),
    header: () => <span>Code</span>,
  }),

  columnHelper.accessor((row) => row.discountType, {
    accessorKey: "discountType",
    cell: (info) => info.getValue(),
    header: () => <span>Type</span>,
  }),
  columnHelper.accessor((row) => row.discountValue, {
    accessorKey: "discountValue",
    cell: (info) => info.getValue(),
    header: () => <span>value</span>,
  }),
  columnHelper.accessor((row) => row.limit, {
    accessorKey: "limit",
    cell: (info) => info.getValue(),
    header: () => <span>limit</span>,
  }),
  columnHelper.accessor((row) => row.active, {
    accessorKey: "active",
    cell: (info) => info.getValue(),
    header: () => <span>active</span>,
  }),
  columnHelper.accessor((row) => row.endDate, {
    accessorKey: "endDate",
    cell: (info) => info.getValue(),
    header: () => <span>end Date</span>,
  }),
  columnHelper.accessor("actions", {
    accessorKey: "actions",
    cell: (info) => <Actions></Actions>,
    header: () => <span>actions</span>,
  }),

];

const PromoCodes = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const getData = async () => {
    try {
      const {data} = await useGetDataProtected("/api/admin/promocode/allPromo");
      console.log(data)
      if(data){
        setData(data);
      }
      setLoading(false);
      
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      
    }
  }
  useEffect(()=>{
    getData();
  },[])

  
  if(loading){
    return(<Loading></Loading>)
  }
    
  const exortHead = [
    ["_id","promocode","discountType","discountValue","limit",],
    ...data.map(({ _id,promocode,discountType,discountValue,limit }) => [
        _id,promocode,discountType,discountValue,limit
      ]),
  ];

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl dark:bg-secondary-dark-bg dark:text-gray-300 bg-white">
      <Header category="Page" title="PromoCodes" />
      <Table search={true} label={columns} tableData={data} exportData={exortHead}></Table>
    </div>
  );
};

export default PromoCodes;
