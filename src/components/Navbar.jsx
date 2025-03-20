import React from 'react';
import { IoMdHome } from "react-icons/io";
import { FaUserCircle } from 'react-icons/fa';
import { FaSearch } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";


export const Navbar = ({ toggleSidebar }) => {
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

  const currentPathName = pathNameMap[location.pathname] || 'Dashboard';

  const textColorClass = currentPathName === 'Profile' ? 'text-white cursor-pointer ' : 'text-[#344767] cursor-pointer';

  return (
    <>
      <div className='pt-3 sticky px-2 md:px-4'>
        <div className={`py-4 ${currentPathName==='Sign Up' || currentPathName=== 'Sign In'? 'hidden' : 'flex flex-col space-y-3 md:space-y-0 md:flex-row md:justify-between'} `}>
      
          <div>
            <div className='flex space-x-2 pt-[2px]'>
              <IoMdHome className={`mt-1 ${textColorClass}`} />
              <h3 className={textColorClass}>/</h3>
              <h3 className={`font-normal ${textColorClass}`}>{currentPathName}</h3>
            </div>
            <h3 className={`pt-[2px] font-bold ${textColorClass} text-md`}>{currentPathName}</h3>
          </div>
          <div className='flex space-x-3 justify-between md:justify-center items-center'>
            <div className='flex bg-white rounded-lg border border-gray-300  w-[160px] md:w-[220px]'>
              <div className='p-3'>
                <FaSearch />
              </div>
              <div className='pt-[8px] pb-[8px] rounded-lg rounded-l-none'>
                <input type="text" className='w-[100%] pr-3 focus:outline-none text-sm' placeholder='Type here...' />
              </div>
            </div>
            <div className='flex space-x-3 md:space-x-4'>
              <div className='flex items-center text-xl md:text-lg space-x-1 cursor-pointer'>
                <FaUserCircle className={textColorClass} />
                <span className={` hidden md:flex text-[14px] font-semibold ${textColorClass}`}>Sign in</span>
              </div>
              <div className={`toggleSidebar-button ${textColorClass} text-2xl md:text-lg flex items-center md:hidden`} onClick={toggleSidebar}>
                <TbLayoutSidebarLeftExpandFilled />
              </div>
              <div className='flex space-x-3 text-2xl md:text-lg md:space-x-4 items-center'>
                <IoIosSettings className={textColorClass} />
                <FaBell className={` text-lg md:text-sm ${textColorClass}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}