import React, { useState, useEffect } from 'react';

const SensexTracker = () => {
  const [sensexValue, setSensexValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace 'YOUR_API_KEY' with an actual Alpha Vantage API key
  const API_KEY = import.meta.env.ALPHAVANTAGE_ACCESS_KEY

  useEffect(() => {
    const fetchSensexData = async () => {
      try {
        // Note: Alpha Vantage uses symbol '^BSESN' for BSE Sensex
        const response = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=^BSESN&apikey=${API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        // Parse the index value from the API response
        const currentPrice = data['Global Quote']['05. price'];
        setSensexValue(parseFloat(currentPrice).toFixed(2));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch Sensex data');
        setLoading(false);
        console.error('Error fetching Sensex data:', err);
      }
    };

    // Fetch data immediately
    fetchSensexData();

    // Optionally, set up periodic updates (e.g., every 5 minutes)
    const intervalId = setInterval(fetchSensexData, 5 * 60 * 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <div>Loading Sensex value...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">BSE Sensex Index</h2>
      <p className="text-2xl font-semibold text-blue-600">
        Current Value: {sensexValue}
      </p>
    </div>
  );
};

export default SensexTracker;