import React, { useContext, useEffect, useState } from 'react';
import WatchListTableItem from './Watchlist/WatchListTableItem';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import usePostData from '../hooks/usePostData';

const AllStocksTable = () => {

  const { user } = useContext(AuthContext);
  const userId = String(user.id);

  const [searchTerm, setSearchTerm] = useState('');
  const [sharesData, setSharesData] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null); 
  const [shareToBuy, setShareToBuy] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantityInput, setQuantityInput] = useState("");
  

  const { addData } = usePostData("/trade/buy");

  const filteredStocks = sharesData.filter(stock =>
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
        // console.log("Fetched Stock Data:", response.data); // Console log response
        setSharesData(response.data); // Set state with API response
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };

    fetchStocks();
  }, []);


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
      alert("Order placed successfully")
    }
    else{
        alert("Something went wrong");
    }

    closeModal();
  }

  const handleAddWatchlistClick = (stockCode) => {
    console.log(`${stockCode} to be watchlisted`);


    const addWatchlist = async ()=>{
      try {
        const response = await api.post("/watchlist/add", null, {
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
        alert(`${stockCode} ${response.data}`)
        
      } catch (error) {
        console.log(error)
      }
    }

    addWatchlist();
  };

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
              <div key={index} onClick={() => toggleStockSelection(stock.code)} className="cursor-pointer">
                <WatchListTableItem
                  code={stock.code}
                  companyName={stock.companyName}
                  price={stock.price}
                  min={stock.minPrice}
                  max={stock.maxPrice}
                  growth={stock.growth}
                  priceChange={stock.priceChange}
                  precentageChange={stock.percentageChange}
                  stockExchange={stock.stockExchange || 'BSE'}
                />
                {/* Show buttons if the stock is selected */}
                {selectedStock === stock.code && (
                  <div className="flex gap-2 my-4 px-4">
                    <button onClick={()=> handleAddWatchlistClick(stock.code)} className="px-3 py-1 bg-[#17C1E8] text-white text-xs font-semibold rounded-md">WATCHLIST</button>
                    <button onClick={()=>openModal(stock.code)} className="px-3 py-1 bg-[#3A416F] text-white text-xs font-semibold  rounded-md">BUY</button>
                  </div>
                )}
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

export default AllStocksTable;
