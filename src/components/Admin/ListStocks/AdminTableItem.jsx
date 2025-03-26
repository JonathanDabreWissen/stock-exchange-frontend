import React, { useState, useEffect } from "react";

const AdminTableItem = ({ code, companyName, min, max, stockExchange, quantity, soldShares }) => {
  
  const [stockPrice, setStockPrice] = useState(parseFloat((Math.random() * (max - min) + min).toFixed(2)));
  // eslint-disable-next-line no-unused-vars
  const [previousPrice, setPreviousPrice] = useState(stockPrice);
  const [stockPriceChange, setStockPriceChange] = useState(0);
  const [percentageStockPriceChange, setPercentageStockPriceChange] = useState(0);
  const [growthPositive, setGrowthPositive] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      let newPrice;
      let priceDiff;
      let percentageChange;

      do {
        newPrice = parseFloat((Math.random() * (max - min) + min).toFixed(2));
        priceDiff = newPrice - stockPrice;
        percentageChange = ((priceDiff / stockPrice) * 100);
      } while (Math.abs(percentageChange) > 1); // Restrict to ±10%

      setPreviousPrice(stockPrice);
      setStockPrice(newPrice);

      setStockPriceChange(priceDiff.toFixed(2));
      setPercentageStockPriceChange(percentageChange.toFixed(2));

      setGrowthPositive(priceDiff > 0);
    }, 5000); // Runs every 5 seconds

    return () => clearInterval(interval);
  }, [stockPrice, min, max]);

  return (
    <div className="row px-4 flex space-x-2 border-t">
        <div className="col-1 w-[50%] md:w-[15%] flex space-x-4 items-center justify-start">
            <div className="flex flex-col">
                <p className="text-sm font-semibold text-[#344767]">{code}</p>
                <p className="text-[12px] font-semibold text-[#8E9CB3]">{companyName}</p>
            </div>
        </div>

        <div className="col-2 w-[25%] md:w-[10%] flex justify-center  py-4">
            <div className="flex flex-col items-center text-[12px]">
                <div className="flex justify-center font-semibold text-[#707C95]">{min}</div>
            </div>
        </div>
        <div className="col-2 w-[25%] md:w-[10%] flex justify-center py-4">
            <div className="flex flex-col items-center text-[12px]">
                <div className="flex justify-center font-semibold text-[#707C95]">{max}</div>
            </div>
        </div>

        <div className="col-3 w-[10%] md:w-[10%] flex justify-center py-4 text-[13px] font-semibold text-[#68758F]">
            <div className="flex items-center">            
                <div className="role font-semibold text-[#707C95]">{stockExchange}</div>
            </div>
        </div>
        <div className="col-3 w-[10%] md:w-[10%] flex justify-center py-4 text-[13px] font-semibold text-[#68758F]">
            <div className="flex items-center">            
                <div className="role font-semibold text-[#707C95]">{quantity}</div>
            </div>
        </div>
        <div className="col-3 w-[10%] md:w-[10%] flex justify-center py-4 text-[13px] font-semibold text-[#68758F]">
            <div className="flex items-center">            
                <div className="role font-semibold text-[#707C95]">{soldShares}</div>
            </div>
        </div>

        <div className="hidden col-4 w-[10%] md:flex items-center justify-center px-2">
            <div className={`flex flex-col items-center justify-center text-[12px] font-semibold ${growthPositive === null ? 'text-[#8392AB]' : growthPositive ? 'text-green-500' : 'text-red-500'}`}>
                <div>{stockPriceChange}</div>
                <div className="text-[8px]">({percentageStockPriceChange}%)</div>
            </div>
        </div>


        <div className="hidden col-5 w-[20%] md:flex justify-center">
            <p className={`text-sm flex items-center font-semibold cursor-pointer ${growthPositive === null ? 'text-[#8392AB]' : growthPositive ? 'text-green-500' : 'text-red-500'}`}>
                <span>{stockPrice}</span> 
            </p>
        </div>
    </div>
  );
};

export default AdminTableItem;
