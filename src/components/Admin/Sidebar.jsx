"use client"
import React from 'react';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux'
import {setActiveMenu} from "@/redux/action/themeSlice"
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import SubmitButton from '../Form/SubmitButton';
import { AiOutlineCalendar, AiOutlineShoppingCart, AiOutlineAreaChart, AiOutlineBarChart } from 'react-icons/ai';
import { FiShoppingBag, FiEdit, FiPieChart } from 'react-icons/fi';
import { BsKanban, BsBarChart } from 'react-icons/bs';
import { BiColorFill } from 'react-icons/bi';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine, RiStockLine } from 'react-icons/ri';
import { GiLouvrePyramid } from 'react-icons/gi';

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
          icon: <FiShoppingBag />,
        },
      ],
    },
  
    {
      title: 'Pages',
      links: [
        {
          name: 'orders',
          icon: <AiOutlineShoppingCart />,
        },
        {
          name: 'employees',
          icon: <IoMdContacts />,
        },
        {
          name: 'customers',
          icon: <RiContactsLine />,
        },
      ],
    },
    {
      title: 'Apps',
      links: [
        {
          name: 'calendar',
          icon: <AiOutlineCalendar />,
        },
        {
          name: 'kanban',
          icon: <BsKanban />,
        },
        {
          name: 'editor',
          icon: <FiEdit />,
        },
        {
          name: 'color-picker',
          icon: <BiColorFill />,
        },
      ],
    },
    {
      title: 'Charts',
      links: [
        {
          name: 'line',
          // icon: <AiOutlineStock />,
        },
        {
          name: 'area',
          icon: <AiOutlineAreaChart />,
        },
  
        {
          name: 'bar',
          icon: <AiOutlineBarChart />,
        },
        {
          name: 'pie',
          icon: <FiPieChart />,
        },
        {
          name: 'financial',
          icon: <RiStockLine />,
        },
        {
          name: 'color-mapping',
          icon: <BsBarChart />,
        },
        {
          name: 'pyramid',
          icon: <GiLouvrePyramid />,
        },
        {
          name: 'stacked',
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
                    href={`/adminstrative/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    className={`/adminstrative/${link.name}`=== pathname ? activeLink : normalLink}
                    style={{"backgroundColor":`${`/adminstrative/${link.name}`=== pathname ?  currentColor: ""}`}}
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
