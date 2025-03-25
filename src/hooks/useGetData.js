import { useState, useEffect, useCallback } from "react";
import api from "../api" // Import your pre-configured axios instance

const useGetData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!url) return;

    setLoading(true);
    try {
      const response = await api.get(url, {
        headers: {
          "ngrok-skip-browser-warning": "true", // ✅ Added header to bypass Ngrok warning
        },
      });
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (url) fetchData();
  }, [fetchData, url]);

  return { data, loading, error, refetch: fetchData };
};

export default useGetData;
