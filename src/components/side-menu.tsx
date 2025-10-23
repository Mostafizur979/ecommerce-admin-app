'use client';

import { JSX, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaAnglesLeft,
  FaChevronDown,
  FaChevronRight,
  FaSitemap,
  FaChartLine,
  FaCartPlus,
  FaUser,
} from 'react-icons/fa6';
import { MdDashboard, MdInventory, MdPointOfSale } from 'react-icons/md';
import { TbBox } from 'react-icons/tb';
import { BiCategory, BiReceipt } from 'react-icons/bi';
import { CiBarcode } from 'react-icons/ci';
import { imagePath } from '@/assets'; 


interface SubMenuItem {
  id: string;
  title: string;
  link: string;
  icon: React.ReactNode;
}

interface MenuItem {
  id: string;
  title: string;
  link?: string;
  icon: React.ReactNode;
  child?: SubMenuItem[];
}


const menu: MenuItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    link: '/',
    icon: <MdDashboard  size={24} />,
  },
  {
    id: 'inventory',
    title: 'Inventory',
    icon: <MdInventory size={20} />,
    child: [
      { id: 'products', title: 'Products', link: '/product/list', icon: <TbBox size={20} /> },
      {
        id: 'create-product',
        title: 'Create Product',
        link: '/product/new',
        icon: <TbBox size={20} />,
      },
      { id: 'categories', title: 'Categories', link: '/product/category', icon: <BiCategory size={20} /> },
      { id: 'sub-categories', title: 'Sub Categories', link: '/product/sub-category', icon: <FaSitemap size={20} /> },
      { id: 'label-print', title: 'Label Print', link: '/product/label-print', icon: <CiBarcode size={20} /> },
    ],
  },
  {
    id: 'sales',
    title: 'Sales',
    icon: <FaChartLine size={20} />,
    child: [
      { id: 'pos-sales', title: 'New POS Sales', link: '/sales/pos/new', icon: <MdPointOfSale size={20} /> },
      { id: 'create-order', title: 'Create Order', link: '/sales/new', icon: <FaCartPlus size={20} /> },
      { id: 'invoice-list', title: 'Invoice List', link: '/sales', icon: <BiReceipt size={20} /> },
    ],
  },
];

export default function SideBar(): JSX.Element {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [isChildHover, setIsChildHover] = useState("");
  const baseColor = '#134686';
  const baseFontColor = 'white';
  const childBaseColor = "#134678";

  // ✅ Toggle sidebar collapse
  const toggleCollapse = (): void => {
    setCollapsed((prev) => !prev);
  };

  // ✅ Toggle submenu open/close
  const toggleMenu = (id: string): void => {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // ✅ Adjust main container width dynamically
  useEffect(() => {
    const container = document.getElementById('main-container');
    if (container) {
      container.style.marginLeft = collapsed ? '60px' : '252px';
      container.style.transition = 'margin-left 0.3s ease-in-out';
    }
  }, [collapsed]);

  return (
    <div
      className={`fixed left-0 top-0 h-screen border-r border-gray-300 transition-all duration-300 ease-in-out z-50 
        ${collapsed ? 'w-[60px]' : 'w-[252px]'}`}
      style={{ backgroundColor: baseColor }}
    >
      {/* ✅ Logo */}
      <div className="py-4 flex justify-center mt-12">
        {collapsed ? (
          <Image src={imagePath.smallLogo} alt="logo" width={25} height={25} />
        ) : (
          <Image src={imagePath.logo} alt="logo" width={200} height={48} />
        )}
      </div>

      {/* ✅ Collapse Button */}
      <FaAnglesLeft
        className={`${collapsed ? 'left-[45px] rotate-180' : 'left-[235px] rotate-0'} 
          text-[20px] text-white p-[5px] bg-[#FE9F43] rounded-[10px] absolute top-[22px]
          duration-300 ease-in-out cursor-pointer z-50`}
        onClick={toggleCollapse}
      />

      {/* ✅ User Info */}
      {!collapsed && (
        <div className="flex gap-[5px] p-4  items-center"  style={{ color: baseFontColor }}>
          <FaUser size={24} className="rounded-full" />
          <div className="text-[14px]">
            <p>Mostafizur Rahman</p>
            <p>Super Admin</p>
          </div>
        </div>
      )}

      {/* ✅ Menu Items */}
      <div style={{ color: baseFontColor }}>
        {menu.map((item) => (
          <div key={item.id} className="">
            {/* Parent Menu Item */}
            <div
              onClick={() => (item.child ? toggleMenu(item.id) : undefined)}
              className="grid grid-cols-2 items-center cursor-pointer"
            >
              <div
                className={`${collapsed ? 'col-span-2' : 'col-span-1'} 
                flex gap-[5px] px-4 py-2 items-center text-[16px]`}
              >
                {item.icon}
                {!collapsed && item.title}
              </div>
              {!collapsed && item.child && (
                <div className="flex justify-end pr-[10px]">
                  {openMenus[item.id] ? <FaChevronDown size={14} /> : <FaChevronRight size={14} />}
                </div>
              )}
            </div>

            {/* Child (Submenu) */}
            {item.child && (
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out 
                  ${openMenus[item.id] ? 'max-h-[500px]' : 'max-h-0'}`}
                  style={{backgroundColor: childBaseColor}}
              >
                {item.child.map((sub) => (
                  <Link
                    key={sub.id}
                    href={sub.link}
                    className="mx-2 px-2 py-2 text-[16px] flex gap-[5px] items-center rounded-[5px] hover:bg-gray-200 hover:text-black"
                    onMouseEnter={()=>setIsChildHover(sub.id)}
                    onMouseLeave={()=>{setIsChildHover("")}}
                    style={{
                        backgroundColor: isChildHover == sub.id ? 'white' : childBaseColor,
                        color: isChildHover == sub.id ? childBaseColor : baseFontColor
                    }}
                  >
                    {sub.icon}
                    {!collapsed && sub.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
