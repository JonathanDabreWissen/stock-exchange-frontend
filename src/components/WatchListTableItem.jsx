import React, { useState, useEffect } from "react";

const WatchListTableItem = ({ code, companyName, price, min, max, stockExchange }) => {
  
  const [stockPrice, setStockPrice] = useState(price);
  // eslint-disable-next-line no-unused-vars
  const [previousPrice, setPreviousPrice] = useState(price);
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
      } while (Math.abs(percentageChange) > 10); // Restrict to ±10%

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

        <div className="col-2 w-[25%] md:w-[20%] pr-[3px] py-4">
            <div className="flex flex-col text-[12px]">
                <div className="role font-semibold text-[#707C95]">{companyName}</div>
            </div>
        </div>

        <div className="col-3 w-[10%] md:w-[15%] flex justify-center py-4 text-[13px] font-semibold text-[#68758F]">
            <div className="flex items-center">            
                <div className="role font-semibold text-[#707C95]">{stockExchange}</div>
            </div>
        </div>

        <div className="hidden col-4 w-[10%] md:flex items-center justify-center px-2">
            <div className={`flex justify-center text-[12px] font-semibold ${growthPositive === null ? 'text-[#8392AB]' : growthPositive ? 'text-green-500' : 'text-red-500'}`}>
                {stockPriceChange}
            </div>
        </div>

        <div className="hidden col-4 w-[15%] md:flex items-center justify-center px-2">
            <div className={`flex justify-center text-[12px] font-semibold ${growthPositive === null ? 'text-[#8392AB]' : growthPositive ? 'text-green-500' : 'text-red-500'}`}>
                {percentageStockPriceChange}%
            </div>
        </div>

        <div className="hidden col-5 w-[20%] md:flex justify-center">
            <p className={`text-sm flex items-center font-semibold cursor-pointer ${growthPositive === null ? 'text-[#8392AB]' : growthPositive ? 'text-green-500' : 'text-red-500'}`}>
                {stockPrice}
            </p>
        </div>
    </div>
  );
};

export default WatchListTableItem;
