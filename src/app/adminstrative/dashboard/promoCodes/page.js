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
const defaultData = [{"_id":1,"promocode":"DEAL50","discountType":"Percentage","discountValue":701,"limit":51,"active":"false","endDate":"2024-08-18 17:39:35"},
{"_id":2,"promocode":"SPECIAL90","discountType":"Fixed","discountValue":591,"limit":78,"active":"true","endDate":"2024-09-08 02:31:05"},
{"_id":3,"promocode":"OFF60","discountType":"Percentage","discountValue":732,"limit":98,"active":"false","endDate":"2024-06-03 13:30:51"},
{"_id":4,"promocode":"CODE80","discountType":"Percentage","discountValue":323,"limit":66,"active":"true","endDate":"2024-09-18 03:42:39"},
{"_id":5,"promocode":"DISCOUNT20","discountType":"Fixed","discountValue":996,"limit":44,"active":"true","endDate":"2024-03-31 12:51:01"},
{"_id":6,"promocode":"PROMO10","discountType":"Fixed","discountValue":84,"limit":75,"active":"true","endDate":"2024-08-05 06:10:30"},
{"_id":7,"promocode":"BONUS70","discountType":"Fixed","discountValue":927,"limit":77,"active":"true","endDate":"2024-07-10 18:59:23"},
{"_id":8,"promocode":"SAVE40","discountType":"Fixed","discountValue":509,"limit":32,"active":"true","endDate":"2024-06-04 12:07:30"},
{"_id":9,"promocode":"CODE80","discountType":"FreeShipping","discountValue":80,"limit":74,"active":"true","endDate":"2024-09-29 14:29:37"},
{"_id":10,"promocode":"PROMO10","discountType":"Percentage","discountValue":446,"limit":14,"active":"true","endDate":"2024-07-30 08:18:26"},
{"_id":11,"promocode":"EXTRA100","discountType":"Percentage","discountValue":204,"limit":65,"active":"true","endDate":"2024-04-25 22:04:52"},
{"_id":12,"promocode":"SAVE40","discountType":"Percentage","discountValue":520,"limit":26,"active":"true","endDate":"2024-05-04 11:13:06"},
{"_id":13,"promocode":"EXTRA100","discountType":"Percentage","discountValue":292,"limit":11,"active":"true","endDate":"2024-05-20 11:11:06"},
{"_id":14,"promocode":"PROMO10","discountType":"FreeShipping","discountValue":105,"limit":57,"active":"false","endDate":"2024-08-04 22:41:30"},
{"_id":15,"promocode":"SAVE40","discountType":"Percentage","discountValue":931,"limit":70,"active":"false","endDate":"2024-06-20 13:27:21"},
{"_id":16,"promocode":"BONUS70","discountType":"Percentage","discountValue":522,"limit":47,"active":"false","endDate":"2024-08-17 07:55:37"},
{"_id":17,"promocode":"PROMO10","discountType":"Percentage","discountValue":762,"limit":93,"active":"false","endDate":"2024-04-08 04:22:45"},
{"_id":18,"promocode":"DISCOUNT20","discountType":"Percentage","discountValue":546,"limit":19,"active":"true","endDate":"2024-05-29 03:06:58"},
{"_id":19,"promocode":"SAVE40","discountType":"Percentage","discountValue":698,"limit":52,"active":"true","endDate":"2024-04-28 01:42:48"},
{"_id":20,"promocode":"SPECIAL90","discountType":"Percentage","discountValue":272,"limit":74,"active":"false","endDate":"2024-05-18 20:02:33"},
{"_id":21,"promocode":"EXTRA100","discountType":"FreeShipping","discountValue":639,"limit":79,"active":"false","endDate":"2024-08-24 06:59:06"},
{"_id":22,"promocode":"EXTRA100","discountType":"Fixed","discountValue":306,"limit":4,"active":"true","endDate":"2024-05-05 13:05:27"},
{"_id":23,"promocode":"OFF60","discountType":"Fixed","discountValue":422,"limit":57,"active":"false","endDate":"2024-08-27 14:11:45"},
{"_id":24,"promocode":"SPECIAL90","discountType":"Fixed","discountValue":131,"limit":49,"active":"false","endDate":"2024-09-16 02:00:04"},
{"_id":25,"promocode":"SPECIAL90","discountType":"Percentage","discountValue":843,"limit":1,"active":"false","endDate":"2024-06-10 04:50:42"},
{"_id":26,"promocode":"OFF60","discountType":"FreeShipping","discountValue":527,"limit":20,"active":"true","endDate":"2024-08-18 02:36:04"},
{"_id":27,"promocode":"OFF60","discountType":"Percentage","discountValue":197,"limit":84,"active":"false","endDate":"2024-07-02 15:33:45"},
{"_id":28,"promocode":"DISCOUNT20","discountType":"Fixed","discountValue":533,"limit":22,"active":"true","endDate":"2024-05-23 06:28:38"},
{"_id":29,"promocode":"BONUS70","discountType":"Fixed","discountValue":333,"limit":95,"active":"true","endDate":"2024-05-16 11:41:19"},
{"_id":30,"promocode":"PROMO10","discountType":"Percentage","discountValue":927,"limit":79,"active":"false","endDate":"2024-06-14 22:30:26"},
{"_id":31,"promocode":"PROMO10","discountType":"Fixed","discountValue":506,"limit":35,"active":"true","endDate":"2024-07-04 01:23:12"},
{"_id":32,"promocode":"DEAL50","discountType":"FreeShipping","discountValue":171,"limit":86,"active":"false","endDate":"2024-04-24 22:11:16"},
{"_id":33,"promocode":"CODE80","discountType":"Percentage","discountValue":784,"limit":69,"active":"true","endDate":"2024-05-01 11:55:50"},
{"_id":34,"promocode":"PROMO10","discountType":"Percentage","discountValue":907,"limit":85,"active":"true","endDate":"2024-05-27 13:53:35"},
{"_id":35,"promocode":"SPECIAL90","discountType":"FreeShipping","discountValue":270,"limit":99,"active":"false","endDate":"2024-07-01 21:57:17"},
{"_id":36,"promocode":"SPECIAL90","discountType":"Fixed","discountValue":892,"limit":1,"active":"false","endDate":"2024-05-19 11:32:53"},
{"_id":37,"promocode":"OFF60","discountType":"Percentage","discountValue":175,"limit":14,"active":"true","endDate":"2024-09-25 06:03:54"},
{"_id":38,"promocode":"DEAL50","discountType":"Fixed","discountValue":537,"limit":39,"active":"false","endDate":"2024-06-12 01:24:16"},
{"_id":39,"promocode":"BONUS70","discountType":"FreeShipping","discountValue":219,"limit":84,"active":"false","endDate":"2024-09-04 17:36:20"},
{"_id":40,"promocode":"SAVE40","discountType":"Percentage","discountValue":702,"limit":37,"active":"false","endDate":"2024-09-14 05:57:05"},
{"_id":41,"promocode":"EXTRA100","discountType":"FreeShipping","discountValue":644,"limit":3,"active":"false","endDate":"2024-07-08 14:21:34"},
{"_id":42,"promocode":"OFF60","discountType":"FreeShipping","discountValue":922,"limit":15,"active":"true","endDate":"2024-09-28 07:33:10"},
{"_id":43,"promocode":"BONUS70","discountType":"FreeShipping","discountValue":668,"limit":95,"active":"true","endDate":"2024-04-01 02:31:44"},
{"_id":44,"promocode":"BONUS70","discountType":"Percentage","discountValue":468,"limit":93,"active":"false","endDate":"2024-06-28 12:42:34"},
{"_id":45,"promocode":"PROMO10","discountType":"FreeShipping","discountValue":449,"limit":77,"active":"true","endDate":"2024-09-23 13:22:52"},
{"_id":46,"promocode":"BONUS70","discountType":"Percentage","discountValue":550,"limit":54,"active":"false","endDate":"2024-08-31 20:06:25"},
{"_id":47,"promocode":"DEAL50","discountType":"Fixed","discountValue":374,"limit":19,"active":"false","endDate":"2024-05-21 23:04:46"},
{"_id":48,"promocode":"BONUS70","discountType":"Fixed","discountValue":24,"limit":87,"active":"false","endDate":"2024-06-11 00:55:15"},
{"_id":49,"promocode":"BONUS70","discountType":"FreeShipping","discountValue":233,"limit":96,"active":"false","endDate":"2024-09-16 23:59:34"},
{"_id":50,"promocode":"DISCOUNT20","discountType":"FreeShipping","discountValue":15,"limit":30,"active":"false","endDate":"2024-05-19 12:20:23"}];



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
