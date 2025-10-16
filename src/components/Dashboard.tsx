import React, { useState } from "react";

function Dashboard() {
  const [protectedData, setProtectedData] = useState("");

  const getProtectedData = async () => {
    //get Token from localstorage
    const token = localStorage.getItem("token");
    //make req to get the data
    const res = await fetch("http://localhost:3000/user-api/protected", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 200) {
      const { message } = await res.json();
      console.log(message);
      setProtectedData(message);
    }
  };

  return (
    <div>
      <button className=" btn btn-success" onClick={getProtectedData}>
        Get Data
      </button>
      <h1>{protectedData}</h1>
    </div>
  );
}

export default Dashboard;
