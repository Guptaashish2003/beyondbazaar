"use client"
import React, { useEffect,useState } from 'react';
import { Header } from '@/components/Admin';
import Table from '@/components/Admin/table/Table';
import {  createColumnHelper, } from "@tanstack/react-table";
import Image from 'next/image';
import Actions from '@/components/Admin/Action';
import { useGetDataProtected } from '@/redux/api/useGetData';
import Loading from '@/app/loading'
import { useSearchParams } from 'next/navigation'
import { useUpdateDataProtected } from '@/redux/api/useUpdateData';
import FullScreenLoader from '@/components/FullScreenLoader/FullScreenLoader';
import { errorTostHandler } from '@/redux/api/errorTostHandler';
import { toast } from "react-toastify";
const columnHelper = createColumnHelper();



const Customers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fullScreenLoader , setFullScreenLoader] = useState(false);
  const [documentCount, setDoumentCount] = useState(1);
  const searchParams = useSearchParams()
  
  const limitValue = searchParams.get("limit")
  const [limit,setLimit] = useState(limitValue)
  const pageValue = searchParams.get("page")
  const [page,setPage] = useState(pageValue || 1)
  
  
  const suspend = async (id,suspend) => {
    try {
      setFullScreenLoader(true);
      const res = await useUpdateDataProtected(`/api/admin/user/suspend/${id}`,{suspend:!suspend});
    
      if(res.success){
        const val = data.map((val)=>  {
            if(val._id === id){
              val.suspend = !suspend;
            } 
            return val;
          })
          setData(val);
          toast.success(res.message,{autoClose: 1000, })
        }
        setFullScreenLoader(false);
      
    } catch (error) {
      setFullScreenLoader(false);
      errorTostHandler(error)
      
    }
  }

  
  const columns = [
    columnHelper.accessor((row) => row._id, {
      id: "_id",
      Aggregated: ({ value }) => `${value} Names`,
      cell: (info) => <abbr title={info.getValue()} >{Number(info.row.id)+1} </abbr>,
      header: () => <span>id</span>,
    }),
    columnHelper.accessor((row) => row.name, {
      accessorKey: "name",
      cell: (info) => <div style={{gridTemplateColumns:"3rem 1fr"}} className='grid  grid-rows-2 gap-x-1 text-start'>
        <Image className='row-start-1 row-end-3 w-12 h-12 bg-black rounded-full object-fill' src={info.row.original.image?info.row.original.image:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
          width={500}
          height={500}
          alt="Picture of the author"/>
        <span className='col-start-2'>{info.getValue()}</span>
        <span>{info.row.original.email}</span>
        </div>,
      header: () => <span>Name</span>,
    }),
  
    columnHelper.accessor((row) => row.phoneNo, {
      accessorKey: "phoneNo",
      cell: (info) => info.getValue(),
      header: () => <span>Phone No</span>,
    }),
    columnHelper.accessor((row) => row.role, {
      accessorKey: "role",
      cell: (info) => info.getValue(),
      header: () => <span>role</span>,
    }),
    columnHelper.accessor((row) => row.address, {
      accessorKey: "address",
      cell: (info) => <abbr >
        {`${info.getValue().street} ${info.getValue().city}`}
      </abbr>,
      header: () => <span>address</span>,
    }),
    columnHelper.accessor("actions", {
      accessorKey: "actions",
      cell: (info) => <Actions id={info.row.original._id} actions={
        [{name:`${info.row.original?.suspend?"allow":"suspend"}`,task:()=>{suspend(info.row.original._id,info.row.original?.suspend)}}]
        
      }></Actions>,
      header: () => <span>actions</span>,
    }),
  
  ];
  
  const getData = async () => {
    try {
        let link;
      if(limitValue){
        link = `/api/admin/user/all-user?limit=${limit}&page=${page}&fields=_id,name,email,phoneNo,address,role,byGoogle,createdAt`
      }else{
        
        link = `/api/admin/user/all-user?page=${page}`
        setLimit(10)
      }
      const  data  = await useGetDataProtected(link);
      if (data) {
        setData(data.data);
        setLimit(data.data.length);
      
        setDoumentCount(data.length);
      }
      setLoading(false);
    } catch (error) {
      errorTostHandler(error)
      setLoading(false);
    }
  };
  useEffect(() => {
   getData();

  }, [limit,page]);
  if(loading){
    return(<Loading></Loading>)
  }
  const exortHead = [
    ["_id","name" , "email", "phoneNo", "address", "role","byGoogle","createdAt"],
    ...data.map(({ _id,name , email, phoneNo, address, role,byGoogle,createdAt}) => [
      _id,name , email, phoneNo, address, role,byGoogle,createdAt
      ]),
  ];

  return (
    <>
     {fullScreenLoader && <FullScreenLoader/>}
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl dark:bg-secondary-dark-bg dark:text-gray-300 bg-white">
      <Header category="Page" title="Customers" />
      <div>
      <Table  page={page} setPage={setPage} limit={limit} documentCount={documentCount} search={true} label={columns} data={data} exportData={exortHead} ></Table>
      </div>
    </div>
    </>
  );
};

export default Customers;
