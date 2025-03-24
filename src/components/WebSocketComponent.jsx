import { Client } from '@stomp/stompjs';
import React, { useEffect, useState } from 'react'
import SockJS from 'sockjs-client';

const WebSocketComponent = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [client, setClient] = useState(null);

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        const stompClient = new Client({
          webSocketFactory: () => socket,
          debug: (str) => console.log(str), // Debug logs
          onConnect: () => {
            console.log("✅ Connected to WebSocket");
    
            stompClient.subscribe("/topic/messages", (message) => {
              console.log("📩 Message received:", message.body);
              setMessages((prev) => [...prev, message.body]);
            });
          },
          onStompError: (frame) => {
            console.error("❌ WebSocket error: ", frame);
          },
        });
    
        stompClient.activate();
        setClient(stompClient);
    
        return () => stompClient.deactivate();
    }, []);
    
    const sendMessage = () => {
        if (client && client.connected) {
            console.log("📤 Sending message:", message);
            client.publish({
            destination: "/app/send",
            body: message,
            });
            setMessage("");
        } else {
            console.error("🚨 WebSocket not connected");
        }
    };

    return (
        <div>
            <h2>WebSocket Chat</h2>
            <div>
                {messages.map((msg, index) => (
                <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                className='px-5 py-2 rounded-lg bg-gray-200'
                onChange={(e) => setMessage(e.target.value)}
            />
            <button className='button bg-green-500  px-5 py-2 rounded-lg ml-3 text-white' onClick={sendMessage}>Send</button>
        </div>
    )
}



export default WebSocketComponent