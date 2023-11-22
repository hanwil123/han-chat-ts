// Perbaikan pada SocketProvider
import React, { createContext, useState, useContext } from "react";

export const SocketContext = createContext<{
  conn: WebSocket | null;
  setConn: (c: WebSocket | null) => void;
}>({
  conn: null,
  setConn: () => {},
});

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [conn, setConn] = useState<WebSocket | null>(null);
  return (
    <SocketContext.Provider value={{ conn, setConn }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};

export default SocketProvider;
