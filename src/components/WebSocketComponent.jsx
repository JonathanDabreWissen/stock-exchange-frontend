import React, { useEffect } from 'react'
import useWebSocket from '../hooks/useWebSocket';

const WebSocketComponent = () => {
  const { data:messageData } = useWebSocket("/topic/share-prices");

  useEffect(()=>{
    console.log(messageData);
  },[messageData])

  return (
    <div>WebSocketComponent</div>
  )
}

export default WebSocketComponent