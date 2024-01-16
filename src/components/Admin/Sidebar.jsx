"use client"
import React from 'react';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux'
import {setActiveMenu} from "@/redux/action/themeSlice"
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import SubmitButton from '../Form/SubmitButton';
import { AiOutlineCalendar, AiOutlineShoppingCart, AiOutlineAreaChart,AiOutlineStock, AiOutlineBarChart } from 'react-icons/ai';
import { FiShoppingBag, FiPieChart } from 'react-icons/fi';
import { BsKanban } from 'react-icons/bs';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine } from 'react-icons/ri';
import { PiChartPolarThin } from "react-icons/pi";

const Sidebar = () => {
  const { currentColor, activeMenu, screenSize } = useSelector((state) => state.theme);
  const dispatch = useDispatch()
  const pathname = usePathname()
  const links = [
    {
      title: 'Dashboard',
      links: [
        {
          name: 'dashboard',
          link: 'dashboard',
          icon: <FiShoppingBag />,
        },
      ],
    },
  
    {
      title: 'Pages',
      links: [
        {
          name: 'orders',
          link: 'orders',
          icon: <AiOutlineShoppingCart />,
        },
        {
          name: 'employees',
          link: 'employees',
          icon: <IoMdContacts />,
        },
        {
          name: 'customers',
          link: 'dashboard/customers',
          icon: <RiContactsLine />,
        },
      ],
    },
    {
      title: 'Apps',
      links: [
        {
          name: 'calendar',
          link: 'dashboard/calendar',
          icon: <AiOutlineCalendar />,
        },
        {
          name: 'kanban',
          link: 'dashboard/kanban',
          icon: <BsKanban />,
        }
      ],
    },
    {
      title: 'Charts',
      links: [
        {
          name: 'line',
          link: 'dashboard/line',
          icon: <AiOutlineStock />,
        },
        {
          name: 'area',
          link: 'dashboard/area',
          icon: <AiOutlineAreaChart />,
        },
  
        {
          name: 'bar',
          link: 'dashboard/bar',
          icon: <AiOutlineBarChart />,
        },
        {
          name: 'pie',
          link: 'dashboard/pie',
          icon: <FiPieChart />,
        },
        {
          name: 'polar Area',
          link: 'dashboard/polar',
          icon: <PiChartPolarThin />,
        },
        {
          name: 'stacked',
          link: 'dashboard/stacked',
          icon: <AiOutlineBarChart />,
        },
      ],
    },
  ];
  console.log(pathname)
  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      dispatch(setActiveMenu(false));
    }
  };

  const activeLink = `flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2  `;
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 ">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link href="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
              <SiShopware /> <span>Beyond Bazar</span>
            </Link>
            <div content="Menu" position="BottomCenter">
              <SubmitButton
                onClick={() =>{ 
                  console.log(activeMenu)
                  dispatch(setActiveMenu(!activeMenu))}}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </SubmitButton>
            </div>
          </div>
          <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <Link
                    href={`/adminstrative/${link.link}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    className={`/adminstrative/${link.link}`=== pathname ? activeLink : normalLink}
                    style={{"backgroundColor":`${`/adminstrative/${link.link}`=== pathname ?  currentColor: ""}`}}
                  >
                    {link?.icon}
                    <span className="capitalize ">{link.name}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
