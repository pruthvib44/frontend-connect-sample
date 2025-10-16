import React, { createContext, type ReactNode } from "react";
import { useState } from "react";
import type { LoginContextI } from "../types/LoginContextI";
import type { UserI } from "../types/UserI";
import type { ErrorI } from "../types/ErrorI";
import type { UserCredI } from "../types/UserCredI";

export const LoginContextObj = createContext<LoginContextI>({
  loginStatus: false,
  currentUser: null,
  loginError: null,
  userLogin: async (userCredObj: UserCredI) => {},
  userLogout: () => {},
});

function LoginContext({ children }: { children: ReactNode }) {
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserI | null>(null);
  const [loginError, setLoginError] = useState<ErrorI | null>(null);
  

  const userLogin = async (userCredObj: UserCredI) => {
    try {
      const res = await fetch("http://localhost:3000/user-api/user-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userCredObj),
      });
      console.log(res.headers)
      if (!res.ok) {
        const errorData: ErrorI = await res.json();
        throw new Error(errorData.message || "Login failed");
      }

      const userData = await res.json();
      console.log(userData)

      //set the token in localstorage
      localStorage.setItem("token",userData.token)

      setLoginStatus(true);
      setCurrentUser(userData);
      setLoginError(null);

    } catch (err: any) { 
      console.log("Error from context:", err);
      setLoginStatus(false);
      setCurrentUser(null);
    }
  };

  const userLogout = () => {
    localStorage.removeItem("token")
    setLoginStatus(false);
    setCurrentUser(null);
    setLoginError(null);
  };

  return (
    <LoginContextObj.Provider
      value={{ loginStatus, currentUser, loginError, userLogin, userLogout }}
    >
      {children}
    </LoginContextObj.Provider>
  );
}

export default LoginContext;
