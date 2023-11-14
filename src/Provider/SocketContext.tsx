import React, { createContext, useState } from "react";

type Conn = WebSocket | null;

export const SocketContext = createContext<{
    conn: Conn;
    setConn: (c: Conn) => void;
    }>({
    conn: null,
    setConn: () => {},
    });

const SocketProvider = ({ children  } : {children : React.ReactNode}) => {
    const [conn, setConn] = useState<Conn>(null);
    return (
        <SocketContext.Provider value={{ 
            conn : conn, 
            setConn : setConn 
            }}>
            {children}
        </SocketContext.Provider>
    );
}
export default SocketProvider;
