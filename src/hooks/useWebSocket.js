import { useState, useCallback } from "react";
import { useSubscription } from "react-stomp-hooks";

const useWebSocket = (topicUrl) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  console.log(topicUrl);

  const handleMessage = useCallback((message) => {
    try {
      const messageBody = JSON.parse(message.body);
      console.log(messageBody)
      setData(messageBody);
      setError(null);
    } catch (err) {
      setError(err);
      console.error("WebSocket Error:", err);
    }
  }, []);

  useSubscription(topicUrl, handleMessage);

  return { data, error };
};

export default useWebSocket;