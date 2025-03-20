import React from 'react'
import { FaRupeeSign } from "react-icons/fa";
import { HiMiniChartPie } from "react-icons/hi2";
import { BsArrowClockwise } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";




const FundsInvoice = ({amount}) => {
  return (
    <div className="flex justify-center">
        <div className='flex flex-col  items-center w-[600px]'>
            <div className="balance flex flex-col items-center p-5 rounded-2xl bg-white w-full">
                <p className='text-xs text-gray-500 mb-2'>Available margin (Cash)</p>
                <div className="amount flex space-x-1 text-4xl font-semibold mb-3 text-[#3A416F]"><span className='rupee-icon text-3xl pt-2'><FaRupeeSign /></span><span>{amount}</span></div>
                <div className=""><button className='text-xs flex space-x-1 '><span className='pt-0.5 text-[#3A416F]'><HiMiniChartPie /></span><span className='font-semibold text-[#17C1E8]'>View Statement</span></button></div>
            </div>
            <div className="action-buttons mt-5 mb-10 flex space-x-4 w-full">
                <button className='add-funds-button w-full flex justify-center text-white space-x-2 px-5 py-3 bg-[#62e667] rounded-lg font-semibold  text-sm'>
                    <div className="icon text-xl font-extrabold"><IoAdd /></div>
                    <div className="text">Add funds</div>
                </button>
                <button className='withdraw-funds-button w-full flex justify-center text-white space-x-2 px-5 py-3 bg-[#558be3] rounded-lg font-semibold  text-sm'>
                    <div className="icon pt-1 font-extrabold"><BsArrowClockwise /></div>
                    <div className="text">Withdraw</div>
                </button>
            </div>
        </div>
    </div>

  )
}

export default FundsInvoice