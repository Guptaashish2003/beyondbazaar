"use client"
import React,{useState,useEffect} from 'react';
import { Header } from '@/components/Admin';
import Table from '@/components/Admin/table/Table';
import { createColumnHelper, } from "@tanstack/react-table";
import Image from 'next/image';
import Actions from '@/components/Admin/Action';
import { useGetDataProtected } from '@/redux/api/useGetData';
import Loading from '@/app/loading'
import { useRouter, useSearchParams } from 'next/navigation';
import { useUpdateDataProtected } from '@/redux/api/useUpdateData';
import { toast } from "react-toastify";
import { errorTostHandler } from '@/redux/api/errorTostHandler';
import FullScreenLoader from '@/components/FullScreenLoader/FullScreenLoader';

const columnHelper = createColumnHelper();

const Products = () => {
  
  const [data, setData] = useState([]);
  const [fullScreenLoader , setFullScreenLoader] = useState(false);
  const [loading, setLoading] = useState(true);
  const [documentCount, setDoumentCount] = useState(1);
  const searchParams = useSearchParams()
  const limitValue = searchParams.get("limit")
  const [limit,setLimit] = useState(limitValue)
  const [page,setPage] = useState(1)
  const router= useRouter()
  
  const available = async (id,productAvailable) => {
    try {
      setFullScreenLoader(true);
      const res = await useUpdateDataProtected(`/api/admin/product/update-product/${id}`,{productAvailable:!productAvailable});
      if(res.success){
        const val = data.map((val)=>  {
            if(val._id === id){
              val.productAvailable = !productAvailable;
            } 
            return val;
          })
          setData(val);
      }
      setFullScreenLoader(false);
      toast.success(res.message,{autoClose: 1000, })
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
    columnHelper.accessor((row) => row.productName, {
      accessorKey: "productName",
      cell: (info) => {
        const name = info.getValue(); 
        return (
          <div style={{ gridTemplateColumns: "3rem 2fr" }} className='grid  grid-rows-2 text-start'>
            <Image className='row-start-1 row-end-3 w-8 h-8 bg-black rounded-full object-fill' src={info.row.original.productImage[0]}
              width={500}
              height={500}
              alt="Picture of the author"/>
            <abbr title={name} className='text-s max-h-5 max-w-60 overflow-clip'>{name}</abbr>
          </div>
        );
      },
      header: () => <span>Name</span>,
    }),
  
    columnHelper.accessor((row) => row.productPrice, {
      accessorKey: "productPrice",
      cell: (info) => info.getValue(),
      header: () => <span>price</span>,
    }),
    columnHelper.accessor((row) => row.productQuantity, {
      accessorKey: "productQuantity",
      cell: (info) => info.getValue(),
      header: () => <span>stock</span>,
    }),
    columnHelper.accessor((row) => row.productCategory._id, {
      accessorKey: "productCategory",
      cell: (info) => info.getValue(),
      header: () => <span>category</span>,
    }),
    columnHelper.accessor("actions", {
      accessorKey: "actions",
      cell: (info) => <Actions id={info.row.original._id} actions={
        [{name:`${info.row.original.productAvailable?"disable":"enable"}`,task:()=>{available(info.row.original._id,info.row.original.productAvailable)}},
        {name:"edit product",task:()=>{router.push(`/adminstrative/dashboard/product/${info.row.original.slug}?id=${info.row.original._id}`)}},]
        
      }></Actions>,
      header: () => <span>actions</span>,
    }),
  
  ];
  const getData = async () => {
    try {
      let link;
      if(limitValue){
        link = `/api/product/all-product?limit=${limit}&page=${page}`
      }else{
        link = `/api/product/all-product?page=${page}`
        setLimit(10)
      }
      const data = await useGetDataProtected(link);
      
      if (data) {
        setData(data.data);
        setDoumentCount(data.length);
      }
      setLoading(false);
    }catch(error){
      errorTostHandler(error)
      setLoading(false);
    }
  }
  useEffect(() => {
    getData();
  }, [page]);
  if(loading){
    return(<Loading></Loading>)
  }


  const exportHead = [
    ["_id", "productName ", "productPrice", "productQuantity", "productCategory","createdAt"],
    ...data.map(({_id, productName , productPrice, productQuantity, productCategory,createdAt }) => [
     _id, productName , productPrice, productQuantity, productCategory,createdAt
    ]),
  ];

  return (
    <>
     {fullScreenLoader && <FullScreenLoader/>}
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl dark:bg-secondary-dark-bg dark:text-gray-300 bg-white">
      <Header category="Page" title="Products" />
      {loading ? (
        // Loading indicator or skeleton loader can be placed here
        <p>Loading...</p>
      ) : (
        <Table page={page} setPage={setPage} limit={limit} documentCount={documentCount} search={true} label={columns} data={data} exportData={exportHead} />
      )}
    </div>
    </>
  );
};

export default Products;
