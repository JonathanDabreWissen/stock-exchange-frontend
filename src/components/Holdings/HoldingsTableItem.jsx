import React, { useState, useEffect } from "react";

const HoldingsTableItem = ({ code, companyName, quantity, invested, min, max, stockExchange }) => {

    const [currentStockPrice, setCurrentStockPrice] = useState(parseFloat((Math.random() * (max - min) + min).toFixed(2)));
    const [currentInvestmentValue, setCurrentInvestmentValue] = useState(currentStockPrice * quantity);
    const [investmentGrowth, setInvestmentGrowth] = useState(currentInvestmentValue - invested);
    const [percentageInvestmentGrowth, setPrecentageInvestmentGrowth] = useState(((currentInvestmentValue-invested)/invested)*100);
    const [growthPositive, setGrowthPositive] = useState(investmentGrowth>0 ? true : false);

    const [previousStockPrice, setPreviousStockPrice] = useState(currentStockPrice);

    useEffect(() => {
        const updatePrice = () => {
            setPreviousStockPrice(currentStockPrice);

            const percentChange = currentStockPrice * 0.002;
            const randomVariation = (Math.random() * 2 - 1) * percentChange;
            const newStockPrice = currentStockPrice + randomVariation;
            // console.log(newStockPrice);

            setCurrentStockPrice(newStockPrice)

            setCurrentInvestmentValue(currentStockPrice * quantity);
            setInvestmentGrowth(currentInvestmentValue - invested);
            setPrecentageInvestmentGrowth(((currentInvestmentValue-invested)/invested)*100);
            setGrowthPositive(investmentGrowth>=0);

        };

        const interval = setInterval(updatePrice, 2000);

        return () => clearInterval(interval);
    }, [min, max, quantity, invested, currentStockPrice, previousStockPrice]); // Ensure correct dependencies

  return (
    <div className="row px-4 flex space-x-2 border-t">
        <div className="col-1 w-[50%] md:w-[15%] flex space-x-4 items-center justify-start">
            <div className="flex flex-col">
                <p className="text-sm font-semibold text-[#344767]">{code}</p>
                <p className="text-[12px] font-semibold text-[#8E9CB3]">{companyName}</p>
            </div>
        </div>

        <div className="col-3 w-[10%] md:w-[7.5%] flex justify-center py-4 text-[13px] font-semibold text-[#68758F]">
            <div className="flex items-center">            
                <div className="role font-semibold text-[#707C95]">{stockExchange}</div>
            </div>
        </div>

        <div className="col-2 w-[25%] md:w-[7.5%] pr-[3px] py-4">
            <div className="flex flex-col items-center text-[12px]">
                <div className="role font-semibold text-[#707C95]">{quantity}</div>
            </div>
        </div>
        <div className="col-2 w-[25%] md:w-[10%] pr-[3px] py-4">
            <div className="flex flex-col items-center text-[12px]">
                <div className="role font-semibold text-[#707C95]">{invested}</div>
            </div>
        </div>

        <div className="hidden col-4 w-[15%] md:flex items-center justify-center px-2">
            <div className={`flex justify-center text-[12px] font-semibold text-[#8392AB]`}>
                {(invested/quantity).toFixed(2)}
            </div>
        </div>

        <div className="hidden col-4 w-[10%] md:flex items-center justify-center px-2">
            <div className={`flex justify-center text-[12px] font-semibold ${growthPositive === null ? 'text-[#8392AB]' : growthPositive ? 'text-green-500' : 'text-red-500'}`}>
                {currentInvestmentValue.toFixed(2)}
            </div>
        </div>

        <div className="hidden col-4 w-[15%] md:flex items-center justify-center px-2">
            <div className={`flex justify-center text-[12px] font-semibold ${growthPositive === null ? 'text-[#8392AB]' : growthPositive ? 'text-green-500' : 'text-red-500'}`}>
                {percentageInvestmentGrowth.toFixed(2)}%
            </div>
        </div>

        <div className="hidden col-5 w-[20%] md:flex justify-center">
            <p className={`text-sm flex items-center font-semibold cursor-pointer ${growthPositive === null ? 'text-[#8392AB]' : growthPositive ? 'text-green-500' : 'text-red-500'}`}>
                {currentStockPrice.toFixed(2)}
            </p>
        </div>
    </div>
  );
};

export default HoldingsTableItem;
