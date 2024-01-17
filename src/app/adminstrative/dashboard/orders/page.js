"use client"
import React from 'react';
import { Header } from '@/components/Admin';
import Table from '@/components/Admin/table/Table';
import { createColumnHelper, } from "@tanstack/react-table";
import Image from 'next/image';
import Actions from '@/components/Admin/Action';


const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor((row) => row._id, {
    id: "_id",
    Aggregated: ({ value }) => `${value} Names`,
    cell: (info) => <i>{info.getValue()} </i>,
    header: () => <span>id</span>,
  }),
  columnHelper.accessor((row) => row.productName, {
    accessorKey: "productName",
    cell: (info) => <div style={{gridTemplateColumns:"3rem 1fr"}} className='grid  grid-rows-2 gap-x-1 text-start'>
      <Image className='row-start-1 row-end-3 w-12 h-12 bg-black rounded-full object-fill' src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        width={500}
        height={500}
        alt="Picture of the author"/>
      <p className='col-start-2 row-end-3 row-start-1 text-wrap  overflow-hidden text-ellipsis'>{info.getValue()}</p>
      </div>,
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
    cell: (info) => <Actions></Actions>,
    header: () => <span>actions</span>,
  }),

];
const defaultData = [{"_id":1,"productName":"Widgetizer","productPrice":256143,"productQuantity":8,"productCategory":"Electronics"},
{"_id":2,"productName":"Doohickey","productPrice":50579,"productQuantity":85,"productCategory":"Sports"},
{"_id":3,"productName":"Gizmo B","productPrice":183844,"productQuantity":84,"productCategory":"Beauty"},
{"_id":4,"productName":"Widget A","productPrice":76382,"productQuantity":100,"productCategory":"Health"},
{"_id":5,"productName":"Gizmo Deluxe","productPrice":67581,"productQuantity":82,"productCategory":"Sports"},
{"_id":6,"productName":"Gizmo B","productPrice":73532,"productQuantity":97,"productCategory":"Automotive"},
{"_id":7,"productName":"Doodad X","productPrice":179115,"productQuantity":16,"productCategory":"Sports"},
{"_id":8,"productName":"Gadget Z","productPrice":44713,"productQuantity":37,"productCategory":"Clothing"},
{"_id":9,"productName":"Contraption","productPrice":255243,"productQuantity":28,"productCategory":"Beauty"},
{"_id":10,"productName":"Widget A","productPrice":165074,"productQuantity":42,"productCategory":"Automotive"},
{"_id":11,"productName":"Widget A","productPrice":93966,"productQuantity":6,"productCategory":"Home Decor"},
{"_id":12,"productName":"Thingamajig","productPrice":282005,"productQuantity":17,"productCategory":"Books"},
{"_id":13,"productName":"Whatchamacallit","productPrice":109295,"productQuantity":20,"productCategory":"Clothing"},
{"_id":14,"productName":"Doohickey","productPrice":66303,"productQuantity":40,"productCategory":"Food"},
{"_id":15,"productName":"Widget A","productPrice":87410,"productQuantity":84,"productCategory":"Automotive"},
{"_id":16,"productName":"Gizmo Deluxe","productPrice":57839,"productQuantity":18,"productCategory":"Electronics"},
{"_id":17,"productName":"Gadget Z","productPrice":243035,"productQuantity":31,"productCategory":"Food"},
{"_id":18,"productName":"Widget A","productPrice":6836,"productQuantity":22,"productCategory":"Health"},
{"_id":19,"productName":"Contraption","productPrice":151542,"productQuantity":85,"productCategory":"Home Decor"},
{"_id":20,"productName":"Gizmo B","productPrice":8195,"productQuantity":81,"productCategory":"Electronics"},
{"_id":21,"productName":"Widget A","productPrice":203018,"productQuantity":52,"productCategory":"Books"},
{"_id":22,"productName":"Gadget Z","productPrice":203482,"productQuantity":72,"productCategory":"Books"},
{"_id":23,"productName":"Gizmo B","productPrice":281508,"productQuantity":39,"productCategory":"Beauty"},
{"_id":24,"productName":"Whatchamacallit","productPrice":249862,"productQuantity":47,"productCategory":"Health"},
{"_id":25,"productName":"Widgetizer","productPrice":66291,"productQuantity":84,"productCategory":"Electronics"},
{"_id":26,"productName":"Thingamajig","productPrice":248987,"productQuantity":76,"productCategory":"Books"},
{"_id":27,"productName":"Thingamajig","productPrice":101070,"productQuantity":25,"productCategory":"Beauty"},
{"_id":28,"productName":"Contraption","productPrice":60229,"productQuantity":12,"productCategory":"Beauty"},
{"_id":29,"productName":"Doohickey","productPrice":81722,"productQuantity":13,"productCategory":"Clothing"},
{"_id":30,"productName":"Doodad X","productPrice":245262,"productQuantity":23,"productCategory":"Toys"},
{"_id":31,"productName":"Doodad X","productPrice":13653,"productQuantity":98,"productCategory":"Beauty"},
{"_id":32,"productName":"Gadget Z","productPrice":131929,"productQuantity":11,"productCategory":"Beauty"},
{"_id":33,"productName":"Doohickey","productPrice":68431,"productQuantity":26,"productCategory":"Beauty"},
{"_id":34,"productName":"Doohickey","productPrice":182118,"productQuantity":76,"productCategory":"Books"},
{"_id":35,"productName":"Whatchamacallit","productPrice":215283,"productQuantity":87,"productCategory":"Books"},
{"_id":36,"productName":"Whatchamacallit","productPrice":261239,"productQuantity":90,"productCategory":"Electronics"},
{"_id":37,"productName":"Thingamajig","productPrice":134776,"productQuantity":74,"productCategory":"Automotive"},
{"_id":38,"productName":"Gizmo B","productPrice":231950,"productQuantity":96,"productCategory":"Books"},
{"_id":39,"productName":"Whatchamacallit","productPrice":175158,"productQuantity":4,"productCategory":"Beauty"},
{"_id":40,"productName":"Gadget Z","productPrice":171553,"productQuantity":11,"productCategory":"Automotive"},
{"_id":41,"productName":"Gizmo B","productPrice":1310,"productQuantity":19,"productCategory":"Toys"},
{"_id":42,"productName":"Gadget Z","productPrice":122958,"productQuantity":14,"productCategory":"Electronics"},
{"_id":43,"productName":"Gadget Z","productPrice":188329,"productQuantity":90,"productCategory":"Books"},
{"_id":44,"productName":"Whatchamacallit","productPrice":299796,"productQuantity":37,"productCategory":"Books"},
{"_id":45,"productName":"Thingamajig","productPrice":249905,"productQuantity":73,"productCategory":"Food"},
{"_id":46,"productName":"Widget A","productPrice":202073,"productQuantity":57,"productCategory":"Sports"},
{"_id":47,"productName":"Widgetizer","productPrice":228245,"productQuantity":95,"productCategory":"Automotive"},
{"_id":48,"productName":"Gizmo B","productPrice":140097,"productQuantity":4,"productCategory":"Home Decor"},
{"_id":49,"productName":"Gizmo Deluxe","productPrice":10067,"productQuantity":3,"productCategory":"Clothing"},
{"_id":50,"productName":"Gizmo Deluxe","productPrice":100548,"productQuantity":89,"productCategory":"Beauty"}];



const Orders = () => {
  const exortHead = [
    ["productName", "_id", "email", "productPrice", "productCategory", "productQuantity"],
    ...defaultData.map(({ productName,_id,email,productPrice,productCategory,productQuantity }) => [
        productName,
        _id,
        email,
        productPrice,
        productCategory,
        productQuantity,
      ]),
  ];
  const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"]
  ];
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl dark:bg-secondary-dark-bg dark:text-gray-300 bg-white">
      <Header category="Page" title="Orders" />
      <Table search={true} label={columns} tableData={defaultData} exportData={csvData}></Table>
    </div>
  );
};

export default Orders;
