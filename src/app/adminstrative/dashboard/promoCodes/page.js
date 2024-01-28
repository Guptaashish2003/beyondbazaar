"use client"
import React,{useState,useEffect} from 'react';
import { Header } from '@/components/Admin';
import Table from '@/components/Admin/table/Table';
import { createColumnHelper, } from "@tanstack/react-table";
import Actions from '@/components/Admin/Action';
import { useGetDataProtected } from '@/redux/api/useGetData';
import Loading from '@/app/loading'
import { useSearchParams } from 'next/navigation';


const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor((row) => row._id, {
    id: "_id",
    Aggregated: ({ value }) => `${value} Names`,
    cell: (info) => <abbr title={info.getValue()} >{Number(info.row.id)+1} </abbr>,
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
    cell: (info) => <Actions id={info.row.original._id}></Actions>,
    header: () => <span>actions</span>,
  }),

];

const PromoCodes = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [documentCount, setDoumentCount] = useState(1);
  const searchParams = useSearchParams()
  const limitValue = searchParams.get("limit")
  const [limit,setLimit] = useState(limitValue)
  const [page,setPage] = useState(1)
  
  const getData = async () => {
    try {
      let link;
      if(limit){
        link = `/api/admin/promocode/allPromo?limit=${limit}&page=${page}`
      }else{
        link = `/api/admin/promocode/allPromo?page=${page}`
        setLimit(10)
      }
      const data = await useGetDataProtected(link);
      console.log(data)
      if(data){
        setData(data.data);
        setDoumentCount(data.length);
      }
      setLoading(false);
      
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      
    }
  }
  useEffect(()=>{
    getData();
  },[page])

  
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
      <Table page={page} setPage={setPage} limit={limit} documentCount={documentCount} search={true} label={columns} tableData={data} exportData={exortHead}></Table>
    </div>
  );
};

export default PromoCodes;
