import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Room from "../Form/Room";
import axios from "axios";
import URL from "../../Url_backend/Url";
import URL_WS from "../../Url_backend/Url_Ws";
import { SocketContext } from "../../Provider/SocketContext";
import useStore from "../../Penyimpanan/Penyimpanan_tokenuser";

const HomeRoom: React.FC = () => {
  const [roomDatas, setRoomDatas] = useState<any[]>([]);
  const navigate = useNavigate();
  const tokenuser = useStore((state: any) => state.tokenuser);
  const username = useStore((state: any) => state.username);
  const setRoomId = useStore((state: any) => state.setRoomId);
  const { setConn } = useContext(SocketContext);

  const setupWebSocket = (roomId: string) => {
    const ws = new WebSocket(
      `${URL_WS}/ws/joinRoom/${roomId}?userId=${tokenuser}&username=${username}`
    );

    ws.onerror = (error) => {
      console.log("WebSocket error: ", error);
    };

    ws.onopen = () => {
      if (ws.readyState === ws.OPEN) {
        ws.send("Hello Server!");
        setConn(ws);
        console.log(ws);
        navigate("/Chat");
      }
    };
    ws.binaryType = "arraybuffer";

    ws.onclose = () => {
      console.log("WebSocket is closed. Reconnecting...");
      // Reconnect after a delay (e.g., 3 seconds)
      setTimeout(() => {
        setupWebSocket(roomId);
      }, 3000);
    };

    return ws;
  };

  const joinRoom = async (roomId: string) => {
    console.log("room id : ", roomId);
    console.log("token user : ", tokenuser);
    console.log("username : ", username);
    setRoomId(roomId);

    setupWebSocket(roomId);
  };

  const fetchRoom = async () => {
    try {
      const response = await axios.get(`${URL}/ws/GetRoom`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const datas = response.data;
      console.log(datas);
      setRoomDatas(datas);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  const handleRoomCreated = () => {
    // Panggil fungsi fetchRoom untuk mendapatkan daftar ruang terbaru setelah membuat ruang baru
    fetchRoom();
  };
  return (
    <>
      <section className="bg-gray-50 dark:bg-red-700 xl:h-full md:h-full sm:min-h-screen ip5:h-full w-full text-black">
        <div className="container px-5 mx-auto">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 ">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <Room onRoomCreated={handleRoomCreated} />
          </div>
          </div>
          <div className="flex flex-wrap -m-4 text-center py-10">
            {roomDatas.map((roomData) => (
              <div className="p-4 md:w-1/4 sm:w-1/2 w-full" key={roomData.ID}>
                <div className="border-2 border-gray-200  h-full rounded-lg">
                  <div className="flex flex-row justify-around">
                    <div className=" flex flex-col">
                      <div className="">
                        <h1>Room : </h1>
                      </div>
                      <div className=" ">
                        <h1 className=" text-xl flex justify-center py-2 text-black">
                          {roomData.name}
                        </h1>
                      </div>
                    </div>
                    <button
                      onClick={() => joinRoom(roomData.roomId)}
                      className=""
                    >
                      <div className=" bg-yellow-500 flex items-center w-20 h-10 justify-center">
                        JOIN
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default HomeRoom
