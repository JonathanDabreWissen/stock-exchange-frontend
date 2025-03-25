import { useState } from "react";
import api from "../api";

const usePostDataWithParams = (baseUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addData = async (params) => {
    setLoading(true);
    setError(null);

    try {
      // Convert params object into a URL query string
      const queryParams = new URLSearchParams(params).toString();
      const urlWithParams = `${baseUrl}?${queryParams}`;

      const response = await api.post(urlWithParams, null, {
        headers: { "Content-Type": "application/json" },
      });

      return response.data; // Returning response if needed
    } catch (err) {
      setError(err.message);
      console.error("Error adding data:", err);
    } finally {
      setLoading(false);
    }
  };

  return { addData, loading, error };
};

export default usePostDataWithParams;
