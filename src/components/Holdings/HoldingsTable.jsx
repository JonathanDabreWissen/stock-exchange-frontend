import React, { useContext, useEffect, useState } from 'react';
import HoldingsTableItem from './HoldingsTableItem';
import useGetData from '../../hooks/useGetData';
import { AuthContext } from '../../context/AuthContext';
import usePostData from '../../hooks/usePostData';
import LoadingContainer from '../utils/LoadingContainer';
import { Toaster, toast } from 'sonner'
import { motion } from 'framer-motion';

const HoldingsTable = () => {

  const MotionDiv = motion.div;

  const { user } = useContext(AuthContext);
  const userId = String(user.id);

  const [searchTerm, setSearchTerm] = useState('');
  const [sharesData, setSharesData] = useState([]);
  const [heldSharesData, setHeldSharesData] = useState([]);

  const [selectedStock, setSelectedStock] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [shareToBuy, setShareToBuy] = useState(null); 
  const [shareToSell, setShareToSell] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantityInput, setQuantityInput] = useState("");

  const { data: holdingsData, loading:holdingsDataLoading, refetch:refetchHoldingsData } = useGetData(`/holdings/${userId}`);
  const { data: allSharesData, loading:allSharesLoading } = useGetData(`/shares/view`);
  const { addData } = usePostData("/trade/buy");
  const { addData:sellShare } = usePostData("/trade/sell");
  
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


  // Toggle stock selection
  const toggleStockSelection = (code) => {
    setSelectedStock(selectedStock === code ? null : code);
    setIsOpen(!isOpen);
  };

  const handleBuyShare = async ()=>{
    const shareData = {
      userId:Number(userId),
      shareCode: shareToBuy,
      quantity:Number(quantityInput)
    }; 

    const response = await addData(shareData);

    if(response){
      toast.success(response)
      setShareToBuy("");
      refetchHoldingsData();
    }
    else{
      alert("Something went wrong");
    }

    closeModal();
  }

  const handleSellShare = async ()=>{
    const shareData = {
      userId:Number(userId),
      shareCode: shareToSell,
      quantity:Number(quantityInput)
    }; 

    const response = await sellShare(shareData);

    if(response){
      toast.success(response)
      setShareToSell("");
      refetchHoldingsData();
    }
    else{
        toast.error("Something went wrong");
    }

    closeModal();
  }

  const openModal = (stockCode, typeOfTransaction) => {
    setTransactionType(typeOfTransaction);

    if(typeOfTransaction === "Buy"){
      setShareToBuy(stockCode);
    }
    else if(typeOfTransaction === "Sell"){
      setShareToSell(stockCode);
    }
    // console.log(`Open modal for ${stockCode}`)
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setQuantityInput("");
    setShareToBuy("");
  };

  if(allSharesLoading || holdingsDataLoading){
    return (<LoadingContainer/>)
  }

  return (
    <div className='rounded-xl my-7 py-5 bg-white h-[100%]'>
      <Toaster/>
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
              <div key={index} onClick={() => toggleStockSelection(stock.code)} className="cursor-pointer">
                <HoldingsTableItem
                  code={stock.code}
                  companyName={stock.companyName}
                  quantity = {stock.quantity}
                  invested = {stock.price}
                  min={stock.minPrice}
                  max={stock.maxPrice}
                  stockExchange={stock.stockExchange || "BSE"}
                />
                {/* Show buttons if the stock is selected */}
                <MotionDiv
                  initial={{ opacity: 0, height: 0 }}
                  animate={selectedStock === stock.code ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                  className="overflow-hidden"
                >
                  <div className="flex gap-2 my-4 px-4">
                    <button onClick={(e) =>{e.stopPropagation(); openModal(stock.code, "Buy")}} className="px-3 py-1 bg-[#17C1E8] text-white text-xs font-semibold rounded-md">BUY MORE</button>
                    <button onClick={(e) =>{e.stopPropagation(); openModal(stock.code, "Sell")}} className="px-3 py-1 bg-[#3A416F] text-white text-xs font-semibold rounded-md">SELL</button>
                  </div>
                </MotionDiv>

              </div>
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-2xl w-96">
            <h2 className="text-lg font-semibold mb-4 text-[#3A416F]">{shareToBuy || shareToSell}</h2>
            <input
              type="number"
              placeholder="Enter Quantity"
              className="w-full px-5 py-3 border focus:outline-none focus:ring-1 focus:ring-[#3A416F] text-sm rounded-lg mb-4"
              value={quantityInput}
              onChange={(e) => setQuantityInput(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button className="px-4 py-2 bg-[#3A416F] text-white rounded-lg" onClick={closeModal}>Cancel</button>
              {
                transactionType === "Buy" ?
                  <button className="px-4 py-2 bg-[#17C1E8] text-white rounded-lg" onClick={handleBuyShare}>Buy</button>
                  :
                  <button className="px-4 py-2 bg-[#17C1E8] text-white rounded-lg" onClick={handleSellShare}>Sell</button> 
              }
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default HoldingsTable;
