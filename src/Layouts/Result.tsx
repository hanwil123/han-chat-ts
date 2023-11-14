import { IoIosAddCircle } from "react-icons/io";
import Card from "./Card";

const Results = () => {
  return (
    <>
      <div className=" flex flex-col h-full py-5 w-[360px] px-5">
        <div className=" flex flex-row justify-between mb-3">
          <div className=" flex justify-start">
            <h1 className=" text-xl">MESSAGE</h1>
          </div>
          <div className="  items-center flex text-xl justify-end">
            <IoIosAddCircle />
          </div>
        </div>
        <div className="divider divide-gray-950"></div>
        <div>
          <div className="form-control mb-5">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search…"
                className="input input-bordered w-full"
              />
              <button className="btn btn-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className=" grid gap-y-5">
            <div>
              <Card />
            </div>
            <div>
              <Card />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Results;
