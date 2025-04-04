import { useState } from "react";
import api from "../api";

const usePostDataWithParams = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addData = async (params) => {
    setLoading(true);
    setError(null);

    try {
      // Convert params to query string
      const queryParams = new URLSearchParams(params).toString();
      const urlWithParams = `${url}?${queryParams}`;

      const response = await api.post(urlWithParams, null, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      return response.data;
    } catch (err) {
      setError(err.message);
      console.error("Error adding data:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addData, loading, error };
};

export default usePostDataWithParams;