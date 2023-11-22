import {create} from 'zustand';

interface Store {
    tokenuser : string | null;
    username : string | null;
    roomId : string | null;
    conn : WebSocket | null;
    setRoomId: (roomId: string) => void;
    setUserName: (username: string) => void;
    setTokenUser: (tokenuser: string) => void;
    setConn : (conn: WebSocket | null) => void;
}

const useStore= create<Store>((set) => ({
    tokenuser: null,
    username: null,
    roomId: null,
    conn: null,
    setRoomId: (roomId: string) => set({roomId}),
    setUserName: (username: string) => set({username}),
    setTokenUser: (tokenuser: string) => set({tokenuser}),
    setConn: (conn: WebSocket | null) => set({conn})
}))
export default useStore;
