"use client"
import React,{useState,useEffect} from 'react';
import { Header } from '@/components/Admin';
import Table from '@/components/Admin/table/Table';
import { createColumnHelper, } from "@tanstack/react-table";
import Image from 'next/image';
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
  columnHelper.accessor((row) => row.productTags, {
    accessorKey: "productTags",
    cell: (info) => {
      const tags = info.getValue()[0]; 
      const firstTag = tags.split(' ').slice(0, 2).join(' '); 
      return (
        <div style={{ gridTemplateColumns: "3rem 2fr" }} className='grid  grid-rows-2 text-start'>
          <Image className='row-start-1 row-end-3 w-8 h-8 bg-black rounded-full object-fill' src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            width={500}
            height={500}
            alt="Picture of the author"/>
          <abbr title={firstTag} className='text-s'>{firstTag}</abbr>
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
  columnHelper.accessor((row) => row.productCategory, {
    accessorKey: "productCategory",
    cell: (info) => info.getValue(),
    header: () => <span>category</span>,
  }),
  columnHelper.accessor("actions", {
    accessorKey: "actions",
    cell: (info) => <Actions id={info.row.original._id}></Actions>,
    header: () => <span>actions</span>,
  }),

];

const Products = () => {

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
      if(limitValue){
        link = `/api/product/all-product?limit=${limit}&page=${page}`
      }else{
        link = `/api/product/all-product?page=${page}`
        setLimit(10)
      }
      const data = await useGetDataProtected(link);
      console.log(data.data)
      if (data) {
        setData(data.data);
        setDoumentCount(data.length);
      }
      setLoading(false);
    }catch(error){
      console.error("Error fetching data:", error);
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
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl dark:bg-secondary-dark-bg dark:text-gray-300 bg-white">
      <Header category="Page" title="Products" />
      {loading ? (
        // Loading indicator or skeleton loader can be placed here
        <p>Loading...</p>
      ) : (
        <Table page={page} setPage={setPage} limit={limit} documentCount={documentCount} search={true} label={columns} tableData={data} exportData={exportHead} />
      )}
    </div>
  );
};

export default Products;
