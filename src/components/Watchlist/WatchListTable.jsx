import React, { useContext, useEffect, useState } from 'react';
// import stockData from '../../data/Stock/stockData';
import WatchListTableItem from './WatchListTableItem';
import api from '../../api';
import usePostData from '../../hooks/usePostData';
import { AuthContext } from '../../context/AuthContext';
import useGetData from '../../hooks/useGetData';
import LoadingContainer from '../utils/LoadingContainer';
import { Toaster, toast } from 'sonner'
import { motion } from 'framer-motion';

const WatchListTable = () => {
  const MotionDiv = motion.div;

  const { user } = useContext(AuthContext);
  const userId = String(user.id);

  const [searchTerm, setSearchTerm] = useState('');
  const [sharesData, setSharesData] = useState([]);
  const [watchlistData, setWatchlistData] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [shareToBuy, setShareToBuy] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantityInput, setQuantityInput] = useState("");

  const { addData } = usePostData("/trade/buy");
  const { data: allSharesData, loading:allSharesLoading, refetch:refetchAllSharesData } = useGetData(`/shares/view`);
  const { data: watchlistSharesData, loading:allWatchlistSharesLoading, refetch:refetctWishlistData  } = useGetData(`/watchlist/${userId}`);

  useEffect(() => {
    setSharesData(allSharesData)
  }, [allSharesData])

  useEffect(() => {
    setWatchlistData(watchlistSharesData)
  }, [watchlistSharesData])

  const filteredWatchlistStocks = (sharesData||[]).filter(stock =>
    (watchlistData||[]).some(watchlistItem => watchlistItem.shareId === stock.code)
  );

  const filteredStocks = filteredWatchlistStocks.filter(stock =>
    stock.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveWatchlistClick = (stockCode) => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null; // Parse the JSON string
    const userId = String(parsedUser.id); //
    console.log(`${stockCode} to be watchlisted`);


    const removeWatchlist = async ()=>{
      try {
        const response = await api.delete("/watchlist/remove",  {
          params: {
            userId: userId,
            shareId: stockCode,
          },
          headers: { 
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"  // Add this
          },
        });

        console.log(response);
        toast.success(`${stockCode} ${response.data}`)
        refetchAllSharesData();
        refetctWishlistData();
        
      } catch (error) {
        console.log(error)
      }
    }

    removeWatchlist();
    
  };


  const openModal = (stockCode) => {
    setShareToBuy(stockCode);
    console.log(`Open modal for ${stockCode}`)
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setQuantityInput("");
    setShareToBuy("");
  };

  // Toggle stock selection
  const toggleStockSelection = (code) => {
    setSelectedStock(selectedStock === code ? null : code);
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
    }
    else{
        toast.error("Something went wrong")
    }

    closeModal();
  }


  if(allSharesLoading || allWatchlistSharesLoading){
    return (<LoadingContainer/>)
  }
  
  return (
    <div className='rounded-xl my-7 py-5 bg-white h-[100%]'>
      <Toaster />
      <div className='flex justify-between px-4'>
        <h6 className='text-[#344767] font-bold'>Your Watchlist</h6>
        <input
          className='px-4 py-2 border border-gray-300 rounded-lg text-sm'
          type='text'
          placeholder='Search stock'
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
              <div key={index} onClick={() => toggleStockSelection(stock.code)} className="cursor-pointer">
                <WatchListTableItem
                  code={stock.code}
                  companyName={stock.companyName}
                  min={stock.minPrice}
                  max={stock.maxPrice}
                  growth={stock.growth}
                  priceChange={stock.priceChange}
                  precentageChange={stock.percentageChange}
                  stockExchange={stock.stockExchange || 'BSE'}
                />
                <MotionDiv
                  initial={{ opacity: 0, height: 0 }}
                  animate={selectedStock === stock.code ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                  className="overflow-hidden"
                >
                  <div className="flex gap-2 my-4 px-4">
                    <button onClick={(e)=>{e.stopPropagation(); handleRemoveWatchlistClick(stock.code)}} className="px-3 py-1 bg-[#17C1E8] text-white text-xs font-semibold rounded-md">REMOVE</button>
                    <button onClick={(e)=>{e.stopPropagation(); openModal(stock.code)}} className="px-3 py-1 bg-[#3A416F] text-white text-xs font-semibold  rounded-md">BUY</button>
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
            <h2 className="text-lg font-semibold mb-4 text-[#3A416F]">{shareToBuy}</h2>
            <input
              type="number"
              placeholder="Enter Quantity"
              className="w-full px-5 py-3 border focus:outline-none focus:ring-1 focus:ring-[#3A416F] text-sm rounded-lg mb-4"
              value={quantityInput}
              onChange={(e) => setQuantityInput(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button className="px-4 py-2 bg-[#3A416F] text-white rounded-lg" onClick={closeModal}>Cancel</button>
              <button className="px-4 py-2 bg-[#17C1E8] text-white rounded-lg" onClick={handleBuyShare}>Buy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchListTable;
