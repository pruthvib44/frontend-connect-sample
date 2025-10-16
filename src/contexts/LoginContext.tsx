import React, { createContext, useEffect, type ReactNode } from "react";
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
        //to  include the cookie in response
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userCredObj),
      });
      console.log(res.headers);
      if (!res.ok) {
        const errorData: ErrorI = await res.json();
        throw new Error(errorData.message || "Login failed");
      }

      const userData = await res.json();
      console.log("User data in context:",userData);

      //set the token in localstorage
      localStorage.setItem("token", userData.token);

      setLoginStatus(true);
      setCurrentUser(userData.payload);
      console.log("User data while setting setCurrentUser:",userData)
      setLoginError(null);
    } catch (err: any) {
      console.log("Error from context:", err);
      setLoginStatus(false);
      setCurrentUser(null);
    }
  };

  const userLogout = async () => {
    const res = await fetch("http://localhost:3000/user-api/user-logout", {
      method: "POST",
      //to  include the cookie in response
      credentials: "include",
    });
    console.log(res);
    if (res.status === 200) {
      setLoginStatus(false);
      setLoginError(null);
      setCurrentUser(null);
    }
  };

  useEffect(() => {
  const refreshData = async () => {
    try {
      const res = await fetch("http://localhost:3000/refresh", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await res.json();
      console.log("User data in refresh:", data.user);
      setCurrentUser(data.user)

    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  refreshData();
}, []);

  return (
    <LoginContextObj.Provider
      value={{ loginStatus, currentUser, loginError, userLogin, userLogout }}
    >
      {children}
    </LoginContextObj.Provider>
  );
}

export default LoginContext;
