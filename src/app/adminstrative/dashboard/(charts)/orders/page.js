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
    <span className='col-start-2'>{info.getValue()}</span>
    <span>{info.row.original.productPrice}</span>
    </div>,
    header: () => <span>Name</span>,
  }),

  columnHelper.accessor((row) => row.productPrice, {
    accessorKey: "productPrice",
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
    cell: (info) => info.getValue(),
    header: () => <span>address</span>,
  }),
  columnHelper.accessor((row) => row.customers, {
    accessorKey: "customers",
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
    cell: (info) => <Actions></Actions>,
    header: () => <span>actions</span>,
  }),

];
const defaultData = [{"_id":1,"productPrice":5904,"productName":"Gizmo B","status":"'delivered'","shippingInfo":"PO Box 79619","customers":"Wanda","number":"618-567-1953"},
{"_id":2,"productPrice":6500,"productName":"Whatchamacallit","status":"'processing'","shippingInfo":"20th Floor","customers":"Conrado","number":"346-466-1433"},
{"_id":3,"productPrice":2563,"productName":"Thingamajig","status":"'processing'","shippingInfo":"11th Floor","customers":"Donna","number":"406-797-2415"},
{"_id":4,"productPrice":5280,"productName":"Thingamajig","status":"'pending'","shippingInfo":"13th Floor","customers":"Tove","number":"827-121-8806"},
{"_id":5,"productPrice":7843,"productName":"Whatchamacallit","status":"'processing'","shippingInfo":"Apt 602","customers":"Herschel","number":"936-424-1604"},
{"_id":6,"productPrice":2002,"productName":"Doodad X","status":"'processing'","shippingInfo":"PO Box 52516","customers":"Alayne","number":"709-561-1240"},
{"_id":7,"productPrice":2105,"productName":"Widgetizer","status":"'delivered'","shippingInfo":"Room 1346","customers":"Sophronia","number":"844-735-5898"},
{"_id":8,"productPrice":6335,"productName":"Widgetizer","status":"'shipped'","shippingInfo":"19th Floor","customers":"Hi","number":"481-367-9919"},
{"_id":9,"productPrice":888,"productName":"Contraption","status":"'cancelled'","shippingInfo":"PO Box 91116","customers":"Rozanne","number":"898-116-9586"},
{"_id":10,"productPrice":9397,"productName":"Widget A","status":"'pending'","shippingInfo":"PO Box 99680","customers":"Maressa","number":"211-214-1179"},
{"_id":11,"productPrice":9444,"productName":"Whatchamacallit","status":"'processing'","shippingInfo":"11th Floor","customers":"Norman","number":"795-574-8147"},
{"_id":12,"productPrice":5271,"productName":"Doohickey","status":"'shipped'","shippingInfo":"Apt 945","customers":"Jillayne","number":"755-131-8704"},
{"_id":13,"productPrice":2516,"productName":"Gizmo Deluxe","status":"'pending'","shippingInfo":"5th Floor","customers":"Dan","number":"304-948-8019"},
{"_id":14,"productPrice":5539,"productName":"Widgetizer","status":"'shipped'","shippingInfo":"Apt 1886","customers":"Hedwig","number":"210-340-6141"},
{"_id":15,"productPrice":6672,"productName":"Gizmo Deluxe","status":"'processing'","shippingInfo":"Apt 1351","customers":"Anastasia","number":"651-688-3685"},
{"_id":16,"productPrice":8356,"productName":"Doodad X","status":"'pending'","shippingInfo":"Room 960","customers":"Lanie","number":"987-931-6820"},
{"_id":17,"productPrice":7895,"productName":"Whatchamacallit","status":"'shipped'","shippingInfo":"Room 1841","customers":"Delphinia","number":"225-276-4320"},
{"_id":18,"productPrice":1621,"productName":"Gizmo Deluxe","status":"'shipped'","shippingInfo":"PO Box 77238","customers":"Hermina","number":"432-225-1012"},
{"_id":19,"productPrice":6728,"productName":"Doohickey","status":"'pending'","shippingInfo":"Room 764","customers":"Kerstin","number":"428-397-4234"},
{"_id":20,"productPrice":8100,"productName":"Widget A","status":"'processing'","shippingInfo":"Room 1544","customers":"Maury","number":"278-890-9376"},
{"_id":21,"productPrice":1723,"productName":"Gizmo Deluxe","status":"'delivered'","shippingInfo":"Apt 815","customers":"Hank","number":"543-760-6233"},
{"_id":22,"productPrice":700,"productName":"Whatchamacallit","status":"'pending'","shippingInfo":"Apt 125","customers":"Eal","number":"652-557-6295"},
{"_id":23,"productPrice":3596,"productName":"Widgetizer","status":"'delivered'","shippingInfo":"Suite 50","customers":"Nikolaus","number":"470-779-9170"},
{"_id":24,"productPrice":4507,"productName":"Gizmo B","status":"'processing'","shippingInfo":"7th Floor","customers":"Kaia","number":"861-972-2302"},
{"_id":25,"productPrice":8593,"productName":"Widgetizer","status":"'cancelled'","shippingInfo":"9th Floor","customers":"Bert","number":"905-753-5756"},
{"_id":26,"productPrice":2183,"productName":"Widgetizer","status":"'cancelled'","shippingInfo":"PO Box 32732","customers":"Vick","number":"926-750-1557"},
{"_id":27,"productPrice":2067,"productName":"Gizmo B","status":"'processing'","shippingInfo":"Suite 76","customers":"Edlin","number":"351-916-3251"},
{"_id":28,"productPrice":4830,"productName":"Gizmo Deluxe","status":"'pending'","shippingInfo":"Suite 5","customers":"Zonnya","number":"948-275-6737"},
{"_id":29,"productPrice":8487,"productName":"Doodad X","status":"'delivered'","shippingInfo":"PO Box 18520","customers":"Davie","number":"558-984-6501"},
{"_id":30,"productPrice":6229,"productName":"Doodad X","status":"'processing'","shippingInfo":"Apt 423","customers":"Stefanie","number":"414-925-0458"},
{"_id":31,"productPrice":8114,"productName":"Thingamajig","status":"'delivered'","shippingInfo":"Room 777","customers":"Joseito","number":"624-270-2356"},
{"_id":32,"productPrice":5013,"productName":"Doodad X","status":"'delivered'","shippingInfo":"Apt 747","customers":"Denys","number":"878-629-1457"},
{"_id":33,"productPrice":5515,"productName":"Widget A","status":"'delivered'","shippingInfo":"Room 276","customers":"Tori","number":"458-512-0782"},
{"_id":34,"productPrice":3083,"productName":"Whatchamacallit","status":"'pending'","shippingInfo":"Apt 1802","customers":"Lilly","number":"128-513-7101"},
{"_id":35,"productPrice":7180,"productName":"Thingamajig","status":"'cancelled'","shippingInfo":"Suite 3","customers":"Nicolis","number":"677-863-1177"},
{"_id":36,"productPrice":3497,"productName":"Contraption","status":"'processing'","shippingInfo":"Suite 100","customers":"Davida","number":"405-298-3988"},
{"_id":37,"productPrice":8405,"productName":"Doodad X","status":"'processing'","shippingInfo":"Apt 688","customers":"Winifield","number":"894-405-1084"},
{"_id":38,"productPrice":2296,"productName":"Doodad X","status":"'cancelled'","shippingInfo":"Suite 36","customers":"Emelyne","number":"998-648-9874"},
{"_id":39,"productPrice":6075,"productName":"Gizmo Deluxe","status":"'processing'","shippingInfo":"Room 1418","customers":"Bonita","number":"103-247-2819"},
{"_id":40,"productPrice":1141,"productName":"Gadget Z","status":"'shipped'","shippingInfo":"Room 3","customers":"Onfroi","number":"605-944-6850"},
{"_id":41,"productPrice":7879,"productName":"Contraption","status":"'cancelled'","shippingInfo":"8th Floor","customers":"Donn","number":"370-942-9082"},
{"_id":42,"productPrice":2003,"productName":"Gizmo B","status":"'processing'","shippingInfo":"Room 279","customers":"Alis","number":"962-426-4782"},
{"_id":43,"productPrice":6053,"productName":"Whatchamacallit","status":"'pending'","shippingInfo":"Room 1305","customers":"Perri","number":"280-208-0366"},
{"_id":44,"productPrice":5670,"productName":"Doohickey","status":"'delivered'","shippingInfo":"Suite 100","customers":"Jehanna","number":"154-532-3493"},
{"_id":45,"productPrice":5363,"productName":"Whatchamacallit","status":"'delivered'","shippingInfo":"8th Floor","customers":"Ferdinand","number":"114-205-9815"},
{"_id":46,"productPrice":1572,"productName":"Gizmo B","status":"'shipped'","shippingInfo":"Suite 52","customers":"Maisie","number":"860-315-8337"},
{"_id":47,"productPrice":7156,"productName":"Gadget Z","status":"'delivered'","shippingInfo":"10th Floor","customers":"Lulita","number":"272-452-0721"},
{"_id":48,"productPrice":9502,"productName":"Thingamajig","status":"'pending'","shippingInfo":"Apt 390","customers":"Robyn","number":"988-404-0446"},
{"_id":49,"productPrice":7989,"productName":"Gizmo B","status":"'delivered'","shippingInfo":"PO Box 2595","customers":"Rhona","number":"334-102-5243"},
{"_id":50,"productPrice":1239,"productName":"Widgetizer","status":"'cancelled'","shippingInfo":"PO Box 5618","customers":"Stacee","number":"139-923-0535"}];



const Orders = () => {
  const exortHead = [
    ["productName", "_id", "email", "productPrice", "shippingInfo", "status"],
    ...defaultData.map(({ productName,_id,email,productPrice,shippingInfo,status }) => [
        productName,
        _id,
        email,
        productPrice,
        shippingInfo,
        status,
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
