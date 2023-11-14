import { IoMdCall } from "react-icons/io";

const Headerchat = () => {
  return (
    <>
      <div className=" w-full h-full card card-side bg-yellow-500 text-black">
        <div className=" flex flex-row">
          <div className=" pr-10">
            <img
              className=" w-10 h-10 my-2 mx-2 border rounded-lg"
              src="/iui.jpg"
              alt=""
            />
          </div>
          <div className=" flex flex-col">
            <h1>USEPPP</h1>
            <p>sadasdsadsadasd</p>
          </div>
          <div className=" pl-32 flex flex-row">
            <button className=" bg-red-600 my-2 border border-solid rounded-lg border-black">
              <div className=" flex flex-row mx-2">
                <div className=" ">
                  <IoMdCall className=" mt-1" />
                </div>
                <div className=" text-sm">
                  <h1>Call</h1>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Headerchat;
