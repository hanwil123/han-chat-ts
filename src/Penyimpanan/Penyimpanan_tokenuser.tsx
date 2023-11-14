import {create} from 'zustand';

interface Store {
    tokenuser : string | null;
    username : string | null;
    roomId : string | null;
    setRoomId: (roomId: string) => void;
    setUserName: (username: string) => void;
    setTokenUser: (tokenuser: string) => void;
}

const useStore= create<Store>((set) => ({
    tokenuser: null,
    username: null,
    roomId: null,
    setRoomId: (roomId: string) => set({roomId}),
    setUserName: (username: string) => set({username}),
    setTokenUser: (tokenuser: string) => set({tokenuser}),
}))
export default useStore;
