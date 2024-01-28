"use client"
import React,{useEffect,useState} from 'react';
import { Header } from '@/components/Admin';
import Table from '@/components/Admin/table/Table';
import { createColumnHelper, } from "@tanstack/react-table";
import Image from 'next/image';
import Actions from '@/components/Admin/Action';
import { useGetDataProtected } from '@/redux/api/useGetData';
import Loading from '@/app/loading'
import { useRouter, useSearchParams } from 'next/navigation';
import { useUpdateDataProtected } from '@/redux/api/useUpdateData';


const columnHelper = createColumnHelper();



const Orders = () => {
  const [data, setData] = useState([]);
  const [loading , setLoading] = useState(true);
  const [documentCount, setDoumentCount] = useState(1);
  const searchParams = useSearchParams()
  const limitValue = searchParams.get("limit")
  const [limit,setLimit] = useState(limitValue)
  const [update,setUdate]= useState(1)
  const [page,setPage] = useState(1)
  const router = useRouter();
  const rerender = React.useReducer(() => ({}), {})[1]
  
  const cancelOrder = async (id,mainId) => {
    console.log(id,mainId);
    try {
      const res = await useUpdateDataProtected(`/api/admin/order/update/${mainId}`,{status:"cancelled",orderId:id});
      if(res.status){
        const val = data.map((val)=>  {
            if(val._id === id){
              val.status = "ashished";
            } 
            return val;
          })
          setData(val);
          rerender()
      }
      
    } catch (error) {
      console.error("Error fetching data:", error);
      
    }
  }
  
  const columns = [
    columnHelper.accessor((row) => row._id, {
      id: "_id",
      Aggregated: ({ value }) => `${value} Names`,
      cell: (info) => <abbr title={info.getValue()} >{Number(info.row.id)+1} </abbr>,
      header: () => <span>id</span>,
    }),
    columnHelper.accessor((row) => row.productName, {
      accessorKey: "productName",
      cell: (info) => <div style={{gridTemplateColumns:"6rem 1fr"}} className='grid  grid-rows-2 text-start'>
      <Image className='row-start-1 row-end-3 w-12 h-12 bg-black rounded-full object-fill' src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        width={500}
        height={500}
        alt="Picture of the author"/>
      <abbr title={info.getValue()} className='col-start-2 h-6 overflow-hidden w-12'>{info.getValue()}</abbr>
      <span>{info.row.original.qty}</span>
      </div>,
      header: () => <span>Name</span>,
    }),
  
    columnHelper.accessor((row) => row.itemsPrice, {
      accessorKey: "itemsPrice",
      cell: (info) => info.getValue(),
      header: () => <span>price</span>,
    }),
    columnHelper.accessor((row) => row.status, {
      accessorKey: "status",
      cell: (info) => info.getValue(),
      header: () => <span>status</span>,
    }),
    columnHelper.accessor((row) => row.shippingInfo, {
      accessorKey: "shippingInfo",
      cell: (info) => <p className='col-start-2 h-6 overflow-hidden'>{info.getValue()}</p>,
      header: () => <span>address</span>,
    }),
    columnHelper.accessor((row) => row.ctmName, {
      accessorKey: "ctmName",
      cell: (info) => info.getValue(),
      header: () => <span>ctm name</span>,
    }),
    columnHelper.accessor((row) => row.number, {
      accessorKey: "number",
      cell: (info) => info.getValue(),
      header: () => <span>number</span>,
    }),
    columnHelper.accessor("actions", {
      accessorKey: "actions",
      cell: (info) => <Actions id={info.row.original._id} actions={
        [{name:"cancel",task:()=>{cancelOrder(info.row.original._id,info.row.original.mainId)}},
        {name:"view details",task:()=>{router.push(`${info.row.original._id}`)}}]
        
      }></Actions>,
      header: () => <span>actions</span>,
    }),
  
  ];
  const getData = async () =>{
    try {
      let link;
      if(limitValue){
        link = `/api/admin/order/all-order?limit=${limit}&page=${page}`
      }else{
        link = `/api/admin/order/all-order?page=${page}`
      }
      const data = await useGetDataProtected(link);
      console.log(data);
      if(data){
        setData(data.data);
        setDoumentCount(data.length);
        setLimit(data.length);
      }
      setLoading(false);
      
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      
    }
  }
  useEffect(() => {
    getData();
  }, [page,update]);

  if(loading){
    return(<Loading></Loading>)
  }
  const exortHead = [
    [ "_id","productName", "mainId", "itemsPrice", "shippingInfo", "status","ctmName","number"],
    ...data.map(({ _id,productName,mainId,itemsPrice,shippingInfo,status,ctmName,number }) => [
         _id,
        productName,
        mainId,
        itemsPrice,
        shippingInfo,
        status,
        ctmName,
        number
      ]),
  ];

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl dark:bg-secondary-dark-bg dark:text-gray-300 bg-white">
      <Header category="Page" title="Orders" />
      <Table page={page} setPage={setPage} limit={limit-1} documentCount={documentCount} search={true} label={columns} tableData={data} exportData={exortHead}></Table>
    </div>
  );
};

export default Orders;
