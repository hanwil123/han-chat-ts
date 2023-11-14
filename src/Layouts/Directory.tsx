import { IoIosAddCircle } from "react-icons/io";
import Cardirectory from "./Cardirectory";

const Directory = () => {
  return (
    <>
      <div className=" flex flex-col h-full py-5 w-[345px] px-5">
        <div className=" flex flex-row">
          <div className=" flex justify-start">
            <h1 className=" text-xl">Directory</h1>
          </div>
        </div>
        <div className=" divider divide-gray-950"></div>
        <div>
          <div className=" flex flex-row justify-between mb-5">
            <div className=" flex flex-row gap-x-2">
              <h1>Contact</h1>
              <p>2</p>
            </div>
            <div className="  items-center flex text-xl justify-end">
            <IoIosAddCircle />
          </div>
          </div>
          <div className=" grid gap-y-5">
            <div>
              <Cardirectory/>
            </div>
            <div>
              <Cardirectory/>
            </div>
            <div>
              <Cardirectory/>
            </div>
            <div>
              <Cardirectory/>
            </div>
            <div>
              <Cardirectory/>
            </div>
            <div>
              <Cardirectory/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Directory;
