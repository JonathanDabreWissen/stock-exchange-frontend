import React, { useEffect, useState } from 'react';
import stockData from '../data/Stock/stockData';
import WatchListTableItem from './Watchlist/WatchListTableItem';
import api from '../api';

const AllStocksTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sharesData, setSharesData] = useState([]);

  const filteredStocks = stockData.filter(stock =>
    stock.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await api.get('/shares/view', {
          headers: {
            "ngrok-skip-browser-warning": "true", // Ngrok header to bypass warning
          },
        });
        console.log("Fetched Stock Data:", response.data); // Console log response
        setSharesData(response.data); // Set state with API response
        console.log(sharesData)
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };

    fetchStocks();
  }, []);

  return (
    <div className='rounded-xl my-7 py-5 bg-white h-[100%]'>
      <div className="flex justify-between px-4">
        <h6 className='text-[#344767] font-bold '>All Stocks</h6>
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
            <div className='text-xs w-[25%] md:w-[20%] text-[#A8B2C4] flex justify-start'>NAME</div>
            <div className='text-xs w-[25%] md:w-[15%] text-[#A8B2C4] flex justify-center'>EXCHANGE</div>
            <div className='hidden text-xs w-[10%] text-[#A8B2C4] md:flex justify-center'>PRICE CHANGE</div>
            <div className='hidden text-xs w-[15%] text-[#A8B2C4] md:flex justify-center'>GROWTH</div>
            <div className='hidden text-xs w-[20%] text-[#A8B2C4] md:flex justify-center'>PRICE</div>
          </div>
          <div>
            {filteredStocks.map((stock, index) => (
              <WatchListTableItem
                key={index}
                code={stock.code}
                companyName={stock.companyName}
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

export default AllStocksTable;
