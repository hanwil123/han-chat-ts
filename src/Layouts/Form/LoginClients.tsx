import React, { useState } from "react";
import URL from "../../Url_backend/Url";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"
import useStore from "../../Penyimpanan/Penyimpanan_tokenuser";


const LoginClients = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const setTokenUser = useStore((state: any) => state.setTokenUser);
  const setUserName = useStore((state: any) => state.setUserName);


  const handleSubmit = async (r: React.SyntheticEvent) => {
    r.preventDefault();
    try {
      const response = await axios.post(
        `${URL}/ws/joinClients`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token: string = response.data.token;
      const user: any = response.data.data; // Data pengguna
      const usersname: string = response.data.data.username;
      setUserName(usersname);
      const tokenuser: string = response.data["jwt-user"];
      setTokenUser(tokenuser);
      // Set token and user data in cookies
      Cookies.set("tokennn", token);
      Cookies.set("token-user", tokenuser);
      Cookies.set("userdata", JSON.stringify(user));

      console.log("token : ", token);
      console.log("token user : ", tokenuser);
      console.log("data login masuk : ", user);
      console.log("username : ", usersname);
      navigate("/RoomDashboard");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
    <section className="bg-gray-50 dark:bg-gray-900 xl:h-[700px] md:h-full sm:min-h-screen ip5:h-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 xl:h-full">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login account
            </h1>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  email
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="email"
                  placeholder="Email"
                  type="email"
                  onChange={(r) => setEmail(r.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={(r) => setPassword(r.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </>
  )
}

export default LoginClients
