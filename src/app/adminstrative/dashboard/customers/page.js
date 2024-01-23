"use client"
import React, { useEffect } from 'react';
import { Header } from '@/components/Admin';
import Table from '@/components/Admin/table/Table';
import { createColumnHelper, } from "@tanstack/react-table";
import Image from 'next/image';
import Actions from '@/components/Admin/Action';
import { useGetDataProtected } from '@/redux/api/useGetData';
import { NextResponse } from 'next/server';



const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor((row) => row._id, {
    id: "_id",
    Aggregated: ({ value }) => `${value} Names`,
    cell: (info) => <i>{info.getValue()} </i>,
    header: () => <span>id</span>,
  }),
  columnHelper.accessor((row) => row.name, {
    accessorKey: "name",
    cell: (info) => <div style={{gridTemplateColumns:"3rem 1fr"}} className='grid  grid-rows-2 gap-x-1 text-start'>
      <Image className='row-start-1 row-end-3 w-12 h-12 bg-black rounded-full object-fill' src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
    cell: (info) => info.getValue(),
    header: () => <span>address</span>,
  }),
  columnHelper.accessor("actions", {
    accessorKey: "actions",
    cell: (info) => <Actions></Actions>,
    header: () => <span>actions</span>,
  }),

];
const defaultData = [{"_id":1,"name":"Deane","email":"dsmeed0@tamu.edu","phoneNo":"2717479915","address":"15th Floor","role":"Construction Manager"},
{"_id":2,"name":"Raimondo","email":"rschankelborg1@devhub.com","phoneNo":"1126939048","address":"Apt 1775","role":"Construction Manager"},
{"_id":3,"name":"Tove","email":"thunnisett2@engadget.com","phoneNo":"6096239323","address":"Apt 1081","role":"Electrician"},
{"_id":4,"name":"Perri","email":"pgrimolbie3@pen.io","phoneNo":"3363875157","address":"Apt 1497","role":"Construction Manager"},
{"_id":5,"name":"Andria","email":"ajanos4@netlog.com","phoneNo":"5395452977","address":"Suite 26","role":"Subcontractor"},
{"_id":6,"name":"Patrica","email":"panfosso5@newsvine.com","phoneNo":"4375019676","address":"Suite 61","role":"Electrician"},
{"_id":7,"name":"Jarib","email":"jhellikes6@slashdot.org","phoneNo":"2834904258","address":"Suite 34","role":"Surveyor"},
{"_id":8,"name":"Roland","email":"rokell7@mac.com","phoneNo":"8616937988","address":"Room 1984","role":"Engineer"},
{"_id":9,"name":"Minne","email":"mganny8@ebay.co.uk","phoneNo":"8477134232","address":"Suite 15","role":"Project Manager"},
{"_id":10,"name":"Teodoor","email":"ttooley9@drupal.org","phoneNo":"4945590499","address":"PO Box 79075","role":"Architect"},
{"_id":11,"name":"Diannne","email":"dlongfellowa@netlog.com","phoneNo":"7064066889","address":"Suite 68","role":"Architect"},
{"_id":12,"name":"Jarrid","email":"jfumagallib@goo.gl","phoneNo":"5748356614","address":"Apt 1602","role":"Construction Worker"},
{"_id":13,"name":"Rafa","email":"rumfreyc@oracle.com","phoneNo":"3657904008","address":"Apt 1360","role":"Estimator"},
{"_id":14,"name":"Gilligan","email":"ghemberd@un.org","phoneNo":"2884830466","address":"10th Floor","role":"Architect"},
{"_id":15,"name":"Garrik","email":"ganguse@bbb.org","phoneNo":"1948717072","address":"17th Floor","role":"Electrician"},
{"_id":16,"name":"Goober","email":"ggwatkinsf@pinterest.com","phoneNo":"8654629874","address":"Room 520","role":"Construction Foreman"},
{"_id":17,"name":"Cornall","email":"cbathowg@ow.ly","phoneNo":"3237597984","address":"Apt 1884","role":"Surveyor"},
{"_id":18,"name":"Maurita","email":"mpalfreyh@economist.com","phoneNo":"2823331992","address":"Apt 1833","role":"Engineer"},
{"_id":19,"name":"Ferguson","email":"fcourtmani@mail.ru","phoneNo":"6877256085","address":"7th Floor","role":"Subcontractor"},
{"_id":20,"name":"Zane","email":"zchristoforouj@gnu.org","phoneNo":"7046786319","address":"Apt 900","role":"Architect"},
{"_id":21,"name":"Augustine","email":"ahachardk@google.com","phoneNo":"8676385333","address":"Apt 457","role":"Construction Expeditor"},
{"_id":22,"name":"Augustin","email":"acronl@plala.or.jp","phoneNo":"3933551088","address":"Apt 1719","role":"Estimator"},
{"_id":23,"name":"Karney","email":"kcorlettm@huffingtonpost.com","phoneNo":"5816145763","address":"PO Box 26390","role":"Electrician"},
{"_id":24,"name":"Saundra","email":"sprendergrastn@plala.or.jp","phoneNo":"6969017488","address":"Room 599","role":"Construction Expeditor"},
{"_id":25,"name":"Tarra","email":"tpursehouseo@sfgate.com","phoneNo":"6511882482","address":"16th Floor","role":"Estimator"},
{"_id":26,"name":"Avivah","email":"alefeverp@free.fr","phoneNo":"3946422131","address":"Apt 1953","role":"Surveyor"},
{"_id":27,"name":"Fredrika","email":"fmatashkinq@si.edu","phoneNo":"1897616184","address":"PO Box 20905","role":"Estimator"},
{"_id":28,"name":"Hendrika","email":"hkaasr@usda.gov","phoneNo":"5725542043","address":"7th Floor","role":"Architect"},
{"_id":29,"name":"Enrichetta","email":"eproffers@marketwatch.com","phoneNo":"1651290290","address":"Room 352","role":"Project Manager"},
{"_id":30,"name":"Leupold","email":"lgrewcockt@theglobeandmail.com","phoneNo":"4407530998","address":"PO Box 11519","role":"Electrician"},
{"_id":31,"name":"Lucienne","email":"lthurlbecku@tinyurl.com","phoneNo":"9719338394","address":"Apt 1310","role":"Construction Expeditor"},
{"_id":32,"name":"Dari","email":"dscrinev@typepad.com","phoneNo":"8979275489","address":"Suite 33","role":"Surveyor"},
{"_id":33,"name":"Itch","email":"idalgarnow@squidoo.com","phoneNo":"1281282902","address":"Apt 1625","role":"Engineer"},
{"_id":34,"name":"Ellerey","email":"eocurneenx@naver.com","phoneNo":"2652458198","address":"5th Floor","role":"Construction Manager"},
{"_id":35,"name":"Kellia","email":"klewsamy@technorati.com","phoneNo":"5149181240","address":"2nd Floor","role":"Architect"},
{"_id":36,"name":"Sissy","email":"scorpz@drupal.org","phoneNo":"1963444372","address":"PO Box 56440","role":"Construction Expeditor"},
{"_id":37,"name":"Carmelita","email":"cemmott10@sciencedaily.com","phoneNo":"3037601274","address":"PO Box 998","role":"Construction Foreman"},
{"_id":38,"name":"Jessy","email":"jdriscoll11@digg.com","phoneNo":"9448552602","address":"Suite 72","role":"Construction Manager"},
{"_id":39,"name":"Doy","email":"dmclucky12@salon.com","phoneNo":"4742135787","address":"PO Box 17925","role":"Electrician"},
{"_id":40,"name":"Marice","email":"mmathieu13@wufoo.com","phoneNo":"2628687577","address":"Room 1915","role":"Surveyor"},
{"_id":41,"name":"Odille","email":"ohercock14@buzzfeed.com","phoneNo":"7486814268","address":"5th Floor","role":"Construction Expeditor"},
{"_id":42,"name":"Nedda","email":"nemblow15@admin.ch","phoneNo":"7477551285","address":"PO Box 21834","role":"Electrician"},
{"_id":43,"name":"Kurt","email":"knunson16@zdnet.com","phoneNo":"5357236287","address":"PO Box 5916","role":"Subcontractor"},
{"_id":44,"name":"Shaughn","email":"sbridal17@chronoengine.com","phoneNo":"8248884667","address":"Suite 46","role":"Supervisor"},
{"_id":45,"name":"Albertine","email":"agiovanitti18@redcross.org","phoneNo":"5511695213","address":"Apt 1027","role":"Engineer"},
{"_id":46,"name":"Lorrie","email":"lcromly19@theatlantic.com","phoneNo":"7747119014","address":"Room 328","role":"Construction Foreman"},
{"_id":47,"name":"Friedrich","email":"fphebee1a@mysql.com","phoneNo":"1265928089","address":"Room 764","role":"Supervisor"},
{"_id":48,"name":"Vinny","email":"vpuckinghorne1b@loc.gov","phoneNo":"1273672186","address":"Suite 87","role":"Construction Worker"},
{"_id":49,"name":"Ruby","email":"rcorey1c@i2i.jp","phoneNo":"5974693806","address":"PO Box 42227","role":"Project Manager"},
{"_id":50,"name":"Gery","email":"gneely1d@squarespace.com","phoneNo":"8207105021","address":"Room 769","role":"Surveyor"}];




const Customers = () => {
  const getData = async() => {  
    try {
      const data = await useGetDataProtected("/api/admin/user/all-user");
       console.log(data);
      
    } catch (error) {
      // return NextResponse.redirect("/admin/login");
    }

  }
  useEffect(() => {
   getData();

  }, []);
  const exortHead = [
    ["name", "_id", "email", "phoneNo", "address", "role"],
    ...defaultData.map(({ name,_id,email,phoneNo,address,role }) => [
        name,
        _id,
        email,
        phoneNo,
        address,
        role,
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
      <Header category="Page" title="Customers" />
      <Table search={true} label={columns} tableData={defaultData} exportData={csvData}></Table>
    </div>
  );
};

export default Customers;
