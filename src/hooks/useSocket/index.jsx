// src/hooks/useSocket.js
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

// Địa chỉ máy chủ WebSocket của bạn
const SOCKET_URL = "wss://socket-io-be.onrender.com";

// Tạo hook useSocket
const useSocket = () => {
  const [data, setData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    // Tạo kết nối WebSocket
    socketRef.current = io(SOCKET_URL);

    // Xử lý sự kiện kết nối
    socketRef.current.on("connect", () => {
      setConnected(true);
      console.log("Connected to WebSocket server");
    });

    // Xử lý sự kiện ngắt kết nối
    socketRef.current.on("disconnect", () => {
      setConnected(false);
      console.log("Disconnected from WebSocket server");
    });

    // Xử lý tin nhắn đến từ máy chủ
    socketRef.current.on("adminEvent", (data) => {
      setData(data);
    });

    // Xử lý tin nhắn đến từ máy chủ
    socketRef.current.on("message", (messages) => {
      setMessages([messages]);
    });

    // Cleanup khi component bị unmount
    return () => {
      socketRef.current.disconnect();
      console.log("WebSocket connection closed");
    };
  }, []);

  // Gửi tin nhắn đến máy chủ
  const sendMessage = (message) => {
    if (socketRef.current) {
      socketRef.current.send(message);
    }
  };

  return {
    messages,
    data,
    connected,
    sendMessage,
  };
};

export default useSocket;
