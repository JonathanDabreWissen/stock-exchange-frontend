import React, { useEffect, useState } from 'react';
// import stockData from '../../data/Stock/stockData';
import WatchListTableItem from './WatchListTableItem';
import api from '../../api';

const WatchListTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sharesData, setSharesData] = useState([]);
  const [watchlistData, setWatchlistData] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);

  const filteredWatchlistStocks = sharesData.filter(stock =>
    watchlistData.some(watchlistItem => watchlistItem.shareId === stock.code)
  );

  const filteredStocks = filteredWatchlistStocks.filter(stock =>
    stock.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null; // Parse the JSON string

    console.log("Stored User:", parsedUser);

    const fetchStocks = async () => {
      try {
        const response = await api.get('/shares/view', {
          headers: {
            "ngrok-skip-browser-warning": "true", // Ngrok header to bypass warning
          },
        });
        console.log("Fetched Stock Data:", response.data); // Console log response
        setSharesData(response.data); // Set state with API response
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };


    const fetchWatchlist = async ()=>{
      if (!parsedUser || !parsedUser.id) {
        console.error("User not found in localStorage or ID is missing.");
        return;
      }

      const userId = String(parsedUser.id); //

      const response = await api.get(`/watchlist/${userId}`,{
        headers: {
          "ngrok-skip-browser-warning": "true", // Ngrok header to bypass warning
        },
      });
      console.log("Fetched Watchlist Data:", response.data); // Console log response
      setWatchlistData(response.data);
    }

    fetchStocks();
    fetchWatchlist();

  }, []);


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
        alert(`${stockCode} ${response.data}`)
        window.setTimeout(()=>{
          window.location.reload();
        }, 500)
        
      } catch (error) {
        console.log(error)
      }
    }

    removeWatchlist();
    
  };


  // Toggle stock selection
  const toggleStockSelection = (code) => {
    setSelectedStock(selectedStock === code ? null : code);
  };


  return (
    <div className='rounded-xl my-7 py-5 bg-white h-[100%]'>
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
                    <button onClick={()=>handleRemoveWatchlistClick(stock.code)} className="px-3 py-1 bg-[#17C1E8] text-white text-xs font-semibold rounded-md">REMOVE</button>
                    <button className="px-3 py-1 bg-[#3A416F] text-white text-xs font-semibold  rounded-md">BUY</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchListTable;
