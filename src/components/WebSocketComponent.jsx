import React from 'react'
import useWebSocket from '../hooks/useWebSocket';

const WebSocketComponent = () => {
  const { data: messageData} = useWebSocket("/topic/share-prices");

  console.log(messageData)

  return (
    <div>WebSocketComponent</div>
  )
}

export default WebSocketComponent;  