import React, { useState } from "react";
import URL from "../../Url_backend/Url";
import axios from "axios";

const Room = ({ onRoomCreated }: { onRoomCreated: () => void }) => {
    const [nama, setNama] = useState<string>("");

    const handlesubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      const response = await axios.post(
        `${URL}/ws/createRoom`,
        {
          Id: Math.random().toString(36).substring(7),
          RoomId: Math.random().toString(36).substring(7),
          Name: nama,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
  
      // Memanggil fungsi onRoomCreated yang diteruskan dari HomeRoom untuk memperbarui daftar ruang
      onRoomCreated();
    };
  return (
    <>
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Create Room
        </h1>
        <form
          onSubmit={handlesubmit}
          className="space-y-4 md:space-y-6"
          action="#"
        >
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Room Name
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name"
              type="text"
              name="nama"
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Create Room
          </button>
        </form>
      </div>
    </>
  )
}

export default Room
