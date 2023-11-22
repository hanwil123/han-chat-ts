import { useContext, useEffect, useRef, useState } from 'react';
import Headerchat from './Headerchat';
import { useSocket } from '../Provider/SocketContext';
import autosize from 'autosize';
import useStore from '../Penyimpanan/Penyimpanan_tokenuser';
import Chatbuble from './Chatbuble';
import { AuthContext } from '../Provider/Auth_provider';
import URL_WS from '../Url_backend/Url_Ws';

export type Message = {
  content: string;
  type: 'recv' | 'self';
  username: string;
  roomId: string;
  timestamp: number;
};
const Chat = () => {
// Define the Message type
const [users, setUsers] = useState<Array<{ username : string}>>([]);
const [messages, setMessages] = useState<Message[]>([]);
const [inputMessage, setInputMessage] = useState<string>('');
const textarea = useRef<HTMLTextAreaElement>(null);
const { conn, setConn } = useSocket();
const roomId = useStore((state: any) => state.roomId);
const tokenuser = useStore((state: any) => state.tokenuser);
const username = useStore((state: any) => state.username);
const {user} = useContext(AuthContext);


useEffect(() => {
    if (textarea.current) {
        autosize(textarea.current);
    }
    if (conn !== null && conn.readyState == WebSocket.OPEN) {
      console.log("conn chat: ", conn);
      conn.send("server berhasil diakses")
      conn.onmessage = (message) => {
        const m = JSON.parse(message.data);
        if (m.type === 'recv') {
          if (m.username !== username) {
            setMessages(prevMessages => [...prevMessages, m]);
          }
        }
      };
    }
}, [textarea, messages, users, conn]) // get websocket

// Implement logic to send a message
// Implement logic to send a message
// ...

const sendMessage = async (): Promise<void> => {
  if (!textarea.current?.value) return;

  const newMessage: Message = {
    content: textarea.current.value,
    type: 'self', // Set the type of the message to 'self'
    username: username, // Replace 'YourUsername' with the actual username
    roomId: roomId, // Replace 'YourRoomID' with the actual room ID
    timestamp: Date.now(),
  };

  setMessages(prevMessages => [...prevMessages, newMessage]); // Add the new message to the messages state

  if (conn !== null && conn.readyState === WebSocket.OPEN) {
    conn.send(JSON.stringify(newMessage)); // Send the new message through the WebSocket connection
    textarea.current.value = "";
  }
};

  return (
    <>
      <div className=" inline-flex flex-col h-full py-5 w-[460px] px-5">
        <div className=" mb-5">
          <Headerchat />
        </div>
        <div>
          <Chatbuble data={messages}/>
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
                <button className="btn join-item" onClick={() => sendMessage()}>
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
