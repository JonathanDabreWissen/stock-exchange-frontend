import React, { useContext, useEffect, useState } from 'react';
import HoldingsTableItem from './HoldingsTableItem';
import useGetData from '../../hooks/useGetData';
import { AuthContext } from '../../context/AuthContext';

const HoldingsTable = () => {

  const { user } = useContext(AuthContext);
  const userId = String(user.id);

  const [searchTerm, setSearchTerm] = useState('');
  const [sharesData, setSharesData] = useState([]);
  const [heldSharesData, setHeldSharesData] = useState([]);

  const { data: holdingsData } = useGetData(`/holdings/${userId}`);
  const { data: allSharesData } = useGetData(`/shares/view`);
  
  useEffect(() => {
    console.log(holdingsData)
    setHeldSharesData(holdingsData)
  }, [holdingsData])

  useEffect(() => {
    console.log(allSharesData)
    setSharesData(allSharesData)
  }, [allSharesData])
  
  const stocksToDisplay = (sharesData ?? [])
  .filter(stock =>
    (heldSharesData ?? []).some(heldSharesListItem => heldSharesListItem.shareId === stock.code)
  )
  .map(stock => {
    const heldShare = (heldSharesData ?? []).find(held => held.shareId === stock.code);

    return {
      ...stock,  // Keep all properties from sharesData
      price: heldShare?.price ?? 0,  // Add price from heldSharesData
      quantity: heldShare?.quantity ?? 0,  // Add quantity from heldSharesData
    };
  });

  const filteredStocks = stocksToDisplay.filter(stock =>
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
            <div className='text-xs w-[25%] md:w-[7.5%] text-[#A8B2C4] flex justify-center'>EXCHANGE</div>
            <div className='text-xs w-[25%] md:w-[7.5%] text-[#A8B2C4] flex justify-center'>QTY.</div>
            <div className='text-xs w-[25%] md:w-[10%] text-[#A8B2C4] flex justify-center'>INVESTED</div>
            <div className='hidden text-xs w-[15%] text-[#A8B2C4] md:flex justify-center'>AVG.</div>
            <div className='hidden text-xs w-[10%] text-[#A8B2C4] md:flex justify-center'>VALUE</div>
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
                invested = {stock.price}
                min={stock.minPrice}
                max={stock.maxPrice}
                stockExchange={stock.stockExchange || "BSE"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoldingsTable;
