import React, { useContext, useState } from "react";
import { LoginContextObj } from "../contexts/LoginContext";

function Dashboard() {
  const [protectedData, setProtectedData] = useState("");
  const { currentUser } = useContext(LoginContextObj);

  const getProtectedData = async () => {
    //get Token from localstorage
    // const token = localStorage.getItem("token");
    //make req to get the data
    const res = await fetch("http://localhost:3000/user-api/protected", {
      method: "GET",
      credentials: "include",
    });

    if (res.status === 200) {
      const { message } = await res.json();
      console.log(message);
      setProtectedData(message);
    }
  };

  console.log("user data on dashboard:", currentUser);

  return (
    <div>
      <h1>Hi {currentUser?.name}</h1>

      <button className=" btn btn-success" onClick={getProtectedData}>
        Get Data
      </button>
      <h1>{protectedData}</h1>
    </div>
  );
}

export default Dashboard;
