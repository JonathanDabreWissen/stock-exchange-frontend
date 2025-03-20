import React, { useState, useEffect } from "react";

const StockTableItem = ({ code, companyName, price, min, max, growth, priceChange, percentageChange, stockExchange }) => {
  
  const [stockPrice, setStockPrice] = useState(price);
  

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate a new price within the min-max range
      const newPrice = (Math.random() * (max - min) + min).toFixed(2);
      setStockPrice(parseFloat(newPrice)); // Ensure it’s a float
    }, 5000); // Runs every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [min, max]); // Runs again only if min/max changes

  return (
    <div className="row px-4 flex space-x-2 border-t">
        <div className="col-1 w-[50%] md:w-[15%] flex space-x-4 items-center justify-start">
            <div className="flex flex-col">
                <p className="text-sm font-semibold text-[#344767]">{code}</p>
                <p className="text-[12px] font-semibold text-[#8E9CB3]">{companyName}</p>
            </div>
        </div>

        <div className="col-2  w-[25%] md:w-[20%] pr-[3px] py-4">
            <div className="flex flex-col text-[12px]">
                <div className="role font-semibold text-[#707C95]">{companyName}</div>
            </div>
        </div>

        <div className="col-3  w-[10%] md:w-[15%] flex justify-center py-4 text-[13px] font-semibold text-[#68758F]">
            <div className="flex items-center">            
                <div className="role font-semibold text-[#707C95]">{stockExchange}</div>
            </div>
        </div>

        <div className="hidden col-4 w-[10%] md:flex items-center justify-center px-2">
            <div className="flex justify-center text-[12px] text-[#8392AB] font-semibold">{priceChange}</div>
        </div>
        <div className="hidden col-4 w-[15%] md:flex items-center justify-center px-2">
            <div className="flex justify-center text-[12px] text-[#8392AB] font-semibold">{percentageChange}</div>
        </div>
        <div className="hidden col-5 w-[20%] md:flex justify-center">
            <p className="text-sm flex items-center font-semibold text-[#8392AB] cursor-pointer">
                {stockPrice}
            </p>
        </div>
    </div>
  );
};

export default StockTableItem;
