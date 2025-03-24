import React, { useState } from 'react';
import stockData from '../../data/Stock/stockData';
import HoldingsTableItem from './HoldingsTableItem';

const HoldingsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStocks = stockData.filter(stock =>
    stock.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='rounded-xl my-7 py-5 bg-white h-[100%]'>
      <div className="flex justify-between px-4">
        <h6 className='text-[#344767] font-bold '>Your Holdings</h6>
        <input
          className='px-4 py-2 border border-gray-300 rounded-lg text-sm'
          type="text"
          placeholder='Search stock'
          name="search"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='flex justify-between pt-2'>
        <div className='w-[100%]'>
          <div className='row px-4 flex py-4 space-x-2 text-[13px] font-bold'>
            <div className='text-xs w-[50%] md:w-[15%] text-[#A8B2C4] flex justify-start items-center'>SYMBOL</div>
            <div className='text-xs w-[25%] md:w-[15%] text-[#A8B2C4] flex justify-center'>EXCHANGE</div>
            <div className='text-xs w-[25%] md:w-[10%] text-[#A8B2C4] flex justify-center'>Quantity</div>
            <div className='text-xs w-[25%] md:w-[10%] text-[#A8B2C4] flex justify-center'>Invested</div>
            <div className='hidden text-xs w-[10%] text-[#A8B2C4] md:flex justify-center'>PRICE CHANGE</div>
            <div className='hidden text-xs w-[15%] text-[#A8B2C4] md:flex justify-center'>GROWTH</div>
            <div className='hidden text-xs w-[20%] text-[#A8B2C4] md:flex justify-center'>PRICE</div>
          </div>
          <div>
            {filteredStocks.map((stock, index) => (
              <HoldingsTableItem
                key={index}
                code={stock.code}
                companyName={stock.companyName}
                quantity = {stock.quantity}
                invested = {stock.invested}
                price={stock.price}
                min={stock.min}
                max={stock.max}
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
  );
};

export default HoldingsTable;
