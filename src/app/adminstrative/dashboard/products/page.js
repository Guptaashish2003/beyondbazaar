"use client"
import React,{useState,useEffect} from 'react';
import { Header } from '@/components/Admin';
import Table from '@/components/Admin/table/Table';
import { createColumnHelper, } from "@tanstack/react-table";
import Image from 'next/image';
import Actions from '@/components/Admin/Action';
import { useGetDataProtected } from '@/redux/api/useGetData';
import Loading from '@/app/loading'


const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor((row) => row.productTags, {
    accessorKey: "productTags",
    cell: (info) => {
      const tags = info.getValue()[0]; 
      const firstTag = tags.split(' ').slice(0, 2).join(' '); 
      return (
        <div style={{ gridTemplateColumns: "3rem 1fr" }} className='grid  grid-rows-2 gap-x-1 text-start'>
          <Image className='row-start-1 row-end-3 w-8 h-8 bg-black rounded-full object-fill' src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            width={500}
            height={500}
            alt="Picture of the author"/>
          <p className='text-s'>{firstTag}</p>
        </div>
      );
    },
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor((row) => row._id, {
    id: "_id",
    Aggregated: ({ value }) => `${value} Names`,
    cell: (info) => <i>{info.getValue()} </i>,
    header: () => <span>id</span>,
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
  columnHelper.accessor((row) => row.productCategory, {
    accessorKey: "productCategory",
    cell: (info) => info.getValue(),
    header: () => <span>category</span>,
  }),
  columnHelper.accessor("actions", {
    accessorKey: "actions",
    cell: (info) => <Actions></Actions>,
    header: () => <span>actions</span>,
  }),

];

const Products = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    try {
      const {data} = await useGetDataProtected("/api/product/all-product");
      console.log(data)
      if(data){
        setData(data);
      }
      setLoading(false);
    }catch(error){
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  if(loading){
    return(<Loading></Loading>)
  }


  const exportHead = [
    ["_id", "productTags ", "productPrice", "productQuantity", "productCategory"],
    ...data.map(({ _id, productTags, productPrice, productQuantity, productCategory }) => [
      _id,
      productTags,
      productPrice,
      productQuantity,
      productCategory,
    ]),
  ];

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl dark:bg-secondary-dark-bg dark:text-gray-300 bg-white">
      <Header category="Page" title="Products" />
      {loading ? (
        // Loading indicator or skeleton loader can be placed here
        <p>Loading...</p>
      ) : (
        <Table search={true} label={columns} tableData={data} exportData={exportHead} />
      )}
    </div>
  );
};

export default Products;
