import { BiSolidHome } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { BsChatDotsFill } from "react-icons/bs";

const Navbars = () => {
  return (
    <>
      <div className=" w-16 h-full pt-3 pb-6 bg-white shadow flex-col justify-between items-center inline-flex">
        <div className="flex-col justify-center items-center gap-10 flex">
          <div className="w-14 h-14 bg-indigo-500 rounded-2xl justify-center items-center inline-flex">
            <div className=" text-white text-xl font-bold font-['Asap'] leading-loose text-center">
              Q
            </div>
          </div>
          <div className="flex-col justify-center items-center gap-8 flex">
            <div className="w-6 h-6 px-0.5 py-0.5 justify-center items-center inline-flex">
              <BiSolidHome className="w-20 h-20 text-black" />
            </div>
            <div className="w-6 h-6 px-0.5 py-0.5 justify-center items-center inline-flex">
              <BsChatDotsFill className=" w-20 h-20 text-black" />
            </div>
            <div className="w-6 h-6 px-0.5 py-0.5 justify-center items-center inline-flex">
              <BiSearch className=" w-20 h-20 text-black" />
            </div>
            <div className="w-6 h-6 relative" />
          </div>
          <div>
              <div className="w-4 h-8 mt-40 text-black text-xl font-bold font-['Asap'] leading-loose text-center">
                <FiSettings />
              </div>
          </div>
        </div>
        <div className="w-6 h-6 relative" />
      </div>
    </>
  );
};

export default Navbars;
