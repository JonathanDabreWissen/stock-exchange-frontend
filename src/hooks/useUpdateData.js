import { useState } from "react";
import api from "../api";

const useUpdateData = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const updateData = async (updatedData) => {
    console.log(updatedData)
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(url, updatedData, {
        headers: { "Content-Type": "application/json" },
      });
    
      setData(response.data.message);
      return response.data; // Returning response if needed
    } catch (err) {
      setData(err.message);
      setError(err.message);
      console.error("Error updating data:", err);
    } finally {
      setLoading(false);
    }
  };

  return { data ,updateData, loading, error };
};

export default useUpdateData;