
import React from 'react'
import stockData from '../data/Stock/stockData'
import TableItem from './AdminTableItem';
import StockTableItem from './StockTableItem';



const StockTable = () => {
  return (
    <div className='rounded-xl my-7 py-5 bg-white h-[100%]'>
        <h6 className='text-[#344767] px-6 font-bold '>Stocks table</h6> 
        <div className='flex justify-between pt-2'>
            <div className='w-[100%]'>
                <div className='row px-4 flex  py-4 space-x-2 text-[13px] font-bold'>
                    <div className='text-xs w-[50%] md:w-[15%] text-[#A8B2C4] flex justify-start  items-center'>SYMBOL</div>
                    <div className='text-xs w-[25%] md:w-[20%] text-[#A8B2C4] flex justify-start'>NAME</div>
                    <div className='text-xs w-[25%] md:w-[15%] text-[#A8B2C4] flex justify-center'>EXCHANGE</div>
                    <div className='hidden text-xs w-[10%] text-[#A8B2C4] md:flex justify-center'>PRICE CHANGE</div>
                    <div className='hidden text-xs w-[15%] text-[#A8B2C4] md:flex justify-center'>GROWTH</div>
                    <div className='hidden text-xs w-[20%] text-[#A8B2C4] md:flex justify-center'>PRICE</div>
                </div>
                <div>
                        {stockData.map((stock, index) => (
                            <StockTableItem
                                key={index}
                                code={stock.code}
                                companyName={stock.companyName}
                                price={stock.price}
                                min = {stock.min}
                                max = {stock.max}
                                growth={stock.growth}
                                priceChange={stock.priceChange}
                                precentageChange={stock.percentageChange}
                                stockExchange={stock.stockExchange}             
                            />
                        ))}
                </div>
            </div>
        </div>      
    </div>
      
  )
}

export default StockTable;