import React, { useState } from 'react';
import { CiBoxes } from "react-icons/ci";
import { MdOutlineAutoGraph } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import SidePanelItem from './SidePanelItem';
import sidePanelData from '../../data/SidePanel/SidePanel'
import accountPagesData from '../../data/SidePanel/AccountPages';
import { useLocation } from 'react-router-dom';


const SidePanel = () => {
  const [activeItemId, setActiveItemId] = useState(1); // Default to first item
  const [accountPagesActiveItemId, setAccountPagesActiveItemId] = useState(0);
  const navigate = useNavigate();

  const handleItemClick = (id, path) => {
    setActiveItemId(id);
    setAccountPagesActiveItemId(0);
    navigate(path);
  };

  const handleAccountPagesItemClick = (id, path) => {
    setActiveItemId(0);
    setAccountPagesActiveItemId(id);
    navigate(path);
  };


  const location = useLocation();

  const pathNameMap = {
    '/dashboard': 'Dashboard',
    '/billing': 'Billing',
    '/tables': 'Tables',
    '/virtual-reality': 'Virtual Reality',
    '/profile': 'Profile',
    '/signup': 'Sign Up',
    '/signin':'Sign In'
    // Add other routes as needed
  };

  const currentPathName = pathNameMap[location.pathname] ;


  return (
    <div className={` ${currentPathName==='Sign Up' || currentPathName=== 'Sign In' ? 'hidden' : 'hidden fixed top-0 left-0 w-[20%] 2xl:w-[18%] h-screen bg-[#F7F9FB] md:flex flex-col overflow-y-auto'}`}>
      <div className="flex flex-col justify-start pt-6 px-5 w-full">
        <div className="flex items-center pb-4 px-3 border-b">
          <div className="icon rotate-180 text-4xl text-[#353536] p-1 font-bold"><MdOutlineAutoGraph /></div>
          <div className="">
            <div className="title text-lg text-[#364969] px-1 font-semibold flex items-center">Growwdha</div>
            <div className="title text-xs text-[#364969] -mt-1.5 pl-1.5  flex items-center">No Brokerage</div>
          </div>
        </div>
        <div className="sidePanel-items flex flex-col pt-5 items-start">
          {sidePanelData.map(item => (
            <SidePanelItem
              key={item.id}
              icon={item.icon}
              optionName={item.optionName}
              isActive={item.id === activeItemId}
              onClick={() => handleItemClick(item.id, item.path)}
            />
          ))}
        </div>
        <div className="account-pages-heading text-[#828FA2] text-[0.75rem] px-4 mt-3 font-semibold">ADMIN PAGES</div>
        <div className="sidePanel-items flex flex-col pt-3 items-start">
          {accountPagesData.map(item => (
            <SidePanelItem
              key={item.id}
              icon={item.icon}
              optionName={item.optionName}
              isActive={item.id === accountPagesActiveItemId}
              onClick={() => handleAccountPagesItemClick(item.id, item.path)}
            />
          ))}
        </div>
        <div className="documentation-box mt-6 py-3 pl-3 pr-1">
          <div className="rounded-xl bg-gradient-to-r from-[#56C8EC] to-[#6389F9] flex flex-col p-4">
            <div className="icon mb-4 text-md drop-shadow-sm p-2 bg-white rounded-lg w-fit text-[#2196FE] ">
              <FaStar />
            </div>
            <div className="text flex flex-col mb-4 text-white">
              <h2 className="text-sm font-bold">Need Help?</h2>
              <p className="text-[12px] font-semibold">Please check our docs</p>
            </div>
            <div className="button">
              <button className='flex bg-white w-full justify-center drop-shadow-sm text-[#344767] px-3 py-2 rounded-lg text-[12px] font-semibold'>
                DOCUMENTATION
              </button>
            </div>
          </div>
        </div>
        <div className="py-3 pl-3 pr-1">
          <div className="button">
            <button className='flex justify-center w-full rounded-lg text-white py-3 text-[12px] font-bold bg-gradient-to-br from-[#21CDFD] to-[#1F61F1] '>UPGRADE TO PRO</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;