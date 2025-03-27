import React, { useEffect } from 'react'
import useWebSocket from '../hooks/useWebSocket';

const WebSocketComponent = () => {
  const { data:messageData } = useWebSocket("/topic/prices");
  useEffect(()=>{
    console.log(messageData.latestPrices);
  },[messageData])

  return (
    <div>WebSocketComponent</div>
  )
}

export default WebSocketComponent