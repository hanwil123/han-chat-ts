import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie"
import useStore from "../Penyimpanan/Penyimpanan_tokenuser";
import { useNavigate } from "react-router-dom";
export type UserInfo = {
    username : string;
    token : string;
    tokenuser : string;
}

export const AuthContext = createContext<{
    authenticated : boolean;
    setAuthenticated : (authenticated : boolean) => void;
    user : UserInfo 
    setUser : (user : UserInfo) => void;
}>({
    authenticated : false,
    setAuthenticated : () => {},
    user : {
        username : "",
        token : "",
        tokenuser : ""
    },
    setUser : () => {}
})
const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const tokenuser = useStore((state: any) => state.tokenuser);
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState<UserInfo>({
      username: "",
      token: "",
      tokenuser: "",
    });
  
    useEffect(() => {
      const token = Cookies.get("jwt-user"); // Ganti tokenuser dengan string "tokenuser"
      if (!token) {
        if (window.location.pathname !== "/") {
          navigate("/Login");
          return;
        }
      } else {
        if (token) {
          const user: UserInfo = JSON.parse(token);
          if (user) {
            setUser({
              username: user.username,
              token: user.token,
              tokenuser: user.tokenuser,
            });
          }
          setAuthenticated(true);
        }
      }
    }, [authenticated, navigate, tokenuser]);
  
    return (
      <AuthContext.Provider
        value={{
          authenticated: authenticated,
          setAuthenticated: setAuthenticated,
          user: user,
          setUser: setUser,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  export default AuthContextProvider;
