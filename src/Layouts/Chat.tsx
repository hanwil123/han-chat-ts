import { useContext, useEffect, useRef, useState } from 'react';
import Headerchat from './Headerchat';
import { SocketContext } from '../Provider/SocketContext';
import axios from 'axios';
import URL from '../Url_backend/Url';
import autosize from 'autosize';
import { useNavigate } from "react-router-dom";

const Chat = () => {

type Message = {
  content: string;
  type: 'recv' | 'self';
  username : string;
  room_id : string;
  timestamp: number;
}

const [users, setUsers] = useState<Array<{ username : string}>>([]);
const [messages, setMessages] = useState<Message[]>([]);
const [inputMessage, setInputMessage] = useState<string>("");
const textarea = useRef<HTMLTextAreaElement>(null);
const { conn } = useContext(SocketContext);
const navigate = useNavigate();

useEffect(() => {
    if (conn === null) {
        navigate("/RoomDashboard");
    }
    const roomId = conn?.url.split("/")[5];
    async function getUsers() {
        try {
           const response = await axios.get(`${URL}/ws/GetClients/${roomId}`, {
            headers: {
                "Content-Type": "application/json",
            }
           }) 
           const datas = response.data;
           setUsers(datas);
           console.log("data : ", datas)
        } catch (error) {
            console.log(error);
        }
    }
    getUsers();
}, []) //get client in the room
useEffect(() => {
    if (textarea.current) {
        autosize(textarea.current);
    }
    if (conn === null) {
        navigate("/RoomDashboard");
    }
    if (conn) { // Tambahkan pengecekan null
        conn.onmessage = (message) => {
            const m: Message = JSON.parse(message.data);
            if (m.content === 'A new user has been joined') {
                setUsers(prevUsers => [...prevUsers, { username: m.username }])
            }
            if (m.content === 'A user has been left') {
                setUsers(prevUsers => prevUsers.filter((user) => user.username !== m.username))
                setMessages(prevMessages => [...prevMessages, m])
            }
        }
    }
}, [textarea, messages, users, conn]) // get websocket

// Implement logic to send a message
// Implement logic to send a message
const sendMessage = async (): Promise<void> => {
    if (!textarea.current?.value) return;
    if (conn) {
        conn.send(textarea.current.value); // Menggunakan optional chaining di sini
    }
    textarea.current.value = "";
};
  return (
    <>
      <div className=" inline-flex flex-col h-full py-5 w-[460px] px-5">
        <div className=" mb-5">
          <Headerchat />
        </div>
        <div>
        {messages.map((msg : Message, index : number) => (
  <div className={`chat ${msg.type === "recv" ? "chat-start" : "chat-end"}`} key={index}>
    <div className="chat-image avatar">
      <div className="w-10 rounded-full">
        <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
      </div>
    </div>
    <div className="chat-header">
      {msg.type === "recv" ? "Me" : "Receiver"}
      <time className="text-xs opacity-50">
        {new Date(msg.timestamp).toLocaleTimeString()}
      </time>
    </div>
    <div className="chat-bubble">{msg.content}</div>
    <div className="chat-footer opacity-50">
      {msg.type === "self"
        ? "Delivered"
        : `Seen at ${new Date(msg.timestamp).toLocaleTimeString()}`}
    </div>
  </div>
))}

          <div className=" relative mt-20">
            <div className="join">
              <div className="">
                <div>
                  <textarea
                    ref={textarea}
                    className="input input-bordered join-item w-80"
                    placeholder="Type a message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                  />
                </div>
              </div>
              <div className="indicator">
                <button className="btn join-item" onClick={sendMessage}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat
