// src/hooks/useSocket.js
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

// Địa chỉ máy chủ WebSocket của bạn
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

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
      console.log("connext");

      setConnected(true);
    });

    // Xử lý sự kiện ngắt kết nối
    socketRef.current.on("disconnect", () => {
      console.log("disconnect");

      setConnected(false);
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
